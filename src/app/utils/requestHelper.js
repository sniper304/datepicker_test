const fetchInitParams = () => {
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const initParams = {
    method: 'GET',
    headers: myHeaders
  }

  return initParams
}

const getStartDateOfSales = type => {
  if (!type) {
    type = 'usa'
  }

  return new Promise((resolve, reject) => {
    fetch(`api/test/start_of_sales?marketplace=${type}`, fetchInitParams())
      .then(response => response.json())
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default getStartDateOfSales
