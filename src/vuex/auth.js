import Vue from 'vue'

const state = {
	token:'',
	currentUser:'',
}

const getters = {
	token:state=>state.token,
	user:state=>state.currentUser,
}

const mutations = {


	/**
	 * 设置登录
	 */
	set_login(state, user){
		state.currentUser = user;

		localStorage.setItem('currentUser',JSON.stringify(user));
	},

	/*
	 * 退出登录
	 */
	logout(state){
		state.hash = '';
		state.currentUser = null;
		localStorage.removeItem('currentUser');
		localStorage.removeItem('authToken');
		router.push({name:'login'});
	},

	/*
	 * 更新hash
	 */
	updateToken(state,token){
		state.token = token;

		localStorage.setItem('authToken',token);
	},

	// 重新加载, 从缓存中读取数据
	reload(){
		let token = localStorage.getItem('authToken');
		let user = localStorage.getItem('currentUser');
		if(token && user){
			user = JSON.parse(user);
			user && this.commit('auth/set_login',user);
			this.commit('auth/updateToken',token);
		}
	}
}

export default {
	namespaced: true,
    state,
    getters,
    mutations
}