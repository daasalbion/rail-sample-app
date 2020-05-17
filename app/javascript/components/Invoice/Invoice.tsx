import * as React from 'react'
import {useMutation} from '@apollo/react-hooks';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import DataTable from "../DataTable/DataTable";

const GET_INVOICES = gql`
    {
        invoices {
            id,
            total,
            invoicenumber
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

const headers = [
  {name: '#', field: 'id'},
  {name: 'Number', field: 'invoicenumber'},
  {name: 'Total', field: 'total'},
  {name: 'Actions'}
];

const Invoice = () => {
  const [addProduct] = useMutation(CREATE_PRODUCT, {
    update(cache, {data: {createProduct}}) {
      const {products} = cache.readQuery({query: GET_INVOICES});
      cache.writeQuery({
        query: GET_INVOICES,
        data: {products: products.concat([createProduct])},
      });
    }
  });

  const [removeProduct] = useMutation(DELETE_PRODUCT, {
    update(cache, {data: {deleteProduct}}) {
      const {products} = cache.readQuery({query: GET_INVOICES});
      cache.writeQuery({
        query: GET_INVOICES,
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
    <Query query={GET_INVOICES}>
      {({data, loading}) => (
        <div>
          <DataTable data={data && data.invoices}
                     headers={headers}
                     loading={loading}/>
        </div>
      )}
    </Query>
  );
};

export default Invoice;