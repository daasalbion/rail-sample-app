import * as React from 'react'
import {useMutation} from '@apollo/react-hooks';
import {Query} from 'react-apollo';
import Table from "react-bootstrap/Table";
import CreateProduct from "./Product/CreateProduct";
import Button from "react-bootstrap/Button";
import gql from 'graphql-tag';
import DataTable from "./DataTable/DataTable";

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

const PRODUCT_HEADERS = [
  {name: '#', field: 'id'},
  {name: 'Cod', field: 'cod'},
  {name: 'Name', field: 'name'},
  {name: 'Price', field: 'price'},
  {name: 'Actions'}
];

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
          <DataTable headers={PRODUCT_HEADERS} loading={loading} data={data && data.products} delete={deleteProduct}/>
        </div>
      )}
    </Query>
  );
};

export default Product;