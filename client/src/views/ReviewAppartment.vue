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
  </div>
</template>

<script>
import SearchAutocomplete from "../components/SearchAutocomplete";
export default {
  components: { SearchAutocomplete },
  data() {
      return {
          reviewAddress: ''
      };
  }
};
</script>