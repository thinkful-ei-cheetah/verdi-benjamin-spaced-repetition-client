import config from '../config'
import TokenService from './token-service'

const LanguageApiService = {
  async fetchOverview() {
    const res = await fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
    if (!res.ok) {
      res.json().then(e => Promise.reject(e))
    }
    return res.json();
  }
}

export default LanguageApiService;