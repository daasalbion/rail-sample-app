import * as React from 'react'
import {useQuery} from '@apollo/react-hooks';
import {gql} from "apollo-boost";
import Table from "react-bootstrap/Table";
import CreateProduct from "./Product/CreateProduct";

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

const Product = () => {
    const {loading, error, data} = useQuery(GET_PRODUCTS);

    if (loading) return (<div>Loading...</div>);
    if (error) return (<div>Sin datos</div>);

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
                        <td>Test</td>
                    </tr>
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default Product;