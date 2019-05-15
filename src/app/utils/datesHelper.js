import moment from 'moment'

const dateFormat = 'YYYY-MM-DD'

export const formattedDate = (date, format = dateFormat) => {
  let momentDate
  if (typeof date === 'number') {
    momentDate = moment().add(date, 'day')
  } else {
    momentDate = date === 'now' ? moment() : moment(date, dateFormat)
  }

  return momentDate.format(format)
}

export const formattedPeriod = (date, period = 'days', format = 'D MMMM') => {
  const startDate = moment(date, dateFormat)
  switch (period) {
    case 'weeks':
      return `${startDate.format(format)} — ${startDate
        .add(6, 'days')
        .format(format)}`
    case 'months':
      return startDate.format('MMMM')
    default:
      return startDate.format(format)
  }
}

export const getCurrentMonthRange = () => {
  const now = moment()
  const from = now.startOf('month').toDate()
  const to = now.endOf('month').toDate()
  return { from, to }
}

export const getCurrentMonth = () => {
  const month = moment().format('MMMM')
  return month.charAt(0).toUpperCase() + month.slice(1)
}

export const getLastMonthRange = () => {
  const lastMonth = moment().add(-1, 'months')
  const from = lastMonth.startOf('month').toDate()
  const to = lastMonth.endOf('month').toDate()
  return { from, to }
}

export const getRangeLabel = (dates, format, divider) => {
  if (!dates) return ''
  let label
  if (dates.startDate && dates.endDate) {
    if (dates.startDate === dates.endDate) {
      label = formattedDate(dates.startDate, format)
    } else {
      const startDateString = formattedDate(dates.startDate, format)
      const endDateString = formattedDate(dates.endDate, format)
      label = `${startDateString}${divider}${endDateString}`
    }
  } else {
    label = divider === '_' ? 'all_time' : 'За все время'
  }

  return label
}

export const getLastMonth = () => {
  const month = moment()
    .add(-1, 'months')
    .format('MMMM')
  return month.charAt(0).toUpperCase() + month.slice(1)
}

export const getCurrentStartYearDate = () => moment().startOf('year')

export const isDescendant = (parent, child) => {
  let node = child.parentNode
  while (node != null) {
    if (node === parent) {
      return true
    }
    node = node.parentNode
  }
  return false
}

export const dateInFormat = date => moment(date).format(dateFormat)

export const convertToDate = date => moment(date).toDate()
