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
      <v-col v-for="(i, index) in info.data" v-bind:key="i.src">
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
                  <router-link :to="{name:'post',params:{id:index}}"><span style="font-size:24px;">Подробнее</span></router-link>
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="d-flex justify-space-between align-center pr-0">
              <router-link :to="{name:'post',params:{id:index}}">{{ i.name }}</router-link>
              <v-btn
                text
                :v-model="index"
                @click="(i.favourite = !i.favourite), AddToFavourite(i)"
              >
                <v-icon :color="i.favourite ? 'orange ' : 'black'"
                  >mdi-star</v-icon
                >
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
import axios from "axios";
import Loader from "../components/Loader.vue";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
  mounted() {
    let url = "http://localhost:3000/articles";
    // .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    axios
      .get(url)
      .then(response => {
        setTimeout(() => {
          this.info = response;
          console.log(response, "response");
          for (let i = 0; i < this.info.data.length; i++) {
            if (Number.isInteger(JSON.parse(localStorage.getItem(i)))) {
              this.info.data[i].favourite = true;
              this.favourite.push(this.info.data[i]);
            }
          }
          this.SetListFavourite();
        });
      }, 1000)
      .catch(error => {})
      .finally((this.loading = false));
    // console.log(this.getPagination(),'th')
    // this.getPagination();
  },
  data: () => ({
    perPage: 3,
    currentPage: 1,
    favourite: [],
    info: "",
    loading: "true",
    page: 0,
    totalPhotos: "",
    arr: [],
    JsonParseOnce: false,
    getBanner: null,
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
    ],
    payload: {
      page: 2,
      limit: 3
    }
  }),
  methods: {
    ...mapMutations(["AddToFavourite", "SetListFavourite"]),
    AddToFavourite(index) {
      if (localStorage.getItem(index.id) == null) {
        this.arr.push(index.id);
        localStorage.setItem(`${index.id}`, index.id);
        this.favourite.push(index);
      } else {
        this.favourite.splice(index, 1);
        this.getBanner = true;
        localStorage.removeItem(index.id);
      }
    },
    SetListFavourite() {
      this.$store.commit("SetListFavourite", this.favourite);
    },
    getPagination() {
      let url = `http://localhost:3000/articles?_page=${this.payload.page}&_limit=${this.payload.limit}`;
      // let response =this.$api.getPage(this.payload)
      axios
        .get(url)
        .then(response => {
          this.info = response;
          for (let i = 0; i < this.info.data.length; i++) {
            if (Number.isInteger(JSON.parse(localStorage.getItem(i)))) {
              this.info.data[i].favourite = true;
              this.favourite.push(this.info.data[i]);
            }
          }
          this.SetListFavourite();
          console.log(info, "info");
        })
        .catch(error => {
          console.log(error);
        })
        .finally((this.loading = false));
      this.info = response;
    },
    nextPage() {
      this.payload.page += 1;
      this.getPagination();
      console.log(this.payload.page, "page");
    },
    prevPage() {
      this.payload.page -= 1;
      this.getPagination();
    },
    GotoCard() {
      console.log(navigator.userAgent,"agent")
    }
  },
  computed: {
    ...mapGetters(["GetFavouriteId"]),
    rows() {
      console.log(this.info,"THISINFOBRO");
      return Math.ceil(this.info.length/this.perPage)
    }
  },
  components: {
    Loader
  }
};
</script>
