<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{ address_detail }}
            </p>
            <a class="button" @click="remove"><i class="fas fa-trash-alt"></i></a>
            <a class="button" @click="edit"><i class="fas fa-edit"></i></a>
        </header>
        <div class="card-content">
            <div class="content">
                <div class=" is-three-quarters">{{ review_detail }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../api";
export default {
  props: ["detail"],
  mounted() {
    console.log(this.detail.address.lat, this.detail.address.lng);
  },
  methods:{
      remove(){
        this.$emit('remove', this.detail._id);
      },
      edit(){
        this.$emit('edit', this.detail._id);  
      }
  },
  computed: {
    address_detail() {
      return `${this.detail.address.street_number} ${
        this.detail.address.route
      }, ${this.detail.address.city}, ${this.detail.address.country}`;
    },
    review_detail(){
    return `${this.detail.number} ${
        this.detail.floor} ${this.detail.building} ${this.detail.comments} ${this.detail.ratingDistrict}
        ${this.detail.ratingBuilding} ${this.detail.ratingLandlord}`;
    }
  }
};
</script>



