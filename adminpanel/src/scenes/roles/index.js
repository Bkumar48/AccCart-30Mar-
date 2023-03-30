import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Button, Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';


const Roles = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/roles/all')
            .then(res => {
                setRoles(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <Row>
            <Col>
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"/> Roles
                        <Button
                            color="primary"
                            className="float-right"
                            onClick={() => navigate('/roles/create')}
                        >
                            Create
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Display Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Array.isArray(roles)?roles.map(role => (
                                <tr key={role.id}>
                                    <td>{role.name}</td>
                                    <td>{role.display_name}</td>
                                    <td>{role.description}</td>
                                    <td>
                                        <Button
                                            color="primary"
                                            onClick={() => navigate(`/roles/${role.id}/edit`)}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            )):null}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default Roles;
