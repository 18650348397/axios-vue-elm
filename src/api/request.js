import axios from 'axios';
// import { Message } from "element-ui";


let baseURL = 'http://112.5.154.242:61901/'    //接口请求的域名(生产和测试环境一般不同)


/**
 * 请求类型为post时请求头的请求类型默认为{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
 * 可按实际修改为{headers: {'Content-Type': 'application/json; charset=UTF-8'}}或者{headers: {'Content-Type': 'multipart/form-data; charset=UTF-8'}}  跟在传参后
 * 列如:
 *  export function postHome(data){
        return server.post('Home/BlocManage/auth',data,{headers: {'Content-Type': 'multipart/form-data; charset=UTF-8'}})
    }
 */

const server = axios.create({     //创建axios实例
    baseURL: baseURL,
    timeout: 80000,
})


// 添加请求拦截器
server.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(1,config);
    // config.headers.token = 'cf11d3e17e00243f12212996ab6cf2a8'   //一般是判断是否存在token后再决定头部是否添加token
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

server.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log(2,response);
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default server
