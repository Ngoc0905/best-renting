<template>
  <section class="container">
    <b-notification type="is-success" @close="onCloseNotification" v-if="isSentSuccessfully">
        Your post has been sent successfully
    </b-notification>
    <h2>Post your ad finding</h2>
    <form  @submit.prevent="onSubmit">
        <b-field  label="Address" >
          <SearchAutocomplete v-on:select="onSelectAddress" />
        </b-field>
        <b-field label="Rent price">
            <b-input type="text" placeholder="€" v-model="rentprice" required></b-input>
        </b-field>
        <b-field label="Select a date" >
        <b-datepicker
            placeholder="Type or select a date..."
            icon="calendar-today"
            :readonly="false" v-model="daterent" required>
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
        daterent: null,
        isSentSuccessfully: false
      };
  },methods: {
    onSelectAddress(place) {
      this.address = place;
    },
     onCloseNotification(){
        console.log('onCloseNotification');
        this.isSentSuccessfully = false;
        this.$router.go(0);
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

<style scoped>
.container {
  width: 550px;
}
h2{
  color: #fff;
  font-size: 28px;
  font-family: "Open Sans", Arial, sans-serif;
  padding-bottom: 10px;
}
</style>