import cx from 'classnames';
import React, { Component } from 'react';
import moment from 'moment';
import { translate } from './locale'
import Calendar from './calendar';
import Time from './time';

export default class InputMoment extends Component {
  static defaultProps = {
    minStep: 1,
    hourStep: 1,
    locale: 'en'
  };

  state = {
    tab: 0,
    currentDate: null,
    currentTime: null
  };

  handleChange = (m, key) => {
    this.setState({ [key]: m})
    this.props.onChange(m)
  }

  handleClickTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab: tab });
  };

  handleSave = e => {
    e.preventDefault();
    if (this.props.onSave) this.props.onSave();
  };

  render() {
    const { tab, currentDate, currentTime } = this.state;
    const {
      moment: m,
      className,
      minStep,
      hourStep,
      onSave,
      locale,
      nextMonthIcon,
      prevMonthIcon,
      timeIcon,
      timeIconActive,
      calendarIcon,
      calendarIconActive,
      ...props
    } = this.props;
    const stateMoment = m || moment()
    const cls = cx('m-input-moment', className);
    const t = translate(locale)
    console.log(this.props)
    return (
      <div className={cls} {...props}>
        <div className="m-input-moment__options options">
          <button
            type="button"
            className={cx('m-input-moment__button m-input-moment__button_date im-btn', { 'm-input-moment__button_active is-active': tab === 0 })}
            onClick={e => this.handleClickTab(e, 0)}
          >
            <img src={tab === 0 ? calendarIconActive : calendarIcon} className="m-input-moment__icon im-btn__icon" />
            {t('date')}
          </button>
          <button
            type="button"
            className={cx('m-input-moment__button m-input-moment__button_time im-btn', { 'm-input-moment__button_active is-active': tab === 1 })}
            onClick={e => this.handleClickTab(e, 1)}
          >
            <img src={tab === 1 ? timeIconActive : timeIcon} className="m-input-moment__icon im-btn__icon" />
            {t('time')}
          </button>
        </div>

        <div className="m-input-moment__tabs tabs">
          <Calendar
            className={cx('m-input-moment__tab m-calendar', { 'm-input-moment__tab_active': tab === 0 })}
            moment={stateMoment}
            currentDate={currentDate}
            locale={locale}
            prevMonthIcon={prevMonthIcon}
            nextMonthIcon={nextMonthIcon}
            onChange={this.handleChange}
          />
          <Time
            className={cx('m-input-moment__tab m-time', { 'm-input-moment__tab_active': tab === 1 })}
            moment={stateMoment}
            locale={locale}
            minStep={this.props.minStep}
            hourStep={this.props.hourStep}
            onChange={this.handleChange}
          />
        </div>

        {this.props.onSave ? (
          <button
            type="button"
            disabled={!currentDate || !currentTime}
            className="m-input-moment__button m-input-moment__button_save im-btn btn-save"
            onClick={this.handleSave}
          >
            {t('save')}
          </button>
        ) : null}
      </div>
    );
  }
}
