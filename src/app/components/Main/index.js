import React, { Component } from 'react'
import getStartDateOfSales from '../../utils/requestHelper'
import MarketplaceSelect from './components/Select'
import CalendarSelect from './components/CalendarSelect'
import { formattedDate } from '../../utils/datesHelper'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marketplace: 'usa',
      startSalesDate: null,
      dates: {
        startDate: formattedDate(-6),
        endDate: formattedDate('now')
      }
    }
  }

  componentDidMount() {
    this.getDateByMarketplace()
  }

  getDateByMarketplace = async () => {
    const { marketplace } = this.state
    const { date } = await getStartDateOfSales(marketplace)
    this.setState({ startSalesDate: formattedDate(date) })
  }

  onSelectChange = marketplace => {
    this.setState({ marketplace }, this.getDateByMarketplace)
  }

  onChangeDate = dates => {
    this.setState({ dates })
  }

  render() {
    const { marketplace, dates, startSalesDate } = this.state

    return (
      <div className="select">
        <MarketplaceSelect
          marketplace={marketplace}
          changeSelect={this.onSelectChange}
        />
        <CalendarSelect
          dates={dates}
          onChangeDate={this.onChangeDate}
          startCalendarDate={startSalesDate}
        />
      </div>
    )
  }
}

export default Main
