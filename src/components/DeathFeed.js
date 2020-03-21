import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import ReactDOM from 'react-dom';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import {Scrollbar} from 'react-scrollbars-custom';

import axios from 'axios';

class DeathFeed extends Component {

    url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations";

    constructor()
    {
        super();

        this.state = {
            data: [],
            totalDeaths: "0"
        };
        
        this.totalDeathCount = 0;
    }

    componentDidMount()
    {
        this.refreshComponent();
    }

    renderDeathsRow()
    {
        return this.state.data.map((item) => {
            this.totalDeathCount = this.totalDeathCount + parseInt(item.latest.deaths);
                return (
                    <tr>
                        <td>{item.country}</td>
                        <td>{item.latest.deaths}</td>
                    </tr>
                );
        });


    }

    refreshComponent = () => {

        axios.get(this.url)
            .then(res => {
                console.log(res);
                this.setState({
                    data: res.data.locations
                });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(()=> {
                
            });
    }

    render() {

        return (
            <Card style={{width: "22.2vw", height: "50vh", marginLeft: "10px", marginTop: "10px", marginBottom: "10px", marginRight: "8px"}} variant="dark" bg="dark" >
                <Card.Body>
                    
                <div style={{margin: "10px"}}>
                <Container>
                <Scrollbar style={{ height: "35vh" }}>

                    <Table responsive striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th colSpan="2"> Total Deaths </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderDeathsRow()}
                        </tbody>
                    </Table>
                </Scrollbar>
                
                <Alert variant="danger mt-2">
                    <span style={{fontWeight: "bold", fontFamily: "Audiowide"}}>{this.totalDeathCount}</span>
                </Alert>
                </Container>
                

                
            </div>

            
                </Card.Body>
                
            </Card>
            
        );
    }
}

export default DeathFeed;