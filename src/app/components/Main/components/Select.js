import React from 'react'
import PropTypes from 'prop-types'

const SELECT_TYPES = ['usa', 'uk', 'it']

const Select = props => {
  const { marketplaceType, changeSelect } = props

  const changeSelectValue = event => {
    const { value } = event.target
    changeSelect(value)
  }

  const renderOptions = () =>
    SELECT_TYPES.map((type, index) => (
      <option key={index} value={type}>
        {type}
      </option>
    ))

  return (
    <select value={marketplaceType} onChange={changeSelectValue}>
      {renderOptions()}
    </select>
  )
}

Select.propTypes = {
  props: PropTypes.object
}

export default Select
