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
        <h2>Your review</h2>
        <form @submit.prevent="onSubmit">
            <b-field  label="Address" >
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
            <b-field  label="Price">
                <b-input maxlength="100" type="number"  placeholder="€" v-model="reviewprice">
                </b-input>
            </b-field>
            <b-field  label="Comments">
                <b-input maxlength="100" type="textarea" v-model="comments">
                </b-input>
            </b-field>
            <b-field  label="Rating District">
                <star-rating v-model="ratingDistrict" v-bind:show-rating="false"></star-rating>
            </b-field>
            <b-field  label="Rating Building">
                <star-rating v-model="ratingBuilding" v-bind:show-rating="false"></star-rating>
            </b-field>
            <b-field  label="Rating Landlord">
                <star-rating v-model="ratingLandlord" v-bind:show-rating="false"></star-rating>
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
      reviewprice: null,
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
        reviewprice: this.reviewprice,
        comments: this.comments,
        ratingDistrict: this.ratingDistrict,
        ratingBuilding: this.ratingBuilding,
        ratingLandlord: this.ratingLandlord
      };

      api.saveReview(review).then(responseFromServer => {
        this.isSentSuccessfully = true;
        window.scrollTo(0, 0);
        this.address = null;
        this.ratingDistrict = 3;
        this.ratingBuilding = 3;
        this.ratingLandlord = 3;
        this.number = null;
        this.floor = null;
        this.building = null;
        this.reviewprice = null;
        this.comments = null;
      });
    }
  }
};
</script>
<style scoped>
.container {
  width: 500px;
}

@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 15px;
  }
}

h2 {
  color: #fff;
  font-size: 28px;
  font-family: "Open Sans", Arial, sans-serif;
}
</style>