// Axios Imports
import { create } from 'axios'

// MD5 Imports
import md5 from 'md5'

// Helpers Imports
import clearObject from '../helpers/clearObject'

// Creating axios instance with configuration
const instance = create({
  baseURL: process.env.API_URL,
  timeout: 5000
})

// Creating Auth interceptor to use Marvel API
instance.interceptors.request.use(config => {
  if (config.method === 'get') {
    const ts = Date.now().toString()
    const hash = md5(ts + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY)
    const auth = {
      ts, 
      apikey: process.env.PUBLIC_KEY,
      hash
    }
    clearObject(config.params)
    config.params = { ...config.params, ...auth }
  }
  return config
})

export default instance
