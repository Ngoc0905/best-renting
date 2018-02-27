<template>
  <div>
   <b-field>
      <b-input class="container" placeholder="Enter your location" type="text" @keyup.enter="search" v-model="query" icon="magnify"></b-input>
    </b-field>
    <div id="myMap"></div>
  </div>

</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      query: "",
      results: []
    };
  },
  mounted: function() {
    console.log("map: ", google.maps);
    this.map = new google.maps.Map(document.getElementById("myMap"), {
      center: { lat: 61.180059, lng: -149.822075 },
      scrollwheel: false,
      zoom: 4
    });
  },

  methods: {
    search() {
      api.search(this.query).then(results => {
        this.results = results;
      });
    }
  }
};
</script>

<style>
.container {
  width: 750px;
}
#myMap {
    height:300px;
    width: 100%;
   }
</style>