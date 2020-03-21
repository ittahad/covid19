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

class RapidCountries extends Component {

    url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations";

    constructor()
    {
        super();

        this.state = {
            data: [],
            mostRecovered: 0,
            mostDied: 0,
            mostRec: {
                country: "...",
                total: 0
            },
            mostDed: {
                country: "...",
                total: 0
            }
        };
        
        this.totalrecoveredCount = 0;
    }

    componentDidMount()
    {
        this.refreshComponent();
    }

    mostRecovery()
    {
        let min = -1;

        this.state.data.map((item, idx) => {
            if(parseInt(item.latest.recovered) > parseInt(min))
            {
                min = item.latest.recovered;
                this.setState({mostRecovered: idx});
                this.setState({mostRec: {country: item.country, total: item.latest.recovered}});
            }
        });

    }

    mostDeath()
    {
        let min = -1;

        this.state.data.map((item, idx) => {
            if(parseInt(item.latest.deaths) > parseInt(min))
            {
                min = item.latest.deaths;
                this.setState({mostDied: idx});
                
                this.setState({mostDed: {country: item.country, total: item.latest.deaths}});
            }
        });

    }

    refreshComponent = () => {

        axios.get(this.url)
            .then(res => {
                console.log(res);
                this.setState({
                    data: res.data.locations
                });

                this.mostRecovery();

                this.mostDeath();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(()=> {
                
            });
    }

    render() {

        return (
            <Card responsive style={{width: "25vw", height: "43vh", marginBottom: "10px"}} variant="dark" bg="dark" >
                <Card.Body>
                    
                <div style={{margin: "10px", height: "33vh"}}>
                <Container>
                
                <span style={{color: "#fff", fontFamily: "Orbitron"}}>Most Deaths </span>
                <Alert variant="danger mt-3 mb-5">
                    
                    <span style={{fontWeight: "bold",}}>{this.state.mostDed.country} 
                    <Badge variant="danger" style={{marginLeft: "20px"}}>{this.state.mostDed.total}</Badge>
                    </span>
                </Alert>
                <span style={{color: "#fff", fontFamily: "Orbitron"}}>Most Recovery </span>
                <Alert variant="success mt-3">
                    <span style={{fontWeight: "bold",}}>{ this.state.mostRec.country } 
                    <Badge variant="success" style={{marginLeft: "20px"}}>{this.state.mostRec.total}</Badge>
                    
                    </span>
                </Alert>
                
                
               
                </Container>
                

                
            </div>

            
                </Card.Body>
                
            </Card>
            
        );
    }
}

export default RapidCountries;