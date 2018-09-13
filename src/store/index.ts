import Vue from "vue";
import Vuex, { ActionTree, MutationTree } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex)

interface State {
  login: Boolean;
   searchVal: string;
}

let state:State = {
  login: false,
  searchVal:''
}


export default new Vuex.Store({
	actions,
	mutations,
	getters,
	state,
});
