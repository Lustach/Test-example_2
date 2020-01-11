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
    <Loader v-if="loading" />
    <v-flex v-else row justify-center>
      <v-col v-for="(i, index) in info" v-bind:key="i.src">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 24 : 2">
            <v-img
              lazy-src="https://picsum.photos/id/237/200/300"
              :src="i"
              :aspect-ratio="16 / 9"
              min-height="112.5"
              min-width="200"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out grey darken-1 v-card--reveal display-1 white--text"
                  style="height: 100%;background-color:orange !important; opacity:0.7; justify-content: center; align-items: center;"
                  opacity="0,6"
                >
                  <router-link :to="{ name: 'post', params: { id: index } }"
                    ><span style="font-size:24px;">Подробнее</span></router-link
                  >
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="d-flex justify-space-between align-center pr-0">
              <router-link :to="{ name: 'post', params: { id: index } }">{{
                i.name
              }}</router-link>
              <v-btn text :v-model="index" @click="AddToFavourite(i)">
                {{ i.favourite }}
                <v-icon :color="i.favourite ? 'orange ' : 'black'"
                  >mdi-star</v-icon
                ><!--(i.favourite = !i.favourite), -->
              </v-btn></v-card-text
            >
          </v-card>
        </v-hover>
      </v-col>
    </v-flex>
    <div class="text-center">
      <!-- <v-pagination
        :v-model="this.payload.page"
        :length="this.info.data.length"
        :total-visible="this.payload.limit"
        :value="this.payload.page"
        circle
        :next="nextPage"
        :previous="prevPage"
      ></v-pagination> -->
      <!-- <div class="card text-center m-3">
        <h3 class="card-header">Vue.js Pagination Tutorial & Example</h3>
        <div class="card-body">
            <div v-for="item in pageOfItems" :key="item.id">{{item.name}}</div>
        </div>
        <div class="card-footer pb-0 pt-3">
            <jw-pagination :items="exampleItems" @changePage="onChangePage"></jw-pagination>
        </div>
    </div> -->
    </div>
    <v-flex row justify-center>
      <!-- <p>{{ info.data }}</p> -->
      {{ favourite }}
    </v-flex>
    <p @click="GotoCard">Card</p>
  </div>
</template>
<script>
import Loader from "../components/Loader.vue";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
  mounted() {
    let url = "http://localhost:3000/";
    // .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    this.$http
      .get(url + `articles`)
      .then(response => {
        this.info = response.data;
        console.log(this.info, "FAVOURITE1");
      })
      .catch(error => {})
      .finally((this.loading = false));

    this.$http.get(url + `favourite`).then(response => {
      this.favourite = response.data;
      console.log(this.favourite, "FAVOURITE!");
      for (let i = 0; i < this.favourite.length; i++) {
        this.info[this.favourite[i].id].favourite=true
      }
    });

    // .get(url)
    // .then(response => {
    //   setTimeout(() => {
    //     this.info = response;
    //     console.log(response, "response");
    //     for (let i = 0; i < this.info.data.length; i++) {
    //       if (Number.isInteger(JSON.parse(localStorage.getItem(i)))) {
    //         this.info.data[i].favourite = true;
    //         this.favourite.push(this.info.data[i]);
    //       }
    //     }
    //     this.SetListFavourite();
    //   });
    // }, 1000)
    // .catch(error => {})
    // .finally((this.loading = false));
    // console.log(this.getPagination(),'th')
    // this.getPagination();
  },
  created() {},
  data: () => ({
    perPage: 3,
    currentPage: 1,
    favourite: [],
    info: [],
    loading: "true",
    page: 0,
    totalPhotos: "",
    arr: [],
    JsonParseOnce: false,
    getBanner: null,
    payload: {
      page: 2,
      limit: 3
    }
  }),
  methods: {
    ...mapMutations(["AddToFavourite", "SetListFavourite"]),
    AddToFavourite(index) {
      //index- объект со всеми полями
      console.log(index.favourite, "This Favor");
      if (index.favourite == false) {
        console.log(index.favourite, "indexFavo");
        this.$http.post(`http://localhost:3000/favourite`, { id: index.id });
        this.info[index.id].favourite = true;
        console.log(this.favourite, "This Favor1");
      } else {
        this.info[index.id].favourite=false
        this.$http.delete(`http://localhost:3000/favourite/${index.id}`);
        this.favourite.splice(index, 1);
        console.log(this.favourite, "This Favor2");
      }
      // if (localStorage.getItem(index.id) == null) {
      //   this.arr.push(index.id);
      //   localStorage.setItem(`${index.id}`, index.id);
      //   this.favourite.push(index);
      // } else {
      //   this.favourite.splice(index, 1);
      //   this.getBanner = true;
      //   localStorage.removeItem(index.id);
      // }
    },
    SetListFavourite() {
      this.$store.commit("SetListFavourite", this.favourite);
    },
    GotoCard() {
      console.log(navigator.userAgent, "agent");
    }
  },
  computed: {
    ...mapGetters(["GetFavouriteId"]),
    rows() {
      console.log(this.info, "THISINFOBRO");
      return Math.ceil(this.info.length / this.perPage);
    }
  },
  components: {
    Loader
  }
};
</script>
