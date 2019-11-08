const state = {
	showSide:false
};

const mutations = {
	// 设置文章列表
	SET_SHOW_SIDE(state, data) {
	  state.showSide = data
	},
};

const actions = {
	/**
	 * 设置侧边栏显示状态
	 * @param state
	 * @param commit
	 * @param data
	 * @returns {Promise<void>}
	 */
	toggleSide({state, commit}) {
		let data=!state.showSide;
		commit('SET_SHOW_SIDE', data);
	}
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
