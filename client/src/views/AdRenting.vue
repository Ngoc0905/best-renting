<template>
    <section>
        <form class="container" @submit.prevent="onSubmit">
            <SearchAutocomplete v-on:select="onSelectAddress" required/>
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
            <b-field label="Rent price" >
                <b-input type="number" v-model="rentprice" required></b-input>
            </b-field>
            <b-field label="Description">
                <b-input  maxlength="200" type="textarea" v-model="description"></b-input>
            </b-field>
            <b-field label="Contact">
                <b-input  maxlength="100" type="textarea" v-model="contact"></b-input>
            </b-field>
            <button type="submit" class="button is-primary">Submit</button>
        </form>
    </section>
</template>

<script>
import api from "../api";
import SearchAutocomplete from "../components/SearchAutocomplete";
export default {
  components: { SearchAutocomplete },
  data() {
    return {
      address: null,
      number: null,
      floor: null,
      building: null,
      rentprice: null,
      description: null,
      contact: null
    };
  },
  methods: {
    onSelectAddress(place) {
      this.address = place;
    },
    onSubmit() {
      var adRenting = {
        address: this.address,
        number: this.number,
        floor: this.floor,
        building: this.building,
        rentprice: this.rentprice,
        description: this.description,
        contact: this.contact
      };
      api.saveAdRenting(adRenting).then(responseFromServer => {
        this.isSentSuccessfully = true;
      });
    }
  }
};
</script>