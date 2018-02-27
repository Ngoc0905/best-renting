<template>
    <div>
        <div>
            <SearchAutocomplete v-on:select="onSelect"/>
        </div>
        <div>
            <router-link class="button" to="/review-appartment">Review your appartment!</router-link>
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
<<<<<<< HEAD
  mounted(){
    var input = document.getElementById("places-input");
    var autocomplete = new google.maps.places.Autocomplete(input);
  },

=======
>>>>>>> 88b0a15425d6b95726a51922ba83fd35c970e347
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
</style>

