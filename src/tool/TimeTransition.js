export const timeSite = (num) => {
  if(num==""||num==null)return "";
  let Now = new Date(num*1000);
  let y = Now.getFullYear();
  let m = ("0" + (Now.getMonth() + 1)).slice(-2);
  let d = ("0" + Now.getDate()).slice(-2);
  return y + "-" + m + "-" + d + " " + Now.toTimeString().substr(0, 8);
}

export const numTime = (time) => {
  if(time==""||time==null)return "";
  let year = time.slice(0,4);
  let mon = time.slice(4,6);
  let day = time.slice(6,8);
  return year+'年'+mon+'月'+day+'日';
}
