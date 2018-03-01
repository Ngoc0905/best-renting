<template>
    <section class="container">
        <b-notification type="is-success" @close="onCloseNotification" v-if="isSentSuccessfully">
            Your review has been sent successfully
        </b-notification>
        <form @submit.prevent="onSubmit">
            <SearchAutocomplete v-on:select="onSelectAddress"/>
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
                <b-input  maxlength="100" type="textarea" v-model="comments">
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
  components: { SearchAutocomplete, StarRating},
  data() {
    return {
      address: null,
      ratingDistrict: 1,
      ratingBuilding: 1,
      ratingLandlord: 1,
      number: null,
      floor: null,
      building: null,
      comment:null,
      isSentSuccessfully: false
    };
  },
  methods: {
    onSelectAddress(place) {
      this.address = place;
    },
    onCloseNotification(){
        console.log('onCloseNotification');
        this.isSentSuccessfully = false;
        this.$router.go(0);
    },
    onSubmit() {
      var review = {
        address: {
          street_number: "", // street_number
          route: "", // route
          city: "", // locality
          region: "", // administrative_area_level_1
          country: "", // country
          postal: "" // postal_code
        },
        number: this.number,
        floor: this.floor,
        building: this.building,
        comments: this.comments,
        ratingDistrict: this.ratingDistrict,
        ratingBuilding: this.ratingBuilding,
        ratingLandlord: this.ratingLandlord
      };

      var street_number = this.address.address_components.find(
        f => f.types.indexOf("street_number") !== -1
      );
      if (street_number) review.address.street_number = street_number.long_name;

      var route = this.address.address_components.find(
        f => f.types.indexOf("route") !== -1
      );
      if (route) review.address.route = route.long_name;

      var locality = this.address.address_components.find(
        f => f.types.indexOf("locality") !== -1
      );
      if (locality) review.address.city = locality.long_name;

      var administrative_area_level_1 = this.address.address_components.find(
        f => f.types.indexOf("administrative_area_level_1") !== -1
      );
      if (administrative_area_level_1)
        review.address.region = administrative_area_level_1.long_name;

      var country = this.address.address_components.find(
        f => f.types.indexOf("country") !== -1
      );
      if (country) review.address.country = country.long_name;

      var postal_code = this.address.address_components.find(
        f => f.types.indexOf("postal_code") !== -1
      );
      if (postal_code) review.address.postal = postal_code.long_name;

      api.saveReview(review).then(responseFromServer => {
          this.isSentSuccessfully = true;
      });
    }
  }
};
</script>
<style>
.container {
  width: 500px;
}
</style>
