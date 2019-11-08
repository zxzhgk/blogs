import Vue from 'vue';
import Vuex from 'vuex';
// 医生

Vue.use(Vuex);

const store = new Vuex.Store({
  mutations: {},
  actions: {},
});

/**
 * 查询模块
 */
const modulesContext = require.context('@/store/modules', true, /\.js$/);

/**
 * 创建模块
 */
createStoreModules(modulesContext);

/**
 * 创建模块函数
 * @param fileArr
 */
function createStoreModules(fileArr) {
  fileArr.keys().forEach(modules => {
	//转换 app.js => app
	// fileArr(modules).default 取出模块的 default对象 控制台打印如下：
	// Module {default: {…}, __esModule: true, Symbol(Symbol.toStringTag): "Module"}
	// default:
	// actions: {openLoading: ƒ, closeLoading: ƒ}
	// getters: {isLoading: ƒ, loadingText: ƒ}
	// mutations: {PUSH_LOADING: ƒ, SHIFT_LOADING: ƒ, SHOULD_LOADING: ƒ}
	// namespaced: true
	// state: {__ob__: Observer}
	// __proto__: Object
	// Symbol(Symbol.toStringTag): "Module"
	// __esModule: true
	// __proto__: Object
    store.registerModule(modules.replace(/(^\.\/)|(\.js$)/g, ''), fileArr(modules).default)
  });
}

export default store;
