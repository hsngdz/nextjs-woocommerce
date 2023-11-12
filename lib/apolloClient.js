import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Observable } from '@apollo/client/utilities';
import { GraphQLClient } from 'graphql-request';
import { getCartDocument } from './woocommerce/queries/cart';

// Session Token Management.
async function fetchSessionToken() {
  let sessionToken;
  try {
    const graphQLClient = new GraphQLClient(process.env.WOOCOMMERCE_STORE_DOMAIN + '/graphql');

    const cartData = await graphQLClient.request(getCartDocument);

    // If user doesn't have an account return accountNeeded flag.
    sessionToken = cartData?.cart?.sessionToken;

    if (!sessionToken) {
      throw new Error('Failed to retrieve a new session token');
    }
  } catch (err) {
    console.error(err);
  }

  return sessionToken;
}

export async function getSessionToken(forceFetch = false) {
  let sessionToken = localStorage.getItem(process.env.WC_SESSION_TOKEN_LS_KEY);
  if (!sessionToken || forceFetch) {
    sessionToken = await fetchSessionToken();
  }
  return sessionToken;
}

function createSessionLink() {
  return setContext(async (operation) => {
    const headers = {};
    const sessionToken = await getSessionToken();

    if (sessionToken) {
      headers['woocommerce-session'] = `Session ${sessionToken}`;

      return { headers };
    }

    return {};
  });
}

function createErrorLink() {
  return onError(({ graphQLErrors, operation, forward }) => {
    const targetErrors = [
      'The iss do not match with this server',
      'invalid-secret-key | Expired token',
      'invalid-secret-key | Signature verification failed',
      'Expired token',
      'Wrong number of segments'
    ];
    let observable;
    if (graphQLErrors?.length) {
      graphQLErrors.map(({ debugMessage, message }) => {
        if (targetErrors.includes(message) || targetErrors.includes(debugMessage)) {
          observable = new Observable((observer) => {
            getSessionToken(true)
              .then((sessionToken) => {
                operation.setContext(({ headers = {} }) => {
                  const nextHeaders = headers;

                  if (sessionToken) {
                    nextHeaders['woocommerce-session'] = `Session ${sessionToken}`;
                  } else {
                    delete nextHeaders['woocommerce-session'];
                  }

                  return {
                    headers: nextHeaders
                  };
                });
              })
              .then(() => {
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer)
                };
                forward(operation).subscribe(subscriber);
              })
              .catch((error) => {
                observer.error(error);
              });
          });
        }
      });
    }
    return observable;
  });
}

function createUpdateLink(operation, forward) {
  return forward(operation).map((response) => {
    /**
     * Check for session header and update session in local storage accordingly.
     */
    const context = operation.getContext();
    const {
      response: { headers }
    } = context;
    const oldSessionToken = localStorage.getItem(process.env.WC_SESSION_TOKEN_LS_KEY);
    const sessionToken = headers.get('woocommerce-session');
    if (sessionToken) {
      if (oldSessionToken !== session) {
        localStorage.setItem(process.env.WC_SESSION_TOKEN_LS_KEY, sessionToken);
      }
    }

    return response;
  });
}

const client = new ApolloClient({
  link: from([
    createSessionLink(),
    createErrorLink(),
    createUpdateLink(),
    new HttpLink({ uri: process.env.WOOCOMMERCE_STORE_DOMAIN + '/graphql' })
  ]),
  cache: new InMemoryCache()
});
