import cx from 'classnames';
import React, { Component } from 'react';
import { translate } from './locale'
import timeIcon from '../assets/time-icon.svg'
import timeIconActive from '../assets/time-icon-active.svg'
import calendarIcon from '../assets/calendar-icon.svg'
import calendarIconActive from '../assets/calendar-icon-active.svg'
import Calendar from './calendar';
import Time from './time';

export default class InputMoment extends Component {
  static defaultProps = {
    prevMonthIcon: 'ion-ios-arrow-left',
    nextMonthIcon: 'ion-ios-arrow-right',
    minStep: 1,
    hourStep: 1,
    locale: 'en'
  };

  state = {
    tab: 0
  };

  handleClickTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab: tab });
  };

  handleSave = e => {
    e.preventDefault();
    if (this.props.onSave) this.props.onSave();
  };

  render() {
    const { tab } = this.state;
    const {
      moment: m,
      className,
      prevMonthIcon,
      nextMonthIcon,
      minStep,
      hourStep,
      onSave,
      locale,
      ...props
    } = this.props;
    const cls = cx('m-input-moment', className);
    const t = translate(locale)
    return (
      <div className={cls} {...props}>
        <div className="options">
          <button
            type="button"
            className={cx('im-btn', { 'is-active': tab === 0 })}
            onClick={e => this.handleClickTab(e, 0)}
          >
            <img src={`/${tab === 0 ? calendarIconActive : calendarIcon}`} className="im-btn__icon" />
            {t('date')}
          </button>
          <button
            type="button"
            className={cx('im-btn', { 'is-active': tab === 1 })}
            onClick={e => this.handleClickTab(e, 1)}
          >
            <img src={`/${tab === 1 ? timeIconActive : timeIcon}`} className="im-btn__icon" />
            {t('time')}
          </button>
        </div>

        <div className="tabs">
          <Calendar
            className={cx('tab', { 'is-active': tab === 0 })}
            moment={m}
            locale={locale}
            onChange={this.props.onChange}
            prevMonthIcon={this.props.prevMonthIcon}
            nextMonthIcon={this.props.nextMonthIcon}
          />
          <Time
            className={cx('tab', { 'is-active': tab === 1 })}
            moment={m}
            locale={locale}
            minStep={this.props.minStep}
            hourStep={this.props.hourStep}
            onChange={this.props.onChange}
          />
        </div>

        {this.props.onSave ? (
          <button
            type="button"
            className="im-btn btn-save"
            onClick={this.handleSave}
          >
            {t('save')}
          </button>
        ) : null}
      </div>
    );
  }
}
