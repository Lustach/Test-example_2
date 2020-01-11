<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <p class="d-flex justify-center display-1">Избранные статьи</p>

      <v-card>
        <v-container fluid>
          <v-row v-if="favourite.length != 0">
            <v-col
              v-for="(item, n) in info"
              :key="n"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card flat tile class="d-flex">
                <v-img :src="item.src" aspect-ratio="1" class="grey lighten-2" >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                  <v-card-title>
                    <router-link
                      :to="{ name: 'post', params: { id: item.id } }"
                      >{{ item.name }}</router-link
                    >
                    <v-divider style="opacity:0;"></v-divider>
                    <v-btn text @click="DeleteFavourite(item.id,n)">
                      <v-icon :color="item.favourite ? 'orange' : 'black'">
                        mdi-star
                      </v-icon><!--(i.favourite = !i.favourite), -->
                    </v-btn>
                  </v-card-title>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col class="d-flex justify-center align-center"
              >Пока что, здесь ничего нет....</v-col
            >
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <p @click="post">Hell</p>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  created() {
    let url = "http://localhost:3000/";
    this.$http.get(url + "favourite").then(response => {
      this.favourite = response.data;
      for (let i = 0; i < this.favourite.length; i++) {
        this.$http
          .get(url + "articles" + `/${this.favourite[i].id}`)
          .then(response => {
            this.info.push(response.data);
            this.info[this.info.length-1].favourite=true
            console.log(this.info,'this.info')
            console.log(response.data, "response.data");
          });
      }
    });
    // for (let i = 0; i < this.info.length; i++) {
    //   if (Number.isInteger(JSON.parse(localStorage.getItem(i)))) {
    //     this.favourite.push(this.info.data[i]);
    //   }
    // }
  },
  data: () => ({
    info: [],
    favourite: []
  }),
  computed: {
    ...mapGetters(["GetFavourite"])
  },
  methods: {
    DeleteFavourite(index,n){
        this.$http.delete(`http://localhost:3000/favourite/${index}`);
        this.info.splice(n, 1);
    },
    post() {
      // .post(`http://localhost:3000/favourite`, this.obj)
      // .then(function(response) {
      //   console.log(response);
      // })
      // .catch(function(error){
      // })
    }
  }
};
</script>
