import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const green = 50;
const blue = 40;

const AnyReactComponent = ({ text }) => <div style={{height: "25px",
  width: "25px",
  backgroundColor: "rgb(223, "+(green + parseInt(text)%100)+", " + (blue + parseInt(text)%100) + ")",
  borderRadius: "50%",
  display: "inline-block" }}><span style={{color: "#fff", textStyle: "bold", textAlign: "center"}}>{text}</span></div>;

const styles = require("../MapStyles/style.json");
const apikey = "AIzaSyBg_CQHYbcSq5reiIRgnexI1Un82KVsl5Q";


class Map extends Component {
  
    url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations";

    static defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 1
      };

    constructor()
    {
        super();

        this.state = {
            data : []
        };
    }

    componentDidMount()
    {
        this.refreshComponent();
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

  renderDeathsRow()
    {
        return this.state.data.map((item) => {
          if(parseInt(item.latest.deaths) != 0)
          {
            return (
              <AnyReactComponent
              lat={item.coordinates.latitude}
              lng={item.coordinates.longitude}
              text={item.latest.deaths}
            />
            );

          }
        });


    }

    
      render() {
        return (
        
          <div style={{ height: '95.5vh', width: '50vw', marginTop: "10px", marginBottom: "10px" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyBg_CQHYbcSq5reiIRgnexI1Un82KVsl5Q" }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              options={{
                styles: [
                  {
                      "featureType": "all",
                      "elementType": "labels.text.fill",
                      "stylers": [
                          {
                              "saturation": 36
                          },
                          {
                              "color": "#000000"
                          },
                          {
                              "lightness": 40
                          }
                      ]
                  },
                  {
                      "featureType": "all",
                      "elementType": "labels.text.stroke",
                      "stylers": [
                          {
                              "visibility": "on"
                          },
                          {
                              "color": "#000000"
                          },
                          {
                              "lightness": 16
                          }
                      ]
                  },
                  {
                      "featureType": "all",
                      "elementType": "labels.icon",
                      "stylers": [
                          {
                              "visibility": "off"
                          }
                      ]
                  },
                  {
                      "featureType": "administrative",
                      "elementType": "geometry.fill",
                      "stylers": [
                          {
                              "color": "#000000"
                          },
                          {
                              "lightness": 20
                          }
                      ]
                  },
                  {
                      "featureType": "administrative",
                      "elementType": "geometry.stroke",
                      "stylers": [
                          {
                              "color": "#000000"
                          },
                          {
                              "lightness": 17
                          },
                          {
                              "weight": 1.2
                          }
                      ]
                  },
                  {
                      "featureType": "administrative.country",
                      "elementType": "geometry",
                      "stylers": [
                          {
                              "hue": "#ffcf00"
                          }
                      ]
                  },
                  {
                      "featureType": "landscape",
                      "elementType": "geometry",
                      "stylers": [
                          {
                              "color": "#000000"
                          },
                          {
                              "lightness": 20
                          }
                      ]
                  },
                  {
                      "featureType": "landscape.man_made",
                      "elementType": "geometry.fill",
                      "stylers": [
                          {
                              "visibility": "simplified"
                          },
                          {
                              "color": "#ff0000"
                          }
                      ]
                  },
                  {
                      "featureType": "landscape.man_made",
                      "elementType": "geometry.stroke",
                      "stylers": [
                          {
                              "color": "#997c2a"
                          },
                          {
                              "visibility": "off"
                          }
                      ]
                  },
                  {
                      "featureType": "landscape.man_made",
                      "elementType": "labels.text",
                      "stylers": [
                          {
                              "color": "#f2ab53"
                          }
                      ]
                  },
                  {
                      "featureType": "poi",
                      "elementType": "geometry",
                      "stylers": [
                          {
                              "color": "#000000"
                          },
                          {
                              "lightness": 21
                          }
                      ]
                  },
                  {
                      "featureType": "road.highway",
                      "elementType": "geometry.fill",
                      "stylers": [
                          {
                              "color": "#000000"
                          },
                          {
                              "lightness": 17
                          }
                      ]
                  },
                  {
                      "featureType": "road.highway",
                      "elementType": "geometry.stroke",
                      "stylers": [
                          {
                              "color": "#000000"
                          },
                          {
                              "lightness": 29
                          },
                          {
                              "weight": 0.2
                          }
                      ]
                  },
                  {
                      "featureType": "road.arterial",
                      "elementType": "geometry",
                      "stylers": [
                          {
                              "color": "#000000"
                          },
                          {
                              "lightness": 18
                          }
                      ]
                  },
                  {
                      "featureType": "road.arterial",
                      "elementType": "labels.text",
                      "stylers": [
                          {
                              "visibility": "on"
                          },
                          {
                              "weight": "1.48"
                          }
                      ]
                  },
                  {
                      "featureType": "road.arterial",
                      "elementType": "labels.text.fill",
                      "stylers": [
                          {
                              "color": "#854343"
                          },
                          {
                              "visibility": "off"
                          }
                      ]
                  },
                  {
                      "featureType": "road.arterial",
                      "elementType": "labels.text.stroke",
                      "stylers": [
                          {
                              "color": "#ce7b2f"
                          }
                      ]
                  },
                  {
                      "featureType": "road.local",
                      "elementType": "geometry",
                      "stylers": [
                          {
                              "color": "#000000"
                          },
                          {
                              "lightness": 16
                          }
                      ]
                  },
                  {
                      "featureType": "transit",
                      "elementType": "geometry",
                      "stylers": [
                          {
                              "color": "#000000"
                          },
                          {
                              "lightness": 19
                          }
                      ]
                  },
                  {
                      "featureType": "transit.line",
                      "elementType": "geometry.stroke",
                      "stylers": [
                          {
                              "visibility": "on"
                          },
                          {
                              "color": "#efc759"
                          }
                      ]
                  },
                  {
                      "featureType": "water",
                      "elementType": "geometry",
                      "stylers": [
                          {
                              "color": "#25586f"
                          },
                          {
                              "lightness": 17
                          }
                      ]
                  }
              ]
              
              }}>

              {this.renderDeathsRow()}

            </GoogleMapReact>
          </div>
     
        );
      }
}

export default Map;