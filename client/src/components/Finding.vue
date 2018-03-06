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
                        <td class="first-column">Rent Price</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.rentprice }}</span>
                            <b-input type="text" v-if="isOnEdit" v-model="detail.rentprice"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td>Select Date</td>
                        <td>
                            <span v-if="!isOnEdit">{{ formatedRentDate }}</span>
                            <b-field v-else>
                                <b-datepicker icon="calendar-today" v-model="detail.daterent"></b-datepicker>
                            </b-field>
                        </td>
                    </tr>
                    <tr>
                        <td>Contact</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.contact }}</span>
                            <b-input type="text" v-if="isOnEdit" v-model="detail.contact"></b-input>
                        </td>
                    </tr>
                    <tr>
                        <td>Comments</td>
                        <td>
                            <span v-if="!isOnEdit">{{ detail.comments }}</span>
                            <b-input type="textarea" v-if="isOnEdit" v-model="detail.comments"></b-input>
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
  mounted() {},
  methods: {
    remove() {
      if (confirm("Do you want to delete this finding?"))
        this.$emit("remove", this.detail._id, "/adfindings/");
    },
    edit() {
      this.isOnEdit = true;
    },
    saveEdit() {
      api
        .update(this.detail._id, this.detail, "/adfindings/")
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
    },
    formatedRentDate: function() {
      return this.detail.daterent.ddmmyyyy();
    }
  }
};

Date.prototype.ddmmyyyy = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
          (dd>9 ? '' : '0') + dd,
          (mm>9 ? '' : '0') + mm,
          this.getFullYear()
         ].join('/');
};
</script>


