import React from 'react';
import logo from './logo.svg';
import './App.css';
import LatestFeed from './components/LatestFeed';
import DeathFeed from './components/DeathFeed';
import Map from './components/Map';
import Table from 'react-bootstrap/Table';
import Recovered from './components/Recovered';
import RapidCountries from './components/RapidCountries';

function App() {
  return (
    <div className="App" style={{width: "100vw", backgroundColor: "#000"}}>
      <table style={{display: "inline-block", float: "left"}}>
        <tbody>
          <tr>
            <td><LatestFeed /> </td>
          </tr>
          <tr>
            <td><DeathFeed /> </td>
          </tr>
        </tbody>
      </table>

      <table style={{display: "inline-block", float: "left"}}>
        <tbody>
          <tr>
            <td><Map /> </td>
          </tr>
          
        </tbody>
      </table>
      <table style={{display: "inline-block"}}>
        <tbody>
          <tr>
            <td> <Recovered /> </td>
          </tr>
          
        </tbody>
      </table>
      <table style={{display: "inline-block"}}>
        <tbody>
          <tr>
            <td> <RapidCountries /> </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
}

export default App;
