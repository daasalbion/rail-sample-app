import * as React from 'react'
import {useMutation} from '@apollo/react-hooks';
import {Query} from 'react-apollo';
import Table from "react-bootstrap/Table";
import CreateProduct from "./Product/CreateProduct";
import Button from "react-bootstrap/Button";
import gql from 'graphql-tag';

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

const CREATE_PRODUCT = gql`
    mutation($cod: String!, $name: String!, $price: Int!) {
        createProduct(input: {productInput: {
            cod: $cod, name: $name, price: $price
        }}) {
            id,
            cod,
            name,
            price
        }
    }
`;

const DELETE_PRODUCT = gql`
    mutation($id: ID!) {
        deleteProduct (
            input: {
                id: $id
        }) {
            id
        }
    }
`;

const Product = () => {
  const [addProduct] = useMutation(CREATE_PRODUCT, {
    update(cache, {data: {createProduct}}) {
      const {products} = cache.readQuery({query: GET_PRODUCTS});
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {products: products.concat([createProduct])},
      });
    }
  });

  const [removeProduct] = useMutation(DELETE_PRODUCT, {
    update(cache, {data: {deleteProduct}}) {
      const {products} = cache.readQuery({query: GET_PRODUCTS});
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {products: products.filter(e => e.id !== deleteProduct.id)},
      });
    }
  });

  const deleteProduct = (id: number) => {
    removeProduct({
      variables:
        {
          id: id
        }
    }).then();
  };

  return (
    <Query query={GET_PRODUCTS}>
      {({data, loading}) => (
        <div>
          <CreateProduct addProduct={addProduct}/>
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
            {loading ?
              <tr>
                <td colSpan={5}>Loading...</td>
              </tr>
              : (data.products.length == 0) ? (
                  <tr>
                    <td colSpan={5}>No data found</td>
                  </tr>) :
                data.products.map((value) => {
                  return (
                    <tr key={value.id}>
                      <td>{value.id}</td>
                      <td>{value.cod}</td>
                      <td>{value.name}</td>
                      <td>{value.price}</td>
                      <td>
                        <Button variant="danger" onClick={() => deleteProduct(value.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>)
                })
            }
            </tbody>
          </Table>
        </div>
      )}
    </Query>
  );
};

export default Product;