<template>
    <section>
        <form class="container" @submit.prevent="onSubmit">
            <SearchAutocomplete v-on:select="onSelectAddress" required/>
            <b-field label="Rent price">
                <b-input type="text" placeholder="€" v-model="rentprice" ></b-input>
            </b-field>
            <b-field label="Select a date">
            <b-datepicker
                placeholder="Type or select a date..."
                icon="calendar-today"
                :readonly="false" v-model="daterent">
            </b-datepicker>
            </b-field>
            <b-field label="Comments">
                <b-input  maxlength="100" type="textarea" v-model="comments"></b-input>
            </b-field>
            <b-field label="Contact">
                <b-input  maxlength="100" type="textarea" v-model="contact"></b-input>
            </b-field>
            <button type="submit" class="button is-primary">Submit</button>
        </form>
    </section>
    
</template>

<style scoped>
.container {
  width: 505px;
}
</style>

<script>
import api from '../api';
import SearchAutocomplete from "../components/SearchAutocomplete";
export default {
  components: { SearchAutocomplete },
  data() {
      return {
        address: null,
        rentprice: null,
        comments: null,
        contact: null,
        daterent: null
      };
  },methods: {
    onSelectAddress(place) {
      this.address = place;
    },
    onSubmit() {
      var adFinding = {
        address: this.address,
        rentprice: this.rentprice,
        comments: this.comments,
        contact: this.contact,
        daterent: this.daterent
      };
      api.saveAdFinding(adFinding).then(responseFromServer => {
        this.isSentSuccessfully = true;
      });
    }
  }
};
</script>