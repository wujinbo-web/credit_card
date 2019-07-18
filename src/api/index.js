import { API_URL } from '@/config';
import request from '@/plugin/axios';
import util from '@/libs/util';

export function postUrl (url, params) {
  return request({
    url: API_URL,
    method: 'post',
    data: qs(url,params)
  })
}

function qs(url,params){

  const token = util.cookies.get('token');
  const uuid = util.cookies.get('uuid');
  let arr=[];
  arr.push(`app_type=pc`);
  arr.push(`app_version=1.0.0`);
  arr.push(`notify_id=133`);
  arr.push(`lang=zh-cn`);
  arr.push(`service_version=100`);
  arr.push(`service_type=${url}`);
  arr.push(`client_id=04esfI0fYuD5`);//固定的
  arr.push(`app_request_time=1000000`);
  arr.push(`uid=${uuid}`);//登陆时候传入，现在写死
  arr.push(`sid=${token}`);//登陆时候传入，现在写死
  for(let key in params){
    arr.push(`${key}=${params[key]}`);
  }
  return arr.join("&");
}
