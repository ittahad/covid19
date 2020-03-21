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

import axios from 'axios';

class LatestFeed extends Component {

    url = "https://coronavirus-tracker-api.herokuapp.com/v2/latest";

    constructor()
    {
        super();

        this.state = {
            cases: "0",
            deaths: "0",
            recovered: "0",
            lastUpdated: "00:00:00"
        };
    }

    componentDidMount()
    {
        this.refreshComponent();
    }

    refreshComponent = () => {

        let refreshSpinner = ReactDOM.findDOMNode(document.getElementById("refreshSpinner"));
        let refreshText = ReactDOM.findDOMNode(document.getElementById("refreshText"));
        refreshSpinner.style.display = "inline-block";
        refreshText.style.display = "none";

        axios.get(this.url)
            .then(res => {
                this.setState({
                    cases: res.data.latest.confirmed,
                    deaths: res.data.latest.deaths,
                    recovered: res.data.latest.recovered,
                });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(()=> {
                refreshSpinner.style.display = "none";
                refreshText.style.display = "inline-block";

                let currTime = new Date();
                let amPm = parseInt(currTime) > 11 ? "AM" : "PM";
                let hours = parseInt(currTime.getHours()) % 12;
                let mins = parseInt(currTime.getMinutes());
                let timeBuilder = ((hours < 10) ? "0"+hours : hours) + ":" + ((mins < 10) ? "0"+mins : mins) + " " + amPm;
                this.setState({lastUpdated: timeBuilder});
                
            });
    }

    render() {
        return (
            <Card style={{width: "22.2vw", height: "44vh", marginTop: "10px", marginLeft: "10px"}} variant="dark" bg="dark" >
                <Card.Body>
                <div style={{margin: "10px"}}>
                <Container>
                    <div style={{textAllign: "center"}}>
                        <InputGroup className="mb-2">
                           
                            <FormControl
                            placeholder="0"
                            aria-label="total-cases"
                            aria-describedby="basic-addon1"
                            value={this.state.cases}
                            style={{fontFamily: "Audiowide"}}
                            readOnly
                            />
                            <InputGroup.Prepend>
                            <Badge variant="info" style={{width: "80px", marginLeft: "-3px"}}>Total Cases</Badge>
                            </InputGroup.Prepend>
                        </InputGroup>

                        <InputGroup className="mb-2">
                            
                            <FormControl
                            placeholder="0"
                            aria-label="total-deaths"
                            aria-describedby="basic-addon1"
                            value={this.state.deaths}
                            style={{fontFamily: "Audiowide"}}
                            readOnly
                            />
                            <InputGroup.Prepend>
                                <Badge variant="danger" style={{width: "80px", marginLeft: "-3px"}}>Deaths</Badge>
                            </InputGroup.Prepend>
                        </InputGroup>
                        <InputGroup className="mb-2">
                           
                            <FormControl
                            placeholder="0"
                            aria-label="total-recovered"
                            aria-describedby="basic-addon1"
                            value={this.state.recovered}
                            style={{fontFamily: "Audiowide"}}
                            readOnly
                            />
                            <InputGroup.Prepend>
                                <Badge variant="success" style={{width: "80px", marginLeft: "-3px"}}>Recovered</Badge>
                            </InputGroup.Prepend>
                        </InputGroup>
                        <Button variant="outline-warning" className="mb-3 col-12" onClick={this.refreshComponent}>
                            
                            <span id="refreshText">Refresh</span>
                            <Spinner
                            id="refreshSpinner"
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true" style={{display: "none"}}> </Spinner>

                            </Button>

                    </div>

                    <Alert variant="warning" style={{fontSize: "8pt"}}>
                        Last updated {this.state.lastUpdated}
                    </Alert>

                </Container>
                
            </div>
                </Card.Body>
            </Card>
            
        );
    }
}

export default LatestFeed;