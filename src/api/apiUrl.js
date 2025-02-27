//用户列表
export const user_list = 'by_UserAccount_queryInfo'
//设置用户等级
export const user_setGrade = 'by_UserGrade_setGrade'
//查看用户手续费
export const user_queryFee = 'by_CbUserFee_query'

//首次设置用户手续费-快捷
export const set_UserFeeQuick = 'by_CbUserFee_createQuickFee'
//更新用户手续费-快捷
export const update_UserFeeQuick = 'by_CbUserFee_updateQuickFee'
//代扣代付设置 首次设置手续费
export const set_UserFeeNormal = 'by_CbUserFee_createNormalFee'
//代扣代付更新 更新用户手续费
export const update_UserFeeNormal = 'by_CbUserFee_updateNormalFee'

//待审核列表
export const exmine_list = 'by_UserIdCard_query'
//用户认证详情
export const user_exmine_detail = 'by_UserIdCard_info'
//用户审核通过
export const exmine_success = 'by_UserIdCard_pass'
//审核驳回
export const exmine_reject = 'by_UserIdCard_deny';
//用户登录
export const Login = 'by_UserLoginSession_loginByMobilePassword';

//banner列表
export const banner_list = 'by_Banners_query'
//banner广告位删除
export const banner_delete = 'by_Banners_delete'
//banner广告位修改
export const banner_update = 'by_Banners_update'
// //banner广告位添加
export const banner_add = 'by_Banners_create'
//banner 获取跳转类型
export const banner_query = 'by_Datatree_query'
//banner 返回banner广告位信息
export const banner_info = 'by_Banners_bannerInfo'
//banner 返回banner广告图位置
export const banner_position = 'by_Banners_queryPosition'


//意见反馈列表
export const suggest_list = 'bu_Suggest_query'
//消息列表
export const publicMessage_list = 'by_Message_queryPublicMessage'
//消息添加
export const message_create = 'by_Message_create'
//消息内容编辑
export const message_update = 'by_Message_update'

//支付通道
export const payment_list = 'by_PaymentChannel_query'
//支付通道关联会员配置查询
export const payment_queryByChannel = 'by_PaymentChannel_queryByChannel'
//支付通道添加
export const payment_add = 'by_PaymentChannel_add'
//支付通道编辑
export const payment_edit = 'by_PaymentChannel_update'


//订单查询
export const order_list = 'by_CbOrder_query'
//订单详情
export const order_info = 'by_CbOrder_info'

//身份证黑名单查询
export const blackIdCard_list = 'by_BlackIdCard_query'
//身份证黑名单添加
export const blackIdCard_add = 'by_BlackIdCard_add'
//身份证黑名单删除
export const blackIdCard_delete = 'by_BlackIdCard_delete'

//身份证黑名单删除
export const userInvite_query = 'by_UserInvite_query'
