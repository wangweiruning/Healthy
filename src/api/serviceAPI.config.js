/***
 *
 * 统一定义接口，有利于维护
 *
 **/
export const serverUrl = process.env.NODE_ENV === 'production' ?
  'http://47.98.139.33:4001' :
  'http://47.98.139.33:4001';

export const shareUrl = 'http://cpicaics.abtpt.com/api/abtsystem/outer/doRecord';  

const HISTORY = `${serverUrl}/api/index/`;
const HISTORYS = `${serverUrl}/api/`;
const http = `${serverUrl}/`;
const fileURL = `${serverUrl}/profile/upload/`;//图片地址
const scollurl = `http://healthyh5.relywisdom.com/scoll/`;  // 核保页面

const URL = {
  homemsg: HISTORY,//获取首页信息
  prodlist: HISTORY + 'product/documents',
  getservices: HISTORY + 'services',
  qaTypeAlllist: http + "api/qaTypeAlllist",
  queryTypeToQa: http + "api/queryTypeToQa/",
  UploadFile: http + 'api/operation/UploadFile',
  homemsgs: HISTORYS,
  IndexSeach: HISTORY + 'seach',
  addQuestion: http + 'api/addQuestion',
  fileURL: fileURL,
  qalist: HISTORY + 'qa/list',
  http: scollurl,
  getprodoct: HISTORY + "product/campaign",
  getLoginInfo: HISTORYS + "count/logininfo",
  documentOpen:http+'api/count/documentOpen/add',
  pageOpen:http+'api/count/pageOpen/add',
  articles:http+'api/count/articles',
  ClickVIEW:http+'api/count/documentShare/add',
  getNewPageMsg:http+'api/count/article/',//通过文章id查询数据
  documentClick:http+'api/count/documentClick/add',//文档点击监听

};
export default URL

