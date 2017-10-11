import React from 'react';
import './Weather.css';
import xhr from 'xhr';
import Plot from './Plot';

class Weather extends React.Component {
  state = {
    location: '',
    data: {},
    dates: [],
    temps: [],
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
          temps: temps,
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
    let currentCondition = 'condition not loaded yet';
    if(this.state.data.list) {
      currentCondition = this.state.data.list[0].weather[0].main;
    }
    let currentSuggestion = 'No suggestion yet...';
    if(currentCondition.indexOf('Rain')>=0) {
      currentSuggestion = 'Pack an umbrella...'
    } else {
      currentSuggestion = 'No need to pack an umbrella today!'
    }
    return (
      <div>
        <div className="current">
          <h1 className="weather">Weather</h1>
          <form onSubmit={this.fetchData}>
            <h3>I want to know the weather for
              <button className="focus" placeholder=":focus"
                value={this.state.location}
                onChange={this.changeLocation}>London</button>
            </h3>
          </form>
        </div>
        {(this.state.data.list) ? (
          <div className="wrapper">
            <p className="temp-wrapper">
            Current Temperature:
            <span className="temp">{ currentTemp }</span>
            <span className="temp-symbol">°C</span>
            </p>
            <p className="cond-wrapper">
            Current Condition:
            <span className="condition">{ currentCondition }</span>
            </p>
            <p className="suggest-wrapper">
            Suggestion:
            <span className="suggestion">{ currentSuggestion }</span>
            </p>
            <h2 className="forecast">Forecast for the next 4 days</h2>
              <Plot
                xData={this.state.dates}
                yData={this.state.temps}
                type="scatter"
              />
          </div>
        ) : null }
      </div>
    )
  }
}

export default Weather;
