import * as React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import {client} from "./ApolloClientProvider";
import {ApolloProvider} from '@apollo/react-hooks';
import Product from "./Product";

const App = () => {
    return (
        <Container className="p-3">
            <ApolloProvider client={client}>
                <Jumbotron>
                    <h1 className="header">
                        Welcome To React-Bootstrap TypeScript Example
                    </h1>
                    <Product/>
                </Jumbotron>
            </ApolloProvider>
        </Container>
    );
};

export default App;