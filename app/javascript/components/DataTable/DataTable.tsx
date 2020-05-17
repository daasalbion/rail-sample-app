import * as React from 'react'
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

interface DataTableProps<T> {
  headers: string[];
  loading: boolean;
  data: T[];
  delete?: (id: number) => void
}

const DataTable = (props: DataTableProps<any>) => {
  console.log('mirar', props);
  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        {props.headers.map((value) => (<th>{value}</th>))}
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
              <tr key={value.id}>
                {Object.keys(value)
                  .filter(value => value !== '__typename')
                  .map((key) => (<td>{value[key]}</td>))}
                {
                  (props.delete) ?
                    (<td>
                      <Button variant="danger" onClick={() => props.delete(value.id)}>
                        Delete
                      </Button>
                    </td>) : (<td/>)
                }
              </tr>)
          })
      }
      </tbody>
    </Table>
  );
};

export default DataTable;