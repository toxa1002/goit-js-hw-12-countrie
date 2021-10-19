const BASE_URL = 'https://restcountries.com/v2/name/'; 

function fetchingRequest(value){
  return fetch(`${BASE_URL}${value}`)
    .then(response => {
      return response.json()
    })
}
export default { fetchingRequest }

