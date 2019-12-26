<template>
  <div>
    <!-- <v-flex row justify-center>
      <v-col cols="3">
        <v-img src='https://picsum.photos/id/1/200/300' height="200"></v-img>
      </v-col>
      <v-col cols="3">
        <v-img src='https://picsum.photos/id/2/200/300' height="200"></v-img>
      </v-col>
      <v-col cols="3">
        <v-img src='https://picsum.photos/id/237/200/300' height="200"></v-img>
      </v-col>
    </v-flex> -->
    <Loader v-if="loading"/>
    <v-flex v-else row justify-center >

      <v-col v-for="i in info.data"  v-bind:key="i.src">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 24 : 2">
            <v-img lazy-src="https://picsum.photos/id/237/200/300" :src="i" :aspect-ratio="16/9" min-height="112.5" min-width="200">
            <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out grey darken-1 v-card--reveal display-1 white--text"
            style="height: 100%;background-color:orange !important; opacity:0.7;"
            opacity="0,6"
          >
            <span style="text-align:center !important;">Открыть</span>
          </div>
        </v-expand-transition>
            </v-img>
            <router-link to="LookingPage"><v-card-text>{{i.name}}</v-card-text></router-link>
          </v-card>
        </v-hover>
      </v-col>
      </v-flex>
     <div class="text-center">
    <v-pagination
      v-model="page"
      :length="this.info.data.length"
      total-visible="10"
      circle
    ></v-pagination>
  </div>
    <v-flex row justify-center>
      <p>{{ info.data }}</p>
    </v-flex>
  </div>
</template>
<script>
import axios from 'axios';
import Loader from '../components/Loader.vue'
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
    mounted() {
    let url="http://localhost:3000/users"
      // .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      axios.get(url)
      .then(response => {setTimeout(() => {this.info = response})},1000)
      .catch(error=>{
       console.log(this.info.data.src)
      })
      .finally(this.loading=false)
  },
  data: () => ({
    info:'',
    loading:'true',
    page:'',
    per_page:12,
    totalPhotos:'',
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
      }
    ]
  }),
  methods:{
    ...mapMutations(["ShowPage"]),

    // showPage(arg){
    //   this.$store.commit("ShowPage",arg)
    // },
    //   infor(or) {
    //     this.$store.commit("Info", or);
    // }
  },
  components:{
    Loader,
  }
};
</script>
