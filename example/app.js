
import './app.pcss';
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
import '../src/styles/main.pcss'
class App extends Component {
  state = {
    m: '',
    timeSet: false,
    toggle: false,
  };

  handleChange = m => {
    this.setState({ m });
  };

  handleTimeChange = () => {
    this.setState({ timeSet: true })
  }

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
        <button onClick={() => this.setState({ toggle: !this.state.toggle })} style={{ width: '100px', height: '100px', backgroundColor: 'red'}}>kokok</button>
        <form>
          <div className="input">
            <input type="text" value={this.state.m && this.state.m.format('llll')} readOnly />
            {
              !this.state.timeSet
              ? <label>
                  <span>{this.state.m && this.state.m.format('llll').split(this.state.m.format('LT'))[0]}</span>
                  <span style={{ color: 'red' }}>{this.state.m && this.state.m.format('LT')}</span>
                </label>
              : <label>{this.state.m && this.state.m.format('llll')}</label>
            }
          </div>
          {this.state.toggle && <InputMoment
            moment={this.state.m}
            onChange={this.handleChange}
            minStep={5}
            onSave={this.handleSave}
            locale="ru"
            setTime={this.handleTimeChange}
            prevMonthIcon={`/${prevMonthIcon}`}
            nextMonthIcon={`/${nextMonthIcon}`}
            timeIcon={`/${timeIcon}`}
            timeIconActive={`/${timeIconActive}`}
            calendarIcon={`/${calendarIcon}`}
            calendarIconActive={`/${calendarIconActive}`}
          />}
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
