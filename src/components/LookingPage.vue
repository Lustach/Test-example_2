<template>
  <div>
    <div class="d-inline-flex">
      <v-col cols="3">
        <v-img min-width="200" max-width="500" max-height="400" :src="post.src">
        </v-img>
        {{ post.name }}
      </v-col>

      <v-col cols="5">
        <v-card>
          <v-card-text>
            {{ post.body }}{{ post.body }}{{ post.body }} {{ post.body
            }}{{ post.body }}{{ post.body }}{{ post.body }}
            <!-- {{post.body}}{{post.body}}{{post.body}} -->
          </v-card-text>
        </v-card>
      </v-col>
          <div>
    <v-container
      id="scroll-target"
      style="max-height: 850px"
      class="overflow-y-auto"
    >
    <div>
        <v-col v-for="n in 8" :key="n" >
            <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover ? 12 : 2">
            <v-card-text>
              <v-chip class="ma-2" color="primary" text-color="white">
                <v-avatar left>
                  <v-icon>mdi-account-circle</v-icon>
                </v-avatar>
                Ranee
              </v-chip>
              {{ post.comments }}
            </v-card-text>
          </v-card>
          </v-hover>
        </v-col>
      </div>
      <v-row
        v-scroll:#scroll-target="onScroll"
        align="center"
        justify="center"
      >
      </v-row>
    </v-container>
  </div>
    </div>

  </div>
</template>
<script>
export default {
  data: () => ({
    some: "hell",
    post: {
    }
  }),
  created() {
      this.$http
        .get(`http://localhost:3000/articles/${this.$route.params.id}`)
        .then(response => {
          this.post = response.data;

        });
  },
  methods: {
  }
};
</script>
