<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{ address_detail }}
            </p>
            <div class="actions-container">
                <a class="button" @click="remove">
                    <i class="fas fa-trash-alt"></i>
                </a>
                <a :class="['button', {'hide':  isOnEdit}]" @click="edit"><i class="fas fa-edit"></i></a>
                <a :class="['button', {'hide':  !isOnEdit}]" id="save" @click="saveEdit"><i class="far fa-save"></i></a>
            </div>
        </header>
        <div class="card-content">
            <div class="content">
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <tr>
                        <td class="first-column">Number of appartment</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.number }}</span>
                            <b-input type="text" v-if="isOnEdit" v-model="detail.number"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td>Floor</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.floor }}</span>
                            <b-input type="text" v-if="isOnEdit" v-model="detail.floor"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td>Building</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.building }}</span>
                            <b-input type="text" v-if="isOnEdit" v-model="detail.building"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td>Rent Price</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.price }}</span>
                            <b-input type="text" v-if="isOnEdit" v-model="detail.price"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.description }}</span>
                            <b-input type="textarea" v-if="isOnEdit" v-model="detail.description"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td>Contact</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.contact }}</span>
                            <b-input type="text" v-if="isOnEdit" v-model="detail.contact"></b-input>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
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
    console.log(this.detail);
  },
  methods: {
    remove() {
        if(confirm("Do you want to delete this renting?"))
            this.$emit("remove", this.detail._id, 'renting');
    },
    edit() {
      this.isOnEdit = true;
    },
    saveEdit() {
      api.update(this.detail._id, this.detail, '/adrenting/').then(responseFromServer => {
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


