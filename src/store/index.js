import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favourite:[
      {
        id:'0',
        name:'Статья№0',
        src:'https://picsum.photos/id/0/200/300',
      },
    ],
    FavouriteId:[],
  },
  mutations: {
    AddToFavourite(state,payload){
      console.log(payload.id,'payload')
      console.log(state.favourite,"afterp")
        for (let i = 0; i < state.favourite.length; i++) {
          if(payload.id==state.favourite[i].id)
            {state.favourite.splice(i,1)
              console.log(state.favourite,'chlen')
              return
            }
        }
        state.favourite.push
        (
          {
            id:payload.id,
            name:payload.name,
            src:payload.src,
          }
        )
    }
  },
  getters:{
    GetFavourite(state){
      console.log(state.favourite,'getter')
      return state.favourite
    },
    GetFavouriteId(state){
      state.FavouriteId=[]
      for (let i = 0; i < state.favourite.length; i++) {
        state.FavouriteId.push(state.favourite[i].id);
      }
      // console.log(state.favourite[0].id,'hello')
      console.log(state.FavouriteId,'favor')
      return state.FavouriteId
    }
  },
  actions: {
  },
  modules: {
  }
})
