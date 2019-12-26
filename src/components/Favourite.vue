<template>
    <v-row>
    <v-col cols="12" sm="6" offset-sm="3">
    <p class="d-flex justify-center display-1">Избранные статьи</p>
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="(item,n) in GetFavourite"
              :key="n"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card flat tile class="d-flex" >
                <v-img
                  :src="item.src"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>

                {{GetFavourite}}
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data:() =>({
        
    }),
    computed:{
        ...mapGetters(["GetFavourite"])
    },
    methods:{

    }
}
</script>