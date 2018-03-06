<template>
    <section class="container">
        <h1>Your history</h1>
        <nav class="panel">
            <p class="panel-heading">
                Appartment reviewed by me
            </p>
            <div class="panel-block">
                <ul>
                    <li v-for="r in reviews" v-bind:key="r._id">
                        <Review v-bind:detail="r" v-on:remove="receiveRemoveId" />
                    </li>
                </ul>
            </div>
        </nav>
        <nav class="panel">
            <p class="panel-heading">
                Your ad renting to find a new tenant
            </p>
            <div class="panel-block">
                <ul>
                    <li v-for="r in findingPosts" v-bind:key="r._id">
                        <Finding v-bind:detail="r"  v-on:remove="receiveRemoveId"/>
                    </li>
                </ul>
            </div>
        </nav>
        <nav class="panel">
            <p class="panel-heading">
                Your ad finding to find a new rental
            </p>
            <div class="panel-block">
                <ul>
                    <li v-for="r in rentingPosts" v-bind:key="r._id">
                        <Renting v-bind:detail="r"  v-on:remove="receiveRemoveId"/>
                    </li>
                </ul>
            </div>
        </nav>
    </section>
</template>

<script>
import api from "../api";
import Review from "../components/Review";
import Renting from "../components/Renting";
import Finding from "../components/Finding";
export default {
  components: {
    Review,
    Renting,
    Finding
  },
  data() {
    return {
      reviews: null,
      rentingPosts: null,
      findingPosts: null
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    receiveRemoveId(id, url) {
        console.log(url);
      api.remove(id, url).then(responseFromServer => {
        let obj = [];
        switch (url) {
          case "/adrentings/":
          obj = this.rentingPosts;
            break;
          case "/reviews/":
          obj = this.reviews;
            break;
          default:
          obj = this.findingPosts;
            break;
        }
        for (let i = 0; i < obj.length; i++) {
          if (obj[i]._id === id) {
            obj.splice(i, 1);
            break;
          }
        }
      });
    },
    getPosts() {
      api.getReviewsByUserId(this.$root.user.id).then(responseFromServer => {
        this.reviews = responseFromServer.data;
      });
      api
        .getRentingPostsByUserId(this.$root.user.id)
        .then(responseFromServer => {
          this.rentingPosts = responseFromServer.data;
        });
      api
        .getFindingPostsByUserId(this.$root.user.id)
        .then(responseFromServer => {
          this.findingPosts = responseFromServer.data.map(d => {
              d.daterent = new Date(d.daterent);
              return d;
          });
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 900px;
}
.panel-block ul li {
  margin: 10px 0;
}
ul {
  width: 100%;
}
h1 {
  color: #fff;
  font-size: 28px;
  font-family: "Open Sans", Arial, sans-serif;
  padding-bottom: 10px;
}
p {
  font-weight: bold;
}
</style>
