<template>
  <div class="container">
    <div id="left">
    <SearchAutocomplete v-bind:lat="$route.params.lat" v-bind:lng="$route.params.lng" v-on:select="updateParamsAndReload"/>
      <div id="reviews">
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
    </div>
    <div id="myMap"></div>   
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
      var map = new google.maps.Map(document.getElementById("myMap"), {
        center: {
          lat: place.lat,
          lng: place.lng
        },
        scrollwheel: false,
        zoom: 7
      });
      // this.$router.push({
      //   name: "findrenting",
      //   params: {
      //     lat: place.geometry.location.lat(),
      //     lng: place.geometry.location.lng()
      //   }
      // });

      });
    }
  }
};
</script>

<style scoped>

.container {
  overflow: auto;
  width: 900;
}
#left {
  height: 300px;
  float: left;
  width: 49%;
}
#reviews{
padding-top: 20px;
}
#myMap {
  height: 300px;
  float: right;
  width: 500px;
}
</style>