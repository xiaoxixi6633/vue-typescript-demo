const BASE_URL_DEV:string = 'http://172.18.101.111:10000';    //测试地址（正式提测的地址）
const BASE_URL_PROD:string = 'http://bi.jieyuechina.com/api'; //正式环境地址
const debug:boolean = process.env.NODE_ENV !== 'production';
const URL = debug ? BASE_URL_DEV:BASE_URL_PROD;
export default URL;

