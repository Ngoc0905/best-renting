<template>
    <section class="container">
        <b-notification type="is-success" @close="onCloseNotification" v-if="isSentSuccessfully">
            Your review has been sent successfully
        </b-notification>
        <b-notification type="is-danger" :active.sync="isOnError">
            <ul>
                <li v-for="err in errors" v-bind:key="err.id">{{ err }}</li>
            </ul>
        </b-notification>
        <form @submit.prevent="onSubmit">
            <b-field label="Address">
                <SearchAutocomplete v-on:select="onSelectAddress"/>
            </b-field>
            <div class="columns">
              <b-field class="column" label="N° Appartment">
                  <b-input type="number" v-model="number"></b-input>
              </b-field>
              <b-field class="column" label="Floor">
                  <b-input type="number" v-model="floor"></b-input>
              </b-field>
              <b-field class="column" label="Building">
                  <b-input type="text" v-model="building"></b-input>
              </b-field>
            </div>
            <b-field label="Comments">
                <b-input maxlength="100" type="textarea" v-model="comments">
                </b-input>
            </b-field>
            <b-field label="Rating District">
                <star-rating v-model="ratingDistrict"></star-rating>
            </b-field>
            <b-field label="Rating Building">
                <star-rating v-model="ratingBuilding"></star-rating>
            </b-field>
            <b-field label="Rating Landlord">
                <star-rating v-model="ratingLandlord"></star-rating>
            </b-field>
            <button type="submit" class="button is-primary">Submit</button>
        </form>
    </section>
</template>

<script>
import api from "../api";
import SearchAutocomplete from "../components/SearchAutocomplete";
import StarRating from "vue-star-rating";

export default {
  components: { SearchAutocomplete, StarRating },
  data() {
    return {
      address: null,
      ratingDistrict: 3,
      ratingBuilding: 3,
      ratingLandlord: 3,
      number: null,
      floor: null,
      building: null,
      comments: null,
      isSentSuccessfully: false,
      errors: [],
      isOnError: false
    };
  },
  methods: {
    onSelectAddress(place) {
      this.address = place;
    },
    onCloseNotification() {
      this.isSentSuccessfully = false;
      this.$router.go(0);
    },
    onSubmit() {
      this.errors = [];
      this.isOnError = false;
      
      if (!this.address) this.errors.push("Address is required.");

      if (this.address && !this.address.street_number)
        this.errors.push("Street number is required.");

      if (this.errors.length) {
        this.isOnError = true;
        return false;
      }

      var review = {
        address: this.address,
        number: this.number,
        floor: this.floor,
        building: this.building,
        comments: this.comments,
        ratingDistrict: this.ratingDistrict,
        ratingBuilding: this.ratingBuilding,
        ratingLandlord: this.ratingLandlord
      };

      api.saveReview(review).then(responseFromServer => {
        this.isSentSuccessfully = true;
      });
    }
  }
};
</script>
<style scoped>
.container {
  width: 500px;
}
</style>
