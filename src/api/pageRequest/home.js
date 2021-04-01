import server from '@/api/request';

export function getHome(data){   //get请求传参
    return server.get('Home/BlocManage/getAuthUserList', {params:data})
}

export function postHome(data){   //post请求传参
    return server.post('Home/BlocManage/auth', data)
}
