const userDB = [
  { username: 'admin', password: 'admin', uuid: 'admin-uuid', name: '管理员' },
  { username: 'editor', password: 'editor', uuid: 'editor-uuid', name: '编辑' },
]
// const userDB = [
//   { mobile: '13484379290', password: '1234567890', device_token: 'tt', device_type: 'pc',loginInfo:'pc' },
// ]
export default [
  {
    path: '/api/login',
    method: 'post',
    handle ({ body }) {
      const user = userDB.find(e => e.username === body.username && e.password === body.password)
      if (user) {
        return {
          code: 0,
          msg: '登录成功',
          data: {
            ...user,
            token: '8dfhassad0asdjwoeiruty'
          }
        }
      } else {
        return {
          code: 401,
          msg: '用户名或密码错误',
          data: {}
        }
      }
      return {
            code: 0,
            msg: '登录成功',
            data: {
              ...user,
              token: '8dfhassad0asdjwoeiruty'
            }
          }
    }
  }
]
