import * as React from 'react'
import {useQuery} from '@apollo/react-hooks';
import {gql} from "apollo-boost";
import Table from "react-bootstrap/Table";

const GET_CLIENTS = gql`
    {
        clients {
            id,
            ruc,
            name,
            email
        }
    }
`;

const Client = () => {
    const {loading, error, data} = useQuery(GET_CLIENTS);

    if (loading) return  (<div>Loading...</div>);
    if (error) return (<div>Sin datos</div>);

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Ruc</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                {data.clients.map((value) => {
                    return <tr key={value.id}>
                        <td>{value.id}</td>
                        <td>{value.ruc}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>Test</td>
                    </tr>
                })}
            </tbody>
        </Table>
    );
};

export default Client;