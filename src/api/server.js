
import axios from 'axios';
import qs from 'qs'
const server = axios.create({
    timeout: 15000 ,// 请求超时时间
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
})
server.interceptors.request.use(config => {
   
        if(config.method === 'post') {
            if(config.headers.files&&config.headers.files===true) {
                config.headers['Content-Type'] = 'multipart/form-data';
            }else{
                config.data = qs.stringify({
                    ...config.data
                })
            }
           
        } 
    return config
}, error => {
  
    Promise.reject(error)
});
// respone拦截器
server.interceptors.response.use(
    response => {
        const res = response.data;
        if (res) {
            return response.data;
        } else {;
            return Promise.reject('error');
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default server