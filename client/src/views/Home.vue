<template>
  <div>
   <b-field>
            <b-input id="places-input" class="container" placeholder="Enter your location" type="text" @keyup.enter="search" v-model="query" icon="magnify"></b-input>
        </b-field>
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
  mounted(){
    var input = document.getElementById("places-input");
    var autocomplete = new google.maps.places.Autocomplete(input);
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
</style>

