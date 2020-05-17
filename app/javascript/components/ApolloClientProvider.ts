// client
import { ApolloClient } from 'apollo-client';
// cache
import { InMemoryCache } from 'apollo-cache-inmemory';
// links
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
export const createCache = () => {
  const cache = new InMemoryCache();
  if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    window.secretVariableToStoreCache = cache;
  }
  return cache;
};
// getToken from meta tags
const getToken = () =>
  document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const token = getToken();
const setTokenForOperation = async operation =>
  operation.setContext({
    headers: {
      'X-CSRF-Token': token,
    },
  });
// link with token
const createLinkWithToken = () =>
  new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(setTokenForOperation)
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));
        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );
// log errors
const logError = (error, networkError: Error |
  (Error & { response: Response; result: Record<string, any>; statusCode: number }) |
  (Error & { response: Response; statusCode: number; bodyText: string })) => console.error(error);
// create error link
const createErrorLink = () => onError(({ graphQLErrors,
                                         networkError, operation }) => {
  if (graphQLErrors) {
    // @ts-ignore
    logError('GraphQL - Error', networkError);
  }
  if (networkError) {
    logError('GraphQL - NetworkError', networkError);
  }
});
// http link
const createHttpLink = () => new HttpLink({
  uri: '/graphql',
  credentials: 'include',
});

export const createClient = (cache) => {
  return new ApolloClient({
    link: ApolloLink.from([
      createErrorLink(),
      createLinkWithToken(),
      createHttpLink(),
    ]),
    cache
  });
};