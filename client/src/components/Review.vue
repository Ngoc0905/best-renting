<template>
    <b-collapse class="card" v-bind:open="false">
        <div slot="trigger" slot-scope="props" class="card-header">
            <p class="card-header-title">
                {{ address_detail }}
            </p>
            <a class="card-header-icon">
                <a class="button" @click="remove">
                    <i class="fas fa-trash-alt"></i>
                </a>
                <a :class="['button', {'hide':  isOnEdit}]" @click="edit"><i class="fas fa-edit"></i></a>
                <a :class="['button', {'hide':  !isOnEdit}]" id="save" @click="saveEdit"><i class="far fa-save"></i></a>
            </a>
        </div>
        <div class="card-content">
            <div class="content">
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <tr>
                        <td class="first-column">Number of appartment</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.number }}</span>
                            <input v-if="isOnEdit" type="text" v-model="detail.number">
                        </td>
                    </tr>
                    <tr>
                        <td>Floor</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.floor }}</span>
                            <input v-if="isOnEdit" type="text" v-model="detail.floor">
                        </td>
                    </tr>
                    <tr>
                        <td>Building</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.building }}</span>
                            <input v-if="isOnEdit" type="text" v-model="detail.building">
                        </td>
                    </tr>
                    <tr>
                        <td>Rating District</td>
                        <td>
                            <span>
                                <star-rating v-model="detail.ratingDistrict" v-bind:show-rating="false" v-bind:star-size="20" v-bind:read-only="!isOnEdit"></star-rating>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>Rating Building</td>
                        <td>
                            <span>
                                <star-rating v-model="detail.ratingBuilding" v-bind:show-rating="false" v-bind:star-size="20" v-bind:read-only="!isOnEdit"></star-rating>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>Rating Landlord</td>
                        <td>
                            <span>
                                <star-rating v-model="detail.ratingLandlord" v-bind:show-rating="false" v-bind:star-size="20" v-bind:read-only="!isOnEdit"></star-rating>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>Comments</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.comments }}</span>
                            <textarea v-if="isOnEdit" rows="5" v-model="detail.comments"></textarea>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </b-collapse>
</template>
<style scoped>
.actions-container {
  display: flex;
  align-items: center;
}

.actions-container a {
  margin-right: 10px;
}

.hide {
  display: none;
}

.first-column {
  width: 50%;
}
</style>

<script>
import api from "../api";
import StarRating from "vue-star-rating";
export default {
  components: {
    StarRating
  },
  props: ["detail"],
  data() {
    return {
      isOnEdit: false
    };
  },
  mounted() {
  },
  methods: {
    remove() {
      if (confirm("Do you want to delete this review?"))
        this.$emit("remove", this.detail._id, "/reviews/");
    },
    edit() {
      this.isOnEdit = true;
    },
    saveEdit() {
      api
        .update(this.detail._id, this.detail, "/reviews/")
        .then(responseFromServer => {
          this.isOnEdit = false;
        });
    }
  },
  computed: {
    address_detail() {
      return `${this.detail.address.street_number} ${
        this.detail.address.route
      }, ${this.detail.address.city}, ${this.detail.address.country}`;
    }
  }
};
</script>