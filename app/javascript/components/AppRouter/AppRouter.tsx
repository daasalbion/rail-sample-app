import * as React from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Product from "../Product";
import Client from "../Client/Client";
import Nav from "react-bootstrap/Nav";
import Invoice from "../Invoice/Invoice";

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
          <Nav.Link as={Link} to="/invoice" eventKey="link-2">
            Invoice
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Route path="/" exact component={Client}/>
      <Route path="/client" exact component={Client}/>
      <Route path="/product" exact component={Product}/>
      <Route path="/invoice" exact component={Invoice}/>
    </Router>
  );
};

export default AppRouter;