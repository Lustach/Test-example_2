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
              lazy-src="../assets/logo.png"
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
              <v-btn text @click="AddToFavourite(i)"
                >{{ i.id }}
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

    <v-flex row justify-center>
      <!-- <p>{{ info.data }}</p> -->
      <el-pagination
        @prev-click="payload.page -= 1"
        @next-click="payload.page += 1"
        background
        layout="prev, pager, next"
        :page-size="this.payload.limit"
        :total="100"
        :current-page.sync="payload.page"
        @current-change="ChangePage()"
      >
        <!-- :prev-click="PrevClick"
        :next-click="NextClick" -->
      </el-pagination>
    </v-flex>

    <!-- <div class="block">
      <span class="demonstration">All combined</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div> -->
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
      .get(
        url +
          `articles` +
          `?_page=${this.payload.page}&_limit=${this.payload.limit}`
      )
      .then(response => {
        this.info = response.data;
        console.log(this.info, "FAVOURITE1");
        this.$http.get(url + `favourite`).then(async response => {
          this.favourite = await response.data;
          console.log(response.data, "FAVOURITE!!!!!!!!!!!");
          // let j = 0;
          for (let i = 0; i < this.info.length; i++) {
            for (let j = 0; j < this.favourite.length; j++) {
              if (this.info[i].id == this.favourite[j].id) {
                this.info[i].favourite = true;
              }
            }
            // if (j < this.favourite.length) {
            // console.log(this.info[i].id,'this.info[i].id');
            // console.log(this.favourite[j].id,'this.favourite[i].id');
            // if (this.info[i].id == this.favourite[j].id) {
            //   this.info[i].favourite = true;
            //   j--;
            // }
            // j++;
            // }
            // else{
            //   break
            // }
          }
          // for (let i = 0; i < this.favourite.length; i++) {
          //   console.log(this.favourite.length);
          //   // console.log(
          //   //   this.info[this.favourite[i].id].favourite,
          //   //   "this.info[this.favourite[i].id].favourite"
          //   // );
          //   // console.log(this.favourite[i].id,this.favourite[i].id);
          //   // console.log(this.info[this.favourite[i].id - 1].favourite);
          //   console.log(this.favourite, "wtf");
          //   this.info[this.favourite[i].id - 1].favourite = true;
          //   console.log(this.info[this.favourite[i].id - 1].favourite);
          // }
        });
      })
      .catch(error => {})
      .finally((this.loading = false));
  },
  created() {},
  data: () => ({
    perPage: 3,
    currentPage: 1,
    favourite: [],
    info: [],
    info_length: 100,
    loading: "true",
    totalPhotos: "",
    arr: [],
    JsonParseOnce: false,
    getBanner: null,
    payload: {
      page: 1,
      limit: 20
    }
  }),
  methods: {
    ...mapMutations(["AddToFavourite", "SetListFavourite"]),
    AddToFavourite(index) {
      //index- объект со всеми полями
      console.log(index.favourite, "This Favor");
      if (index.favourite == false) {
        console.log(index.favourite, "indexFavo");
        console.log(index.id, "index.id");
        this.$http
          .post(`http://localhost:3000/favourite`, { id: index.id })
          .then(response => {
            console.log(response, "AAAAAAAAAAAAAAAA");
            this.info[(index.id - 1) % 20].favourite = true;
          })
          .catch(console.log("JOPA"));
        // this.info[index.id].favourite = true;
        console.log(this.favourite, "This Favor1");
      } else {
        console.log(index.id, "INDEX____ID");
        console.log(this.info, "afterIndex");
        this.info[index.id - 1].favourite = false;
        this.$http.delete(`http://localhost:3000/favourite/${index.id}`);
        this.favourite.splice(index - 1, 1);
        console.log(this.favourite, "This Favor2");
      }
    },
    ChangePage() {
      console.log(this.payload.page, this.payload.limit);
      this.$http
        .get(
          `http://localhost:3000/articles/?_page=${this.payload.page}&_limit=${this.payload.limit}`
        )
        .then(response => {
          this.info = response.data;
          for (let i = 0; i < this.info.length; i++) {
            for (let j = 0; j < this.favourite.length; j++) {
              if (this.info[i].id == this.favourite[j].id) {
                this.info[i].favourite = true;
              }
            }
          }
          console.log(this.favourite, "W");
        });
    },
    SetListFavourite() {
      this.$store.commit("SetListFavourite", this.favourite);
    }
  },
  computed: {
    // ...mapGetters([]),
    rows() {
      console.log(this.info, "THISINFOBRO");
      return Math.ceil(this.info.length / this.perPage);
    },
    Total() {
      console.log(this.info.length / this.payload.limit);
      return this.info.length / this.payload.limit;
    }
  },
  components: {
    Loader
  }
};
</script>
