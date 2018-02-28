<template>
    <div class="container">
        <div>
            <SearchAutocomplete v-on:select="onSelect"/>
        </div>
        <div class="review">
            <router-link class="button" to="/review-appartment">Review your appartment!</router-link>
        </div>
        <Guide/>
    </div>
    
</template>

<script>
import api from "../api";
import SearchAutocomplete from "../components/SearchAutocomplete";
import Guide from "../components/Guide";

export default {
  components: { SearchAutocomplete, Guide },
  data() {
    return {
      results: []
    };
  },
  mounted(){
    var input = document.getElementById("places-input");
    var autocomplete = new google.maps.places.Autocomplete(input);
  },

  methods: {
      onSelect(place){
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
.review{
  padding: 20px 300px;
}
</style>

