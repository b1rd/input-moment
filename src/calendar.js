import React, { Component } from 'react';
import cx from 'classnames';
import { translate } from './locale'
import moment from 'moment';
import range from 'lodash/range';
import chunk from 'lodash/chunk';

const DAY = 'DD'
const MONTH_YEAR = 'MM.YYYY'

const Day = ({ i, w, d, className, currentDate, currentDayIndex, ...props }) => {
  const prevMonth = w === 0 && i > 7;
  const nextMonth = w >= 4 && i <= 14;
  const cls = cx('m-calendar__td m-calendar__td_body', {
    'prev-month': prevMonth,
    'm-calendar__td_next next-month-calendar': nextMonth,
    'current-day': !prevMonth && !nextMonth && i === d,
    'today': currentDayIndex === i && !prevMonth && !nextMonth,
  });
  return <td className={cls} {...props}>{i}</td>;
};

export default class Calendar extends Component {
  selectDate = (i, w) => {
    const prevMonth = w === 0 && i > 7;
    const nextMonth = w >= 4 && i <= 14;
    const m = this.props.moment;

    if (prevMonth) m.subtract(1, 'month');
    if (nextMonth) m.add(1, 'month');
    m.date(i)
    this.props.onChange(m, 'currentDate');
  };

  prevMonth = e => {
    e.preventDefault();
    this.props.onChange(this.props.moment.subtract(1, 'month'));
  };

  nextMonth = e => {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, 'month'));
  };

  render() {
    const { locale, prevMonthIcon, nextMonthIcon, className, currentDate } = this.props
    const m = this.props.moment;
    const d = m.date();
    const d1 = m.clone().subtract(1, 'month').endOf('month').date();
    const d2 = m.clone().date(1).day();
    const d3 = m.clone().endOf('month').date();
    const days = [].concat(
      range(d1 - d2 + 2, d1 + 1),
      range(1, d3 + 1),
      range(1, 42 - d3 - d2 + 1)
    );
    const t = translate(locale)
    const weeks = t('week')

    let currentDayIndex = null
    if (moment(new Date()).format(MONTH_YEAR)=== m.format(MONTH_YEAR)) {
      currentDayIndex = parseInt(moment(new Date()).format(DAY), 10)
    }
    
    return (
      <div className={className}>
        <div className="m-calendar__toolbar">
          <button type="button" className="m-calendar__button m-calendar__button_prev" onClick={this.prevMonth}>
            <img className="m-calendar__icon m-calendar__icon_prev" src={prevMonthIcon} />
          </button>
          <span className="m-calendar__current-date">{m.format('MMMM YYYY')}</span>
          <button type="button" className="m-calendar__button m-calendar__button_next" onClick={this.nextMonth}>
            <img className="m-calendar__icon m-calendar__icon_next" src={nextMonthIcon} />
          </button>
        </div>

        <table className="m-calendar__table">
          <thead className="m-calendar__thead">
            <tr className="m-calendar__tr m-calendar__tr_head">
              {weeks.map((w, i) => <td className="m-calendar__td m-calendar__td_head" key={i}>{w}</td>)}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, w) =>
              <tr key={w}>
                {row.map(i =>
                  <Day
                    key={i}
                    i={i}
                    d={d}
                    w={w}
                    currentDate={currentDate}
                    currentDayIndex={currentDayIndex}
                    onClick={() => this.selectDate(i, w)}
                  />
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
