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
            <v-col class="d-flex justify-center align-center" @click="addCat"
              >Пока что, здесь ничего нет....</v-col
            >
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    mounted() {
        
        if (localStorage.getItem('cats')){
            try {
                this.GetFavourite = JSON.parse(localStorage.getItem('cats'));
            } catch(e) {
                localStorage.removeItem('cats');
            }
        }
    },
    data:() =>({
        cats:[],
        newCat: null,
        obj:{
        item1: 1,
        item2: [123, "two", 3.0],
        item3:"hello"
        },
    }),
    computed:{
        ...mapGetters(["GetFavourite"])
    },
 methods: {
     addCat(){
        let serialObj = JSON.stringify(this.obj);
        localStorage.setItem("myKey", serialObj);
     },
    removeCat(x) {
      this.cats.splice(x, 1);
      this.saveCats();
    },
    saveCats() {
      const parsed = JSON.stringify(this.cats);
      localStorage.setItem('cats', parsed);
    }
  }
}
</script>
