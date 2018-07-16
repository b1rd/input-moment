import cx from 'classnames';
import React, { Component } from 'react';
import InputSlider from 'react-input-slider';
import { translate } from './locale'

export default class extends Component {
  changeHours = pos => {
    const m = this.props.moment;
    m.hours(pos.x);
    this.props.onChange(m);
  };

  changeMinutes = pos => {
    const m = this.props.moment;
    m.minutes(pos.x);
    this.props.onChange(m);
  };

  render() {
    const { locale } = this.props
    const m = this.props.moment;
    const t = translate(locale)

    return (
      <div className={cx('m-time', this.props.className)}>
        <div className="showtime">
          <span className="time">{m.format('HH')}</span>
          <span className="separator">:</span>
          <span className="time">{m.format('mm')}</span>
        </div>

        <div className="sliders">
          <div className="time-text">{t('hours')}:</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={23}
            xstep={this.props.hourStep}
            x={m.hour()}
            onChange={this.changeHours}
          />
          <div className="time-text time-text__minutes">{t('minutes')}:</div>
          <InputSlider
            className="u-slider-time"
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