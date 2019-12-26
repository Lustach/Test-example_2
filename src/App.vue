<template>
  <v-app>
    <div class="zaglushka" @click="drawer = !drawer" v-if="drawer">
      f
    </div>
    <v-app-bar app color="primary" dark absolute>
      <v-btn text @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-flex justify-center row>
        Тестовое задание №2
      </v-flex>
    </v-app-bar>
    <div>
      <v-navigation-drawer permanent v-if="drawer" absolute class="side-bar">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Application
            </v-list-item-title>
            <v-list-item-subtitle>
              subtext
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item v-for="(item,index) in items" :key="index" link>
            <!-- <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon> -->
            <!-- <v-list-item-content> -->
              <router-link to="/LookingPage"><v-list-item-title ><h1>{{item.title}}</h1></v-list-item-title></router-link>
              <!-- <router-link to="/LookingPage">
                <div class="padInSideBar"><p v-for="(page,index) in article" :key="index" class=" white--text" @click="infor(index)">{{page.header}}</p></div>
              </router-link> -->
            <!-- </v-list-item-content> -->
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    
    <v-content>
      <MainBanner />
    </v-content>
  </v-app>
</template>

<script>
import MainBanner from "./components/MainBanner";

export default {
  name: "App",

  components: {
    MainBanner
  },

  data: () => ({
    drawer: null,
    items: [
      { title: "Избранное", },
      { title: "Статьи",}
    ]
  })
};
</script>
<style lang="scss">
.zaglushka {
  position: absolute;
  z-index: 99;
  background-color: rgb(129, 129, 129);
  opacity: 0.5;
  height: 100%;
  width: 100%;
}
.side-bar {
  position:absolute;
  z-index: 100 !important;
}
</style>
