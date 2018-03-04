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
      var place = getQueryStringInformations(this.$route.query);
      if (place) {
        this.updateParamsAndReload(place);
      } else {
        new google.maps.Map(document.getElementById("myMap"), {
          center: {
            lat: 48.85661400000001,
            lng: 2.3522219000000177
          },
          scrollwheel: false,
          zoom: 7
        });
      }
    },
    updateParamsAndReload(place) {
      api.getReviews(place).then(responseFromServer => {
        console.log(responseFromServer);
        this.results = responseFromServer.data;
        let map = new google.maps.Map(document.getElementById("myMap"), {
          center: {
            lat: place.lat,
            lng: place.lng
          },
          scrollwheel: false,
          zoom: 11
        });

        this.results.forEach(r => {
          console.log(r);
          new google.maps.Marker({
            position: {
              lat: r.address.lat,
              lng: r.address.lng
            },
            map: map,
            title: `${r.address.street_number} ${r.address.route}, ${r.address.city}`
          });
        });
      });
    }
  }
};

function getQueryStringInformations(query) {
  if (!query || !query.lat || !query.lng) return false;
  return {
    lat: parseFloat(query.lat),
    lng: parseFloat(query.lng),
    street_number: query.street_number,
    route: query.route,
    city: query.city,
    region: query.region,
    country: query.country
  };
}
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
#reviews {
  padding-top: 20px;
}
#myMap {
  height: 300px;
  float: right;
  width: 500px;
}
</style>