import * as React from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks';
import {gql} from "apollo-boost";
import Table from "react-bootstrap/Table";
import CreateProduct from "./Product/CreateProduct";
import Button from "react-bootstrap/Button";

const GET_PRODUCTS = gql`
    {
        products {
            id,
            cod,
            name,
            price
        }
    }
`;

const DELETE_PRODUCT = gql`
    mutation($id: ID!) {
        deleteProduct(
            input: {
                id: $id
        }) {
            id,
            name
        }
    }
`;

const Product = () => {
    const {loading, error, data} = useQuery(GET_PRODUCTS);
    const [removeProduct, _] = useMutation(DELETE_PRODUCT);

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>No data</div>);

    const deleteProduct = (id: number) => {
        removeProduct({
            variables:
                {
                    id: id
                }
        }).then();
    }

    return (
        <div>
            <CreateProduct/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Cod</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.products.map((value) => {
                    return <tr key={value.id}>
                        <td>{value.id}</td>
                        <td>{value.cod}</td>
                        <td>{value.name}</td>
                        <td>{value.price}</td>
                        <td>
                            <Button variant="danger" onClick={() => deleteProduct(value.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default Product;