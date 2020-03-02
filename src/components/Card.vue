<template>
  <div>
    <section class="grid">
      <div class="grid__item card" :v-for="photo in photos">
        <div class="card__body">
          <img :src="photo.urls.small" alt="" />
        </div>
        <div class="card__footer media">
          <div class="media__body">
            <a :href="photo.user.portfolio_url" target="_blank">{{
              photo.user.name
            }}</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data: {
    photos: "",
    totalPhotos: 0,
    perPage: 9,
    currentPage: 1
  },
  methods: {
    fetchPhotos: function(page) {
      this.$http
        .get("http://localhost:3000/articles")
        .then(function(response) {
          console.log(response,'resonse.data!')
          this.photos = response.data;
          this.totalPhotos = parseInt(response.headers.get("x-total"));
        }, console.log);
    }
  },
  created() {
    this.fetchPhotos(this.currentPage);
  }
};
</script>
<style scoped>
/* Галерея */
.grid {
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 auto;
}

.grid__item {
  width: 30%;
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0 20px 40px;
}

/* Фотокарточки */
.card {
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  line-height: 0;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.card__body {
  width: 100%;
  height: 215px;
  overflow: hidden;
  background-color: #eee;
}

.card__body img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__footer {
  width: 100%;
  padding: 10px 15px;
}

.media__obj {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #d8d8d8;
  margin-right: 15px;
  float: left;
}

.media__body {
  width: 100%;
  height: 32px;
  line-height: 32px;
}

.media__body a {
  font-family: Courier, serif;
  font-size: 15px;
  color: #999;
}

.media__body a:hover {
  text-decoration: none;
}
</style>
