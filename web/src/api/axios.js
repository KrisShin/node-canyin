import axios from 'axios'

const requestIp = '127.0.0.1:3600'
const request = axios.create({
  baseURL: 'http://' + requestIp,
  timeout: 5000
})

export default request