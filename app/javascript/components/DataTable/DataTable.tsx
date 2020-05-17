import * as React from 'react'
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

interface Header {
  name: string;
  field?: string
}

interface DataTableProps {
  headers: Header[];
  loading: boolean;
  data: any[];
  delete?: (id: number) => void
}

const DataTable = (props: DataTableProps) => {
  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        {props.headers.map((value, index) => (<th key={index}>{value.name}</th>))}
      </tr>
      </thead>
      <tbody>
      {props.loading ?
        <tr>
          <td colSpan={props.headers.length}>Loading...</td>
        </tr>
        : (props.data.length == 0) ? (
            <tr>
              <td colSpan={props.headers.length}>No data found</td>
            </tr>) :
          props.data.map((value) => {
            return (
              <tr key={value['id']}>
                {
                  props.headers
                    .filter(header => (header.field))
                    .map(({name, field}) => (<td key={name}>{value[field]}</td>))
                }
                {
                  (props.delete) ?
                  (<td>
                    <Button variant="danger" onClick={() => props.delete(value.id)}>
                      Delete
                    </Button>
                  </td>) : (<td />)
                }
              </tr>)
          })
      }
      </tbody>
    </Table>
  );
};

export default DataTable;