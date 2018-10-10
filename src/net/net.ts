  // const BASE_URL = 'http://192.168.34.183:10000';//开发地址
//  const BASE_URL = 'http://172.18.101.118:10000';//开发地址（内部开发和测试的地址）
  // const BASE_URL = 'http://172.18.101.111:10000';//测试地址（正式提测的地址）
  // const BASE_URL = 'http://bi.jieyuechina.com/api'; //正式环境地址, #***###记得修改我的-关于-版本号

const BASE_URL_DEV:string = 'http://172.18.101.118:10000';    //测试地址（正式提测的地址）
const BASE_URL_PROD:string = 'http://bi.jieyuechina.com/api'; //正式环境地址
const debug:boolean = process.env.NODE_ENV !== 'production';
const URL = debug ? BASE_URL_DEV:BASE_URL_PROD;
export default URL;

