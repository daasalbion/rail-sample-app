import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const App = () => {
    return (
        <Container className="p-3">
            <Jumbotron>
                <h1 className="header">
                    Welcome To React-Bootstrap TypeScript Example
                </h1>
            </Jumbotron>
        </Container>
    );
};

export default App;