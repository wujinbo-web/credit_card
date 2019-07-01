import request from '@/plugin/axios';
import { API_URL } from '@/config';
import { Login } from '@/api/apiUrl';

export function AccountLogin (data) {
  return request({
    url: API_URL,
    method: 'post',
    data: qs(Login, data)
  })
}

function qs(url,params){
  let arr=[];
  arr.push(`app_type=pc`);
  arr.push(`app_version=1.0.0`);
  arr.push(`notify_id=133`);
  arr.push(`lang=zh-cn`);
  arr.push(`service_version=100`);
  arr.push(`service_type=${url}`);
  arr.push(`client_id=04esfI0fYuD5`);//固定的
  arr.push(`app_request_time=1000000`);
  arr.push(`device_token=tt`); //设备标识
  arr.push(`device_type=pc`);//设备类型(获取浏览器的类型)
  arr.push(`loginInfo=pc`);//登录额外信息，可传空字符串
  // arr.push(`service_type=${url}`);
  for(let key in params){
    arr.push(`${key}=${params[key]}`);
  }
  return arr.join("&");
}