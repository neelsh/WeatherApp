import React, { Component } from 'react';
import './Weather.css';
import xhr from 'xhr';
import Plot from './Plot';

class Weather extends React.Component {
  state = {
    location: '',
    data: {},
    dates: [],
    temps: []
  };

  fetchData = (evt) => {
    evt.preventDefault();
    console.log('fetch data for', this.state.location);
    const location = encodeURIComponent(this.state.location);
    const urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=London,GB';
    const urlSuffix = '&APPID=ed85c941348b145ed73ab007fd218d19&units=metric';
    const url = urlPrefix + location + urlSuffix;
    const self = this;

    xhr({
      url: url
    }, function (err, data) {
        const body = JSON.parse(data.body);
        const list = body.list;
        const dates = [];
        const temps = [];
        for (var i = 0; i < list.length; i++) {
          dates.push(list[i].dt_txt);
          temps.push(list[i].main.temp);
        }

        self.setState({
          data: body,
          dates: dates,
          temps: temps
        })
    });
  };

  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    })
  }

  render() {
    let currentTemp = 'not loaded yet';
    if(this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the weather for
            <input className="focus" placeholder=":focus" placeholder={"City, Country"}
              type="text"
              value={this.state.location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        {(this.state.data.list) ? (
          <div className="wrapper">
            <p className="temp-wrapper">
            <span className="temp">{ currentTemp }</span>
            <span className="temp-symbol">°C</span>
            </p>
            <h2>Forecast</h2>
              <Plot
                xData={this.state.dates}
                yData={this.state.temps}
                type="scatter"
              />
            </div>
          ) : null }
        <p className="temp-wrapper">
          <span className="temp">{ currentTemp }</span>
          <span className="temp-symbol">°C</span>
        </p>
        <h2>Forecast</h2>
          <Plot
            xData={this.state.dates}
            yData={this.state.temps}
            type="scatter"
          />
      </div>
    )
  }
}

export default Weather;
