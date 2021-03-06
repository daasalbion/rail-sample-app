import * as React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import {createCache, createClient} from "./ApolloClientProvider";
import {ApolloProvider} from '@apollo/react-hooks';
import AppRouter from "./AppRouter/AppRouter";

const App = () => {
  return (
    <Container className="p-3">
      <ApolloProvider client={createClient(createCache())}>
        <Jumbotron>
          <h1 className="header">
            Rails, Graphql, React, Bootstrap, TypeScript Example
          </h1>
        </Jumbotron>
        <AppRouter/>
      </ApolloProvider>
    </Container>
  );
};

export default App;