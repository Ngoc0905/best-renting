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
  props: ["place"],
  data() {
    return {
      results: []
    };
  },
  methods: {
    onSelect(place) {
      // after search address
      let query = {
        lat: place.lat,
        lng: place.lng
      };

      if(place.street_number)
        query.street_number = place.street_number;

      if(place.route)
        query.route = place.route;

      if(place.city)
        query.city = place.city;

      if(place.region)
        query.region = place.region;

      if(place.country)
        query.country = place.country;

      this.$router.push({
        name: "findrenting",
        query: query
      });
    }
  }
};
</script>

<style scoped>
.review {
  padding: 20px 30px;
}

</style>

