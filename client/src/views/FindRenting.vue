<template>
  <div class="main">
    <SearchAutocomplete v-on:select="updateParamsAndReload"/>
    <div>
      <div id="reviews">
        <!-- <ul>
          <li v-for="r in results" v-bind:key="r._id">
            <span>District: {{ r.ratingDistrict }}</span>
            <span>Building: {{ r.ratingBuilding }}</span>
            <span>Landlord: {{ r.ratingLandlord }}</span>
          </li>
        </ul> -->
        <nav class="panel">
          <p class="panel-heading">
            Result
          </p>
          <div class="panel-block" v-for="r in results" v-bind:key="r._id">
            <span class="panel-icon">
              <i class="fas fa-book"></i>
            </span>
            <span>District: {{ r.ratingDistrict }}</span>
            <span>Building: {{ r.ratingBuilding }}</span>
            <span>Landlord: {{ r.ratingLandlord }}</span>
          </div>
        </nav>
      </div>
      <div id="myMap"></div>
    </div>
  </div>

</template>

<script>
import api from "../api";
import SearchAutocomplete from "../components/SearchAutocomplete";
export default {
  components: { SearchAutocomplete },
  data() {
    return {
      results: []
    };
  },
  watch: {
    $route(to, from) {
      this.initGoogleMap();
    }
  },
  mounted: function() {
    this.initGoogleMap();
  },
  methods: {
    initGoogleMap() {
      var lat = !this.$route.params.lat
        ? 48.85661400000001
        : this.$route.params.lat;
      var lng = this.$route.params.lng || 2.3522219000000177;

      var map = new google.maps.Map(document.getElementById("myMap"), {
        center: {
          lat: lat,
          lng: lng
        },
        scrollwheel: false,
        zoom: 7
      });
    },
    updateParamsAndReload(place) {
      api.getReviews(place).then(responseFromServer => {
        console.log(responseFromServer);
        this.results = responseFromServer.data;
      });
      // this.$router.push({
      //   name: "findrenting",
      //   params: {
      //     lat: place.geometry.location.lat(),
      //     lng: place.geometry.location.lng()
      //   }
      // });
    }
  }
};
</script>

<style>
.main {
  overflow: auto;
}
#reviews {
  height: 300px;
  float: left;
  width: 49%;
}
#myMap {
  height: 300px;
  float: right;
  width: 49%;
}
</style>