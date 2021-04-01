import axios from 'axios';
import { Message } from "element-ui";


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
    // config.headers.token = '7b569b6b1660fa23162567d0c35ad51a'   //一般是判断是否存在token后再决定头部是否添加token
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

server.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log(2,response);

    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    if (response.status === 200) {            
        return Promise.resolve(response);        
    } else {            
        return Promise.reject(response);        
    }  

    // return response;
}, function (error) {
    // 对响应错误做点什么
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    if (error.response.status) {            
        switch (error.response.status) {                
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。                
            case 401:                    
                // router.replace({                        
                //     path: '/login',                        
                //     query: { 
                //         redirect: router.currentRoute.fullPath 
                //     }
                // });
                break;

            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面                
            case 403:
                Message.error('登录过期，请重新登录');
                // 清除token
                localStorage.removeItem('token');
                // store.commit('loginSuccess', null);
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
                setTimeout(() => {                        
                    // router.replace({                            
                    //     path: '/login',                            
                    //     query: { 
                    //         redirect: router.currentRoute.fullPath 
                    //     }                        
                    // });                    
                }, 1000);                    
                break; 

            // 404请求不存在
            case 404:
                Message.error('网络请求不存在');
                break;
            // 其他错误，直接抛出错误提示
            default:
                Message.error(error.response.data.message);
        }
        return Promise.reject(error.response);
    }
    // return Promise.reject(error);
});


export default server
