import cx from 'classnames';
import React, { Component } from 'react';
import InputSlider from 'react-input-slider';
import moment from 'moment';
import { translate } from './locale'

export default class extends Component {
  changeHours = pos => {
    const m = this.props.moment;
    m.hours(pos.x);
    this.props.onChange(m, 'currentTime');
  };

  changeMinutes = pos => {
    const m = this.props.moment;
    m.minutes(pos.x);
    this.props.onChange(m, 'currentTime');
  };

  render() {
    const { locale, className } = this.props
    const m = this.props.moment || moment()
    const t = translate(locale)

    return (
      <div className={className}>
        <div className="m-time__showtime">
          <span className="m-time__showtime_time">{m.format('HH')}</span>
          <span className="m-time__showtime_separator">:</span>
          <span className="m-time__showtime_time">{m.format('mm')}</span>
        </div>

        <div className="m-time__sliders">
          <div className="m-time__sliders-text m-time__sliders-text_hours">{t('hours')}:</div>
          <InputSlider
            className="m-time__slider"
            xmin={0}
            xmax={23}
            xstep={this.props.hourStep}
            x={m.hour()}
            onChange={this.changeHours}
          />
          <div className="m-time__sliders-text m-time__sliders-text_minutes">{t('minutes')}:</div>
          <InputSlider
            className="m-time__slider"
            xmin={0}
            xmax={59}
            xstep={this.props.minStep}
            x={m.minute()}
            onChange={this.changeMinutes}
          />
        </div>
      </div>
    );
  }
}
