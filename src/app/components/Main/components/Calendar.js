import React from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import PropTypes from 'prop-types'
import MomentLocaleUtils from 'react-day-picker/moment'
import classNames from 'classnames'
import CalendarList from './CalendarList'
import 'react-day-picker/lib/style.css'
import { formattedDate } from '../../../utils/datesHelper'
import './Calendar.css'

class Calendar extends React.Component {
  static defaultProps = {
    numberOfMonths: 2
  }

  constructor(props) {
    super(props)

    const { startDate, endDate } = props.dates
    this.state = {
      from: new Date(startDate),
      to: new Date(endDate)
    }
  }

  handleSetRange = range => {
    this.setState(range)
    const { from, to } = range
    const { onChangeDate, onToggle } = this.props

    onChangeDate({
      startDate: from && formattedDate(from),
      endDate: to && formattedDate(to)
    })
    onToggle()
  }

  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, this.state)
    this.setState(range)
  }

  handleSubmit = () => {
    const { from, to } = this.state
    const { onChangeDate, onToggle } = this.props

    onChangeDate({
      startDate: from && formattedDate(from),
      endDate: to && formattedDate(to)
    })
    onToggle()
  }

  clearSelectedDates = () => {
    const { onChangeDate, onToggle } = this.props

    this.setState({ from: null, to: null })
    onChangeDate({
      startDate: null,
      endDate: null
    })
    onToggle()
  }

  render() {
    const { dates, startCalendarDate } = this.props
    const { startDate, endDate } = dates
    const { from, to } = this.state
    const modifiers = { start: from, end: to }
    const isActive = () => {
      if (from && to && startDate && endDate) {
        return (
          formattedDate(from) !== startDate || formattedDate(to) !== endDate
        )
      }

      return !!(from || to || startDate || endDate)
    }
    const isChanged = isActive()

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-9" style={style.sidebar}>
            <DayPicker
              className="Selectable"
              toMonth={new Date()}
              numberOfMonths={this.props.numberOfMonths}
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              localeUtils={MomentLocaleUtils}
              onDayClick={this.handleDayClick}
            />
            <div className="buttons-block">
              <button
                className={classNames({
                  btn: true,
                  'btn-success': isChanged,
                  'btn-secondary': !isChanged
                })}
                disabled={!isChanged}
                style={style.buttons}
                onClick={this.clearSelectedDates}
              >
                Clear selection
              </button>
              <button
                className={classNames({
                  btn: true,
                  'btn-success': isChanged,
                  orange: isChanged,
                  'btn-secondary': !isChanged
                })}
                disabled={!isChanged}
                style={style.buttons}
                onClick={this.handleSubmit}
              >
                Apply
              </button>
            </div>
          </div>
          <div className="col-xs-3">
            <CalendarList
              dates={this.state}
              onSetRange={this.handleSetRange}
              startCalendarDate={startCalendarDate}
            />
          </div>
        </div>
      </div>
    )
  }
}

const style = {
  sidebar: {
    borderRight: '1px solid rgba(0, 0, 0, 0.1)'
  },
  buttons: {
    outline: 'none',
    cursor: 'pointer'
  }
}

Calendar.propTypes = {
  dates: PropTypes.object.isRequired,
  onChangeDate: PropTypes.func.isRequired,
  startCalendarDate: PropTypes.string
}

export default Calendar
