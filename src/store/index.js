// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     favourite: [
//     ],
//     FavouriteId: []
//   },
//   mutations: {
//     AddToFavourite(state, payload) {
//     },
//     SetListFavourite(state,payload){
//       console.log(payload,'payload')
//       state.favourite=payload
//     }
//   },
//   getters: {
//     GetFavourite(state) {
//       return state.favourite;
//     },
//     GetFavouriteId(state) {
//       state.FavouriteId = [];
//       for (let i = 0; i < state.favourite.length; i++) {
//         state.FavouriteId.push(state.favourite[i].id);
//       }
//       return state.FavouriteId;
//     },
//   },
//   actions: {},
//   modules: {}
// });
