import * as React from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks';
import {gql} from "apollo-boost";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const CREATE_PRODUCT = gql`
    mutation($cod: String!, $name: String!, $price:Int!) {
        createProduct(input: {productInput: {
            cod: $cod, name: $name, price: $price
        }}) {
            id,
            name
        }
    }
`;

const initialState = {
    cod: '',
    name: '',
    price: 0
};

const CreateProduct = () => {

    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [addProduct, _] = useMutation(CREATE_PRODUCT);
    const [product, setProduct] = useState(initialState);

    const createProduct = () => {
        console.log('product', product);
        addProduct({ variables:
                {
                    cod: product.cod,
                    name: product.name,
                    price: product.price
                } }).then();
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        createProduct();
        setValidated(true);
    };

    const handleChange = (name: string) => (event: any) => {
        let filter: any = {...product};
        filter[name] = event.target.value;
        setProduct(filter);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create
            </Button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Cod</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Cod"
                                    value={product.cod}
                                    onChange={handleChange('cod')}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Name"
                                    value={product.name}
                                    onChange={handleChange('name')}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                              required
                                              type="number"
                                              placeholder="Price"
                                              value={product.price}
                                              onChange={handleChange('price')}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                            {/*<Form.Group as={Col} md="6" controlId="validationCustom04">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="State" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid state.
                                </Form.Control.Feedback>
                            </Form.Group>*/}
                        </Form.Row>
                        <Button type="submit">Submit form</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"  onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateProduct;