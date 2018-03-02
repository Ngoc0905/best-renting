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
 n 
<script>
import api from "../api";
import SearchAutocomplete from "../components/SearchAutocomplete";
import Guide from "../components/Guide";

export default {
  components: { SearchAutocomplete, Guide },
  props: ['place'],
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
        console.log('ON SELECT!!!!', place)
        this.$router.push({name: 'findrenting',
          params: {
              lat: place.lat,
              lng: place.lng
          }});       
      }
  }
};
</script>

<style scoped>
.container {
  width: 900px;
  /* background-color:rgba(255, 255, 255, .8); */
  /* opacity: 0.6; */
}
.review{
  padding: 20px 300px;
}
</style>

