<template>
  <div>
    <Loader v-if="loading" /><!--Вроде с таймаутом работает-->
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
                >
                <!-- {{ i.id }}
                {{ i.favourite }} -->
                <v-icon :color="i.favourite ? 'orange ' : 'black'"
                  >mdi-star</v-icon
                >
              </v-btn></v-card-text
            >
          </v-card>
        </v-hover>
      </v-col>
    </v-flex>

    <v-flex row justify-center>
      <el-pagination
        @prev-click="payload.page--"
        @next-click="payload.page++"
        background
        layout="prev, pager, next"
        :page-size="this.payload.limit"
        :total="100"
        :current-page.sync="payload.page"
        @current-change="ChangePage()"
      >
      </el-pagination>
    </v-flex>
  </div>
</template>
<script>
import Loader from "../components/Loader.vue";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
  mounted() {
    console.log("Mounted");
    let url = "http://localhost:3000/";
    this.$http
      .get(
        url +
          `articles` +
          `?_page=${this.payload.page}&_limit=${this.payload.limit}`
      )
      .then(response => {
        this.info = response.data;
        console.log(this.info, "info");
        this.$http.get(url + `favourite`).then(response => {
          this.favourite = response.data;
          console.log(this.favourite, "favourite");
          for (let i = 0; i < this.info.length; i++) {
            for (let j = 0; j < this.favourite.length; j++) {
              if (this.info[i].id == this.favourite[j].id) {
                this.info[i].favourite = true;
              }
            }
          }
        });
      })
      .catch(error => {})
      .finally((this.loading = false));
  },
  beforeUpdate() {
    //при добавлении избранной и переключении страницы не происходит обновления страницы, несмотря на обновление содержимого, в этом помогает данный хук
    let url = "http://localhost:3000/";
    this.$http.get(url + `favourite`).then(response => {
      this.favourite = response.data;
      console.log(this.favourite, "favourite");
      for (let i = 0; i < this.info.length; i++) {
        for (let j = 0; j < this.favourite.length; j++) {
          if (this.info[i].id == this.favourite[j].id) {
            this.info[i].favourite = true;
          }
        }
      }
    });
    console.log("Knigga");
  },
  created() {},
  data: () => ({
    favourite: [], //массив для избранного
    info: [], //массив для всех статей на странице
    loading: true, // через таймаут вроде пашет
    payload: {
      //для отправки запроса /?_page=NUMBER&_limit=NUMBER2
      page: 1,
      limit: 20
    }
  }),
  methods: {
    AddToFavourite(index) {
      //index- объект со всеми полями (статья)
      console.log(index.favourite, "This Favor");
      if (index.favourite == false) {
        console.log(index.favourite, "indexFavo");
        console.log(index.id, "index.id");
        this.$http
          .post(`http://localhost:3000/favourite`, { id: index.id })
          .then(response => {
            console.log(response, "AAAAAAAAAAAAAAAA");
            this.info[(index.id - 1) % 20].favourite = true; //при рандомном айди делал бы линейный поиск
          })
          .catch();
      } else {
        this.info[index.id - 1].favourite = false;
        this.$http.delete(`http://localhost:3000/favourite/${index.id}`);
        this.favourite.splice(index - 1, 1);
      }
    },
    ChangePage() {
      //метод связан с пагинацией перезапрашивает данные для страницы
      this.$http
        .get(
          `http://localhost:3000/articles/?_page=${this.payload.page}&_limit=${this.payload.limit}`
        )
        .then(response => {
          this.info = response.data;
          for (let i = 0; i < this.info.length; i++) {
            //поиск "избранной" статьи
            for (let j = 0; j < this.favourite.length; j++) {
              if (this.info[i].id == this.favourite[j].id) {
                this.info[i].favourite = true;
              }
            }
          }
        });
        this.$router.push(`/articles/${this.payload.page}`)//создание маршрута
        // { name: 'post', params: { id: index } }
    },
  },
  computed: {},
  components: {
    Loader
  }
};
</script>
