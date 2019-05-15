import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Calendar from './Calendar'
import { formattedDate, isDescendant } from '../../../utils/datesHelper'
import calendarIcon from '../../../img/calendar-icon.svg'
import nextButtonIcon from '../../../img/ic_angle-right.svg'
import prevButtonIcon from '../../../img/ic_angle-left.svg'

class CalendarSelect extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      isOpen: false
    }
  }

  handleToggle = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
    document.body.addEventListener('click', this.closeDropdown)
  }

  handleClose = () => {
    this.setState({ isOpen: false })
    document.body.removeEventListener('click', this.closeDropdown)
  }

  closeDropdown = event => {
    if (isDescendant(this.ref.current, event.target)) return
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
    document.body.removeEventListener('click', this.closeDropdown)
  }

  render() {
    const { dates, onChangeDate, startCalendarDate } = this.props
    const { isOpen } = this.state
    let label
    if (dates.startDate && dates.endDate) {
      if (dates.startDate === dates.endDate) {
        label = formattedDate(dates.startDate, 'D MMMM, YYYY')
      } else {
        const startDateString = formattedDate(dates.startDate, 'D MMMM, YYYY')
        const endDateString = formattedDate(dates.endDate, 'D MMMM, YYYY')
        label = `${startDateString} — ${endDateString}`
      }
    } else {
      label = 'Lifetime'
    }

    const groupClassName = classnames({
      'dialog-container': true,
      open: isOpen
    })
    return (
      <div className={groupClassName}>
        <button
          type="button"
          className="dropdown-toggle nav-link"
          onClick={this.handleToggle}
        >
          <span>
            <img className="icon" alt="calendar" src={calendarIcon} />
            {label}
            <span>
              <img alt="prevButton" src={prevButtonIcon} />

              <img alt="nextButton" src={nextButtonIcon} />
            </span>
          </span>
        </button>
        <div
          ref={this.ref}
          className="dropdown-menu dropdown-menu-right"
          style={style.dropdown}
        >
          <Calendar
            dates={dates}
            onChangeDate={onChangeDate}
            onToggle={this.handleClose}
            startCalendarDate={startCalendarDate}
          />
        </div>
      </div>
    )
  }
}

const style = {
  dropdown: {
    width: '700px'
  }
}

CalendarSelect.propTypes = {
  dates: PropTypes.object.isRequired,
  onChangeDate: PropTypes.func.isRequired,
  startCalendarDate: PropTypes.string
}

export default CalendarSelect
