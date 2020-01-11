<template>
  <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
      <p class="d-flex justify-center display-1">Избранные статьи</p>
      <v-card>
        <v-container fluid>
          <v-row v-if="GetFavourite != 0">
            <v-col
              v-for="(item, n) in GetFavourite"
              :key="n"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card flat tile class="d-flex">
                <v-img :src="item.src" aspect-ratio="1" class="grey lighten-2">
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
                </v-img>
                <!-- <v-img v-else
                src="../assets/logo.png">
                </v-img> -->
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
    <p @click="post">Hell</p>{{favourite.data}}
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  created() {
    let url = "http://localhost:3000/articles";
    this.$http.get(url).then(response => {
      this.info = response;
      // console.log(response.data.length,'res.length')
    });
    this.$http.get(`http://localhost:3000/favourite`).then(response => {
      this.favourite = response;
    });
    console.log(this.favourite, "favori");
    // for (let i = 0; i < this.info.length; i++) {
    //   if (Number.isInteger(JSON.parse(localStorage.getItem(i)))) {
    //     this.favourite.push(this.info.data[i]);
    //   }
    // }
  },
  data: () => ({
    info: [],
    favourite: [],
    newCat: null,
    obj: {
      item1: 1,
      item2: [123, "two", 3.0],
      item3: "hello"
    }
  }),
  computed: {
    ...mapGetters(["GetFavourite"])
  },
  methods: {
    post() {
      this.$http
        .post(`http://localhost:3000/favourite`, this.obj)
        .then(function(response) {
          console.log(response);
        });
    }
  }
};
</script>
