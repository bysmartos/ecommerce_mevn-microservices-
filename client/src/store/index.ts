import Vuex from 'vuex';
import IUser from '@/interfaces/user.interface';
import State from '@/interfaces/state.interface';
import { logout } from "../services/auth.service";

const userData = localStorage.getItem('user');

const store = new Vuex.Store({
  state: {
    user: userData ? JSON.parse(userData) : null,
    accessToken: localStorage.getItem('access_token') || null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user))
    },
    SET_ACCESS_TOKEN(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken)
    },logout(state) {
      state.user = null;
      state.accessToken = null;
    },
  },actions:  {
     login({ commit }, payload: { user: any, accessToken: string }) {
      commit('SET_USER', payload.user);
      commit('SET_ACCESS_TOKEN', payload.accessToken);
    },
    async logout({ commit }) {
      const res :any = await logout();
      console.log(res)
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      commit('logout');
    },
  },
  
});

export default store;
