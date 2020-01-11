import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favourite: [
      // {
      // id:'0',
      // name:'Статья№0',
      // src:'https://picsum.photos/id/0/200/300',
      // favourite:true,
      // },
    ],
    FavouriteId: []
  },
  mutations: {
    AddToFavourite(state, payload) {
      // for (let i = 0; i < state.favourite.length; i++) {
      //   if(payload.id==state.favourite[i].id)
      //     {state.favourite.splice(i,1)
      //       return
      //     }
      // }
      // state.favourite.push
      // (
      //   {
      //     id:payload.id,
      //     name:payload.name,
      //     src:payload.src,
      //     favourite:true,
      //   }
      // )
      let info=JSON.parse(localStorage.getItem(i))
      // state.favourite = [];
      // for (let i = 0; i < localStorage.length; i++) {
      //   if (Number.isInteger(JSON.parse(localStorage.getItem(i)))) {
      //       state.favourite.push({
      //       id: info,
      //       name: payload.name,
      //       src: payload.src,
      //       favourite: true
      //     });
      //   } // state.favourite.push(JSON.parse(localStorage.getItem(i)))
      // }
    },
    SetListFavourite(state,payload){
      console.log(payload,'payload')
      state.favourite=payload
    }
  },
  getters: {
    GetFavourite(state) {
      return state.favourite;
    },
    GetFavouriteId(state) {
      state.FavouriteId = [];
      for (let i = 0; i < state.favourite.length; i++) {
        state.FavouriteId.push(state.favourite[i].id);
      }
      return state.FavouriteId;
    },
  },
  actions: {},
  modules: {}
});
