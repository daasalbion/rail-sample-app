import * as React from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Product from "../Product";
import Client from "../Client/Client";
import Nav from "react-bootstrap/Nav";

const AppRouter = () => {
  return (
    <Router>
      <Nav
        activeKey="/home"
      >
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/client" eventKey="link-1">
            Client
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/product" eventKey="link-2">
            Product
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Route path="/" exact component={Client}/>
      <Route path="/client" exact component={Client}/>
      <Route path="/product" exact component={Product}/>
    </Router>
  );
};

export default AppRouter;