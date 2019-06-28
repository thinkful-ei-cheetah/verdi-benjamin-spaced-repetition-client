let apiPath;
let tokenKey;
if (process.env.NODE_ENV === 'production') {
  apiPath = 'https://bonjour-api.herokuapp.com/api'
  tokenKey = 'bonjour-app-prod-auth-token'
} else {
  apiPath = 'http://localhost:8000/api'
  tokenKey = 'bonjour-app-dev-auth-token'
}

export default {
  API_ENDPOINT: apiPath,
  TOKEN_KEY: tokenKey,
}
