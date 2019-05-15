import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
  formattedDate,
  getCurrentMonthRange,
  getLastMonthRange,
  getCurrentMonth,
  getLastMonth,
  getCurrentStartYearDate
} from '../../../utils/datesHelper'

class CalendarList extends React.Component {
  getHandleClick = range => {
    return () => {
      const { onSetRange } = this.props
      onSetRange(range)
    }
  }

  render() {
    const { dates, startCalendarDate } = this.props
    const today = {
      from: new Date(formattedDate('now')),
      to: new Date(formattedDate('now'))
    }
    const yesterday = {
      from: new Date(formattedDate(-1)),
      to: new Date(formattedDate(-1))
    }
    const week = {
      from: new Date(formattedDate(-6)),
      to: new Date(formattedDate('now'))
    }
    const month = {
      from: new Date(formattedDate(-29)),
      to: new Date(formattedDate('now'))
    }
    const currentMonth = getCurrentMonthRange()
    const lastMonth = getLastMonthRange()
    const thisYear = {
      from: new Date(formattedDate(getCurrentStartYearDate())),
      to: new Date(formattedDate('now'))
    }
    const ever = {
      from: new Date(formattedDate(startCalendarDate)),
      to: new Date(formattedDate('now'))
    }

    const list = [
      { label: 'Today', range: today },
      { label: 'Yesterday', range: yesterday },
      { label: 'Last 7 days', range: week },
      { label: 'Last 30 days', range: month },
      { label: getCurrentMonth(), range: currentMonth },
      { label: getLastMonth(), range: lastMonth },
      { label: 'This year', range: thisYear },
      { label: 'LifeTime', range: ever }
    ]
    const getIsActive = range => {
      if (range.from && range.to && dates.from && range.to) {
        return (
          range.from.toString() === dates.from.toString() &&
          range.to.toString() === dates.to.toString()
        )
      }

      return !dates.from && !dates.to && !range.from && !range.to
    }
    return (
      <div className="flex-column">
        {list.map((item, index) => (
          <Item
            key={index}
            label={item.label}
            range={item.range}
            isActive={getIsActive(item.range)}
            onClick={this.getHandleClick(item.range)}
          />
        ))}
      </div>
    )
  }
}

const Item = ({ label, range, isActive, onClick }) => {
  const className = classNames({
    'nav-link': true,
    active: isActive
  })
  return (
    <button
      className={className}
      style={{
        outline: 'none',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

CalendarList.propTypes = {
  dates: PropTypes.object.isRequired,
  onSetRange: PropTypes.func.isRequired,
  startCalendarDate: PropTypes.string
}

export default CalendarList
