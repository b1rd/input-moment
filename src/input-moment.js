import cx from 'classnames';
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { translate } from './locale'
import Calendar from './calendar';
import Time from './time';

const CALENDAR_TAB = 'currentDate'
const TIME_TAB_NUMBER = 1


export default class InputMoment extends Component {
  static propTypes = {
    moment: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    locale: PropTypes.oneOf(['ru', 'en']),
    minStep: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    setTime: PropTypes.func,
    onSave: PropTypes.func,
  }
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

  componentDidMount() {
    const m = moment()
    m.set({
      hour:12,minute:0,second:0,millisecond:0
    })
    this.setState({ currentDate: m })
    this.props.onChange(m)
  }

  handleChange = (m, key) => {
    const { currentTime, currentDate } = this.state
    if (!currentTime) {
      if (key === CALENDAR_TAB) {
        this.setState({ tab: TIME_TAB_NUMBER })
        const m = currentDate
        this.setState({ currentTime: m})
        this.props.onChange(m)
        this.props.setTime()
      } else {
        this.props.setTime()
      }
    }
    this.setState({ [key]: m})
    this.props.onChange(m)
  }

  handleClickTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab: tab });
  };

  handleSave = e => {
    e.preventDefault();
    const { currentTime, currentDate } = this.state
    if (!currentTime) {
      this.setState({ tab: TIME_TAB_NUMBER })
      const m = currentDate
      this.setState({ currentTime: m})
      this.props.onChange(m)
      this.props.setTime()
    } else {
      this.props.onSave();
    }
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
      onChange,
    } = this.props;
    const stateMoment = m || moment()
    if (!currentTime) {
      stateMoment.set({
        hour:12,minute:0,second:0,millisecond:0
      })
    }
    const cls = cx('m-input-moment', className);
    const t = translate(locale)
    return (
      <div className={cls} onChange={onChange}>
        <div className="m-input-moment__options">
          <button
            type="button"
            className={cx('m-input-moment__button m-input-moment__button_date', { 'm-input-moment__button_active': tab === 0 })}
            onClick={e => this.handleClickTab(e, 0)}
          >
            <img src={tab === 0 ? calendarIconActive : calendarIcon} className="m-input-moment__icon" />
            {t('date')}
          </button>
          <button
            type="button"
            className={cx('m-input-moment__button m-input-moment__button_time', { 'm-input-moment__button_active': tab === 1 })}
            onClick={e => this.handleClickTab(e, 1)}
          >
            <img src={tab === 1 ? timeIconActive : timeIcon} className="m-input-moment__icon" />
            {t('time')}
          </button>
        </div>

        <div className="m-input-moment__tabs">
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
            className="m-input-moment__button m-input-moment__button_save"
            onClick={this.handleSave}
          >
            {t('save')}
          </button>
        ) : null}
      </div>
    );
  }
}
