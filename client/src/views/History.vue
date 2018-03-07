<template>
    <section class="container">
        <h1>Your history</h1>
        <b-tabs type="is-toggle" v-bind:animated="false">
            <b-tab-item label="Appartment reviewed by me">
                <ul v-if="reviews && reviews.length">
                    <li v-for="r in reviews" v-bind:key="r._id">
                        <Review v-bind:detail="r" v-on:remove="receiveRemoveId" />
                    </li>
                </ul>
                <p v-else class="nothing-txt">
                  <span>You don't have any review</span>
                </p>
            </b-tab-item>
            <b-tab-item label="Your ad renting to find a new tenant">
                <ul v-if="rentingPosts && rentingPosts.length">
                    <li v-for="r in rentingPosts" v-bind:key="r._id">
                        <Renting v-bind:detail="r"  v-on:remove="receiveRemoveId"/>
                    </li>
                </ul>
                <p v-else class="nothing-txt">
                  <span>You don't have any ad renting</span>
                </p>
            </b-tab-item>
            <b-tab-item label="Your ad finding to find a new rental">
                <ul v-if="findingPosts && findingPosts.length">
                    <li v-for="r in findingPosts" v-bind:key="r._id">
                        <Finding v-bind:detail="r"  v-on:remove="receiveRemoveId"/>
                    </li>
                </ul>
                <p v-else class="nothing-txt">
                  <span>You don't have any ad finding</span>
                </p>
            </b-tab-item>
        </b-tabs>
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
  margin-bottom: 20px;
}
@media (max-width: 768px) {
  .container {
    width: 100%;
  }
}
.panel-block ul li {
  margin: 10px 0;
}
ul {
  width: 100%;
}
ul li {
  margin-bottom: 10px;
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

.nothing-txt span {
  color: #fff;
}
</style>
<style>
  .b-tabs .tabs ul li a {
    color: #fff;
  }

  .b-tabs .tabs ul li a:hover{
    color: #4a4a4a;
  }
</style>
