import server from './server';
import url from './serviceAPI.config';

//首页信息
export function homemsg(data=4) {
    return server({
        url: url.homemsg+data,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}
//产品详情
export function productDetail(id,datatype,pdttype) {
    return server({
        url: url.homemsg+`product/documents?pdtId=${id}&dataType=${datatype}&pdtType=${pdttype}&orderByColum=id&isAsc=desc`,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}
export function getservices() {
    return server({
        url: url.getservices,
        method: 'GET',
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
    });
}
//产品列表
export function product() {
    return server({
        url: url.homemsg+"products",
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}

export function prodlist(data) {
    return server({
        url: url.prodlist+data+"&orderByColum=id&isAsc=desc",
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}

//获取疑问类型
export function qaTypeAlllist() {
    return server({
        url: url.qaTypeAlllist,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}
//获取疑问列表
// data：1,2,3,4,5
export function queryTypeToQa(data) {
    return server({
        url: url.queryTypeToQa+data,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}

//文件上传

export function UploadFile(data) {
    return server({
        url: url.UploadFile,
        method: 'post',
        headers:{
          contentType: "multipart/form-data;charset=UTF-8",
          files:true
        },

        data:data
    });
}

//专家讲堂
export function specialistClass(data) {
    return server({
        url: url.homemsg+`product/documents?specialist=${data}&orderByColum=id&isAsc=desc`,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}
//IndexSeach搜索
export function IndexSeach(data) {
    return server({
        url: url.IndexSeach+`?seach=${data}`,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}
// addQuestion添加问题
export function addQuestion(data) {
    return server({
        url: url.addQuestion,
        method: 'post',
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data:data
    });
}
//省份列表数据
export function provincials() {
    return server({
        url: url.homemsgs+`provincials`,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}
//案例数据
export function getCaseData(v) {
    return server({
        url: url.homemsg+`product/documents?catalogType=${v}&orderByColum=id&isAsc=desc`,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}
//省市筛选
export function selectData(a,b) {
    return server({
        url: url.homemsg+`product/documents?catalogType=${a}&provincialId=${b}`,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}
//省市筛选1
export function selectData1(a,b,c,d) {
    return server({
        url: url.homemsg+`product/documents?pdtId=${a}&provincialId=${b}&pdtType=${d}&orderByColum=id&isAsc=desc`,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}
//qalist获取本人发送消息
export function qalist(data) {
    return server({
        url: url.qalist+data,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}

//getprodoct获取行销等数据
export function getprodoct(data) {
    return server({
        url: url.getprodoct+data,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}
//截取url登录信息存进数据数据库
export function saveLoginInfo(a,b,c,d,point,city){
    return server({
        url: url.getLoginInfo+`?empno=${a}&fgsName=${b}&p13Account=${c}&userid=${d}&point=${point}&city=${city}`,
        method: 'post',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}
//documentOpen浏览记录
// 文档id docId 文档类型 docType:1/2  打开时间openTime  结束时间readTime  文档title title  用户id userid
export function documentOpen(data){
    return server({
        url:url.documentOpen,
        method:"post",
        dataType:'json',
        contentType:"application/json;charset=UTF-8",
        data:data
    })
}

//pageOpen頁面打開瀏覽接口
export function pageOpen(data){
    return server({
        url:url.pageOpen,
        method:'post',
        dataType:'json',
        contentType:'application/json;charset=UTF-8',
        data:data
    })
}

//articles 查询文章
export function articles() {
    return server({
        url: url.articles,
        method: 'get',
        dataType: "json",
		contentType: "application/json;charset=UTF-8",
    });
}
//ClickVIEW
export function ClickVIEW(data) {
    return server({
        url: url.ClickVIEW,
        method: 'post',
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data:data
    });
}

// getNewPageMsg
export function getNewPageMsg(data) {
    return server({
        url: url.getNewPageMsg+data,
        method: 'get',
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
    });
}

//documentClick文档点击
export function documentClick(data) {
    return server({
        url: url.documentClick,
        method: 'post',
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data:data
    });
}