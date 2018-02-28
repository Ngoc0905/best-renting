<template>
    <div class="container">
        <section>
            <SearchAutocomplete v-model="reviewAddress"/>
            <b-field label="N° Appartment">
                <b-input type="number"></b-input>
            </b-field>
            <b-field label="Floor">
                <b-input type="number"></b-input>
            </b-field>
            <b-field label="Block">
                <b-input type="text"></b-input>
            </b-field>
       </section>
       <div id="app">
            <h2>Syncing in Vue 2.1.x and below</h2>
            <Rating @rating-selected="rating = $event" :rating="rating"></Rating>
            
            <h3>Selected Rating: {{rating}}</h3>
        </div>
    </div>
</template>
<script>
import SearchAutocomplete from "../components/SearchAutocomplete";
import Rating from "v-rating";
export default {
  components: { SearchAutocomplete,Rating },
  data() {
      return {
          reviewAddress: '',
          rating: 3
      };
  }
};
</script>
<style>
.container{
    width: 500px;
}
</style>
