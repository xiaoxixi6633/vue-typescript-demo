import {ActionTree} from 'vuex';
import axios from 'axios';
import TYPES from './types';
//import modules from '../mock/slides';
const actions: ActionTree<any, any> = {
  // ajax 初始化
  async initAjax({ dispatch }) {
    dispatch('getModules')
    //dispatch('getHeadline')
    //setTimeout(() => dispatch('getActivity'), 2000)
    //dispatch('getSuperSale')
    //dispatch('getShops')
  },
  // 获取modules
  async getModules({ state, commit }) {
    let _res = [
      {id:'北京',price:'100',time:'2018-10-23'},
      {id:'北京',price:'100',time:'2018-10-23'},
      {id:'北京',price:'100',time:'2018-10-23'},
      {id:'北京',price:'100',time:'2018-10-23'},
      {id:'北京',price:'100',time:'2018-10-23'},
      {id:'北京',price:'100',time:'2018-10-23'},
      {id:'北京',price:'100',time:'2018-10-23'},
      {id:'北京',price:'100',time:'2018-10-23'},
      {id:'北京',price:'100',time:'2018-10-23'},
      {id:'北京',price:'100',time:'2018-10-23'},
      {id:'北京',price:'100',time:'2018-10-23'},
      {id:'北京',price:'100',time:'2018-10-23'},
    ];
    const res: Ajax.AjaxResponse = await axios.post('/mc-message/message/notice/list',{token: 'sdjfksdjflkdsf', currentPage:1},{headers:{'Content-Type':'application/json;charset=UTF-8'}}).then((res) => res.data).catch((e: string) => console.error(e))
    if (res && res.code == 200) commit(TYPES.SET_MODULES, res.data)
    console.log(res);
    commit(TYPES.SET_MODULES, _res)
  },
  // 点评头条
  async getHeadline({ state, commit }) {
    const res: Ajax.AjaxResponse = await axios.get('/headline').then((res) => res.data).catch((e: string) => console.error(e))
    if (res && res.code == 200) commit(TYPES.SET_HEADLINE, res.result.list)
  },
  // 活动面板
  async getActivity({ state, commit }) {
    const res: Ajax.AjaxResponse = await axios.get('/activity').then((res) => res.data).catch((e: string) => console.error(e))
    if (res && res.code == 200) commit(TYPES.SET_ACTIVITIES, res.result.list)
  },
  // 特卖优惠
  async getSuperSale({ state, commit }) {
    const res: Ajax.AjaxResponse = await axios.get('/supersale').then((res) => res.data).catch((e: string) => console.error(e))
    if (res && res.code == 200) commit(TYPES.SET_SUPER_SALE, res.result.list)
  },
  // 商户列表
  async getShops({ state, commit }) {
    const res: Ajax.AjaxResponse = await axios.get('/shops').then((res) => res.data).catch((e: string) => console.error(e))
    if (res && res.code == 200) commit(TYPES.SET_SHOPS, res.result.list)
  },
  // 更新搜索内容
  setSearchVal({ commit }, val: string) {
    commit(TYPES.SET_SEARCH_VAL, val)
  }
}

export default actions

