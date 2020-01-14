import React from 'react';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import ShoppingArea from './components/ShoppingArea'
import ShoppingCart from './components/myShoppingCart'
import MyOrders from './components/myOrders'
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <div>
        <div>
      <BrowserRouter>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand  as={Link} to="/ShoppingArea">Fun!! Shopping</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                 <Nav.Link as={Link} to="/ShoppingArea">Go Shopping</Nav.Link>
                 <Nav.Link as={Link} to="/ShoppingCart">My ShoppingCart</Nav.Link>  
                 <Nav.Link as={Link} to="/MyOrders">My Orders</Nav.Link>  
            </Nav>
  </Navbar.Collapse>
</Navbar>
            <Switch>               
                <Route path="/ShoppingArea" render={() => <Container style={{marginTop:"10px"}}><ShoppingArea></ShoppingArea> </Container>} />
                <Route path="/ShoppingCart" render={() => <Container style={{marginTop:"10px"}}><ShoppingCart></ShoppingCart></Container>} />
                <Route path="/MyOrders" render={() => <Container style={{marginTop:"10px"}}><MyOrders></MyOrders></Container>} />
           </Switch>
      </BrowserRouter>
      </div>
  </div>
  );
}

export default App;
