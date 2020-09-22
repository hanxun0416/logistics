import base from '../../request/base/base'

let url = base.le
export default {
    getOffer: url + "trans/quote",//报价查询（待报价0，已报价1）
    getOfferDetail: url + "trans/quoteLine",//查询报价详情
    getOrder: url + "trans/orderList",//订单查询（0全部，1待派车，2待提货，3待传单据，4已签收）
    saveOffer: url + "trans/saveQuote",//提交报价
    getOrderDetail: url + "trans/queryLine",//查询订单详情
    getCarList: url + "trans/carList",//查询车辆列表
    saveCarList: url + "trans/saveCarList",//派出车辆
    saveTake: url + "trans/savePickType",//提货
    login: url + "trans/login",//结算一级页面之金额
    settleMoney: url + "trans/feeList",//结算一级页面之金额
    myInfo: url + "trans/myAccount",//获取我的资料
    myCar: url + "trans/myCar",//车辆管理
    myVoice: url + "trans/myVoice",//获取我的开票信息
    unSettleData: url + "trans/clearApplyMng",//获取我的对账信息
    addCar: url + "trans/addCar",//添加车辆
    deleteCar: url + "trans/delCar",//添加车辆
    tradeSettle: url + "trans/insertClearApplyMng",//贸易对账
    machineSettle: url + "trans/insertClearApplyMngJG",//加工对账
    unVoice: url + "trans/voiceList",//待开票列表
    upLoadImg: "http://uploadfile.lgsteel.cn/upload/uploadImage",//上传图片
    upVoice: url + "trans/insertVoice",//上传开票凭据
    invoiced: url + "trans/voiceListTd",//已开票列表
    settled:url+"trans/clearApplyMnged",//已对账
    getCode:url+'user/sendCheckCodeForResetPwd' ,//获取验证码(忘记密码)  
    editPassword:url+'user/editPassword' ,//修改密码
    userReg:url+'user/frontRegist' , //用户注册
    regGetCode:url+'user/sendCheckCode' ,//获取验证码(用户注册)
    realName:url+'user/saveApplyTrans' ,//实名认证
    sceneReview:url+'ste/loadOperatorsForSceneReview' ,//金牌商家
    reviewInfo:url+'user/loadApplyTransReviewInfo' ,//承运商注册页面数据展示
    downloadContract:url+'user/downloadContract', //下载合同
    queryFiles:url+'ste/queryFiles', //查询已上传文件
    TransLine:url+'trans/myTransLine' , //查询现有运输路线
    addTransLine:url+'trans/addTransLine',//添加运输路线
    updateTransLine:url+'trans/updateTransLine', //更新运输路线
}