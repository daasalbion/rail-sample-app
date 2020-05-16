import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  fetchOptions: {
    credentials: 'same-origin',
  },
  request: (operation) => {
    const csrfToken = document.querySelector('meta[name=csrf-token]')
        .getAttribute('content')
    operation.setContext({
      headers: { "X-CSRF-Token": csrfToken }
    })
  },
  uri: 'http://localhost:3000/graphql'
});