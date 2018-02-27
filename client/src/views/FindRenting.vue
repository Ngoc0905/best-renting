<template>
  <div>
    <SearchAutocomplete v-on:select="updateParamsAndReload"/>
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
    '$route' (to, from) {
        this.initGoogleMap();
    }
  },
  mounted: function() {
    this.initGoogleMap();
  },
  methods: {
    initGoogleMap() {
      var map = new google.maps.Map(document.getElementById("myMap"), {
        center: {
          lat: parseFloat(this.$route.params.lat),
          lng: parseFloat(this.$route.params.lng)
        },
        scrollwheel: false,
        zoom: 7
      });
    },
    updateParamsAndReload(place){
      this.$router.push({name: 'findrenting',
        params: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }});
    }
  }
};
</script>

<style>
.container {
  width: 750px;
}
#myMap {
  height: 300px;
  width: 100%;
}
</style>