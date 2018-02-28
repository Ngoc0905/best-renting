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
      console.log(place);
      let obj = {};

      var street_number = place.address_components.find(
        f => f.types.indexOf("street_number") !== -1
      );
      if (street_number) obj.street_number = street_number.long_name;

      var route = place.address_components.find(
        f => f.types.indexOf("route") !== -1
      );
      if (route) obj.route = route.long_name;

      var locality = place.address_components.find(
        f => f.types.indexOf("locality") !== -1
      );
      if (locality) obj.city = locality.long_name;

      var administrative_area_level_1 = place.address_components.find(
        f => f.types.indexOf("administrative_area_level_1") !== -1
      );
      if (administrative_area_level_1)
        obj.region = administrative_area_level_1.long_name;

      var country = place.address_components.find(
        f => f.types.indexOf("country") !== -1
      );
      if (country) obj.country = country.long_name;

      var postal_code = place.address_components.find(
        f => f.types.indexOf("postal_code") !== -1
      );
      if (postal_code) obj.postal = postal_code.long_name;

      api.getReviews(obj).then(responseFromServer => {
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