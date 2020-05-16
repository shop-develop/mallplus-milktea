import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import addresses from '@/api/addresses'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		store: {},
		cart: [],
		orderType: 'takein',
		address: {},
		addresses: addresses,
		member: {},
		order: {}
	},
	getters: {

		isLogin: state => uni.getStorageSync('token') || ''	//是否登录
	},
	mutations: {
		SET_ORDER_TYPE(state, type) {
			state.orderType = type
		},
		SET_MEMBER(state, member) {
			state.member = member
		},
		SET_ADDRESS(state, address) {
			state.address = address
		},
		SET_STORE(state, store) {
			state.store = store
		},
		SET_CART(state, cart) {
			state.cart = cart
		},
		REMOVE_CART(state) {
			state.cart = []
		},
		SET_ORDER(state, order) {
			state.order = order
		}
	},
	actions: {
		async getStore({commit}) {
			const store = await api('store')
			commit('SET_STORE', store)
		}
	}
})

export default store