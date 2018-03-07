<template>
  <div class="container">
    <div class="columns">
      <div class="column is-two-thirds">
        <h2>Rating places</h2>
        <SearchAutocomplete v-bind:lat="$route.params.lat" v-bind:lng="$route.params.lng" v-on:select="updateParamsAndReload"/>
        <div id="reviews" v-if="results.length >0">
          <nav class="panel">
            <p class="panel-heading">
              Result
            </p>
            <div class="panel-block total">
              <div class="columns">
                <div class="column">
                  <div class="bloc_moyenne">
                      <p>{{ total }} / 5 <span class="fa fa-star bloc_moyenne_etoile etoile"></span></p>
                  </div>
                </div>
                <div class="column is-two-thirds">
                  <ul id="nl">
                    <li>District: <star-rating  v-model="totalRatingDistrict" v-bind:increment="0.01" v-bind:show-rating="false" v-bind:star-size="30" v-bind:read-only="true"></star-rating></li>
                    <li>Building: <star-rating  v-model="totalRatingBuilding" v-bind:increment="0.01" v-bind:show-rating="false" v-bind:star-size="30" v-bind:read-only="true"></star-rating></li>
                    <li>Landlord: <star-rating  v-model="totalRatingLandlord" v-bind:increment="0.01" v-bind:show-rating="false" v-bind:star-size="30" v-bind:read-only="true"></star-rating></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="panel-block detail" v-for="r in results" v-bind:key="r.id">
              <div class="columns">
                <div class="column">
                  <img class="img_avatar" :src="'http://localhost:3000'+ r.user.avatar" alt="avatar"> 
                </div>
                <div class="column">
                  <ul>
                    <li>District: <star-rating  v-model="r.ratingDistrict" v-bind:increment="0.01" v-bind:show-rating="false" v-bind:star-size="20" v-bind:read-only="true"></star-rating></li>
                    <li>Building: <star-rating  v-model="r.ratingBuilding" v-bind:increment="0.01" v-bind:show-rating="false" v-bind:star-size="20" v-bind:read-only="true"></star-rating></li>
                    <li>Landlord: <star-rating  v-model="r.ratingLandlord" v-bind:increment="0.01" v-bind:show-rating="false" v-bind:star-size="20" v-bind:read-only="true"></star-rating></li>
                  </ul>
                </div>
                <div class="column">
                  <p>Name: {{ r.user.name}}</p>
                  <p>Comments: {{ r.comments }}</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="column">
        <div id="myMap"></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
import SearchAutocomplete from "../components/SearchAutocomplete";
import StarRating from "vue-star-rating";

export default {
  components: { SearchAutocomplete, StarRating },
  data() {
    return {
      results: []
    };
  },
  computed: {
    totalRatingDistrict() {
      var arrRatingDistrict = this.results.map(review => {
        return review.ratingDistrict;
      });
      return parseFloat(
        (
          arrRatingDistrict.reduce((a, b) => a + b, 0) /
          arrRatingDistrict.length
        ).toFixed(2)
      );
    },
    totalRatingBuilding() {
      var arrRatingBuilding = this.results.map(review => {
        return review.ratingBuilding;
      });
      return parseFloat(
        (
          arrRatingBuilding.reduce((a, b) => a + b, 0) /
          arrRatingBuilding.length
        ).toFixed(2)
      );
    },
    totalRatingLandlord() {
      var arrRatingLandlord = this.results.map(review => {
        return review.ratingLandlord;
      });
      return parseFloat(
        (
          arrRatingLandlord.reduce((a, b) => a + b, 0) /
          arrRatingLandlord.length
        ).toFixed(2)
      );
    },
    total() {
      return (
        (this.totalRatingDistrict +
          this.totalRatingBuilding +
          this.totalRatingLandlord) /
        3
      ).toFixed(1);
    }
  },
  watch: {
    $route(to, from) {
      this.initGoogleMap();
    }
  },
  mounted: function() {
    this.initGoogleMap();
  },
  methods: {
    initGoogleMap() {
      var place = getQueryStringInformations(this.$route.query);
      if (place) {
        this.findReviews(place);
      } else {
        new google.maps.Map(document.getElementById("myMap"), {
          center: {
            lat: 48.85661400000001,
            lng: 2.3522219000000177
          },
          scrollwheel: false,
          zoom: 9
        });
      }
    },
    updateParamsAndReload(place) {
      this.$router.push({
        name: "findrenting",
        query: place
      });
    },
    findReviews(place){
      api.getReviews(place).then(responseFromServer => {
        this.results = responseFromServer.data;
        let map = new google.maps.Map(document.getElementById("myMap"), {
          center: {
            lat: place.lat,
            lng: place.lng
          },
          scrollwheel: false,
          zoom: 11
        });
        this.results.forEach(r => {
          new google.maps.Marker({
            position: {
              lat: r.address.lat,
              lng: r.address.lng
            },
            map: map,
            title: `${r.address.street_number} ${r.address.route}, ${
              r.address.city
            }`
          });
        });
      });
    }
  }
};

function getQueryStringInformations(query) {
  if (!query || !query.lat || !query.lng) return false;
  return {
    lat: parseFloat(query.lat),
    lng: parseFloat(query.lng),
    street_number: query.street_number,
    route: query.route,
    city: query.city,
    region: query.region,
    country: query.country
  };
}
</script>

<style>
  #nl .vue-start-rating{
    display: inline-block;
  }
</style>

<style scoped>
.container {
  margin-bottom: 20px;
  display: flex;
  width: 100%;
}

#left {
  width: 60%;
}
#left .total {
  background-color: rgba(194, 180, 180, 0.623);
}
#reviews {
  padding-top: 20px;
}
#myMap {
  height: 300px;
  margin-top: 70px;
  margin-left: auto;
}
#nl {
  color: #fff;
}

.columns {
  width: 100%;
}

.column{
  flex-direction: column;
  justify-content: flex-start;
}

.column:first-child{
  display: flex;
}

.bloc_moyenne {
  border: 1px solid #f7b000;
  background-color: #fff7e8;
  border-radius: 5px;
  width: 140px;
  padding: 10px 0 14px 0;
  margin-top: 4px;
  height: 68px;
}

.bloc_moyenne_etoile {
  display: none;
}

.bloc_moyenne p {
  font-size: 40px;
  margin: 0;
  padding-bottom: 8px;
  text-align: center;
  letter-spacing: -2px;
  color: #f7b000;
  line-height: 1;
}

.bloc_moyenne div {
  height: 22px;
}

.bloc_moyenne_details {
  width: 300px;
  margin-left: 15px;
  float: left;
}

.bloc_moyenne_details ul li {
  float: left;
}
.panel-heading {
  font-size: 20px;
  font-family: "Open Sans", Arial, sans-serif;
}
.detail {
  color: #fff;
}
.detail .column .img_avatar {
  margin: 20px;
  width: 200px;
  padding-right: 10px;
}

@media (max-width: 768px) {
  .columns {
    margin: 0;
  }
}
</style>