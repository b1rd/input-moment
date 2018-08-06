
import './app.scss';
import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMoment from '../src/input-moment';
import packageJson from '../package.json';
import prevMonthIcon from '../assets/prev-month-icon.svg'
import nextMonthIcon from '../assets/next-month-icon.svg'
import timeIcon from '../assets/time-icon.svg'
import timeIconActive from '../assets/time-icon-active.svg'
import calendarIcon from '../assets/calendar-icon.svg'
import calendarIconActive from '../assets/calendar-icon-active.svg'
import 'src/styles/main.scss'
class App extends Component {
  state = {
    m: ''
  };

  handleChange = m => {
    this.setState({ m });
  };

  handleSave = () => {
    console.log('saved', this.state.m.format('llll'));
  };

  render() {
    return (
      <div className="app">
        <h1>
          {packageJson.name}: {packageJson.version}
        </h1>
        <h2>{packageJson.description}</h2>
        <form>
          <div className="input">
            <input type="text" value={this.state.m && this.state.m.format('llll')} readOnly />
          </div>
          <InputMoment
            moment={this.state.m}
            onChange={this.handleChange}
            minStep={5}
            onSave={this.handleSave}
            locale="ru"
            prevMonthIcon={`/${prevMonthIcon}`}
            nextMonthIcon={`/${nextMonthIcon}`}
            timeIcon={`/${timeIcon}`}
            timeIconActive={`/${timeIconActive}`}
            calendarIcon={`/${calendarIcon}`}
            calendarIconActive={`/${calendarIconActive}`}
          />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
