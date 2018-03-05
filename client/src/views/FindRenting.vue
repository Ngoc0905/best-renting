<template>
  <div class="container">
    <div id="left">
    <SearchAutocomplete v-bind:lat="$route.params.lat" v-bind:lng="$route.params.lng" v-on:select="updateParamsAndReload"/>
      <div id="reviews" v-if="results.length >0">
        <nav class="panel">
          <p class="panel-heading">
            Result
          </p>
          <div class="panel-block">
            <div class="columns">
              <div class="column">
                <div class="bloc_moyenne">
										<p>{{ total }} /5 <span class="fa fa-star bloc_moyenne_etoile etoile"></span></p>
                </div>
              </div>
              <div class="column">
                <ul>
                  <li>District: <star-rating v-model="totalRatingDistrict" increment="0.01" read-only="true"></star-rating></li>
                  <li>Building: <star-rating v-model="totalRatingBuilding" increment="0.01" read-only="true"></star-rating></li>
                  <li>Landlord: <star-rating v-model="totalRatingLandlord" increment="0.01" read-only="true"></star-rating></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="panel-block">
            <div v-for="r in results" v-bind:key="r.id">
             <img :src="'http://localhost:3000'+ r.user.avatar" alt=""> 
             {{ r.user.email}}{{ r.comments }}
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div id="myMap"></div>

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
      return parseFloat((
        arrRatingDistrict.reduce((a, b) => a + b, 0) / arrRatingDistrict.length
      ).toFixed(2));
    },
    totalRatingBuilding() {
      var arrRatingBuilding = this.results.map(review => {
        return review.ratingBuilding;
      });
      return parseFloat((
        arrRatingBuilding.reduce((a, b) => a + b, 0) / arrRatingBuilding.length
      ).toFixed(2));
    },
    totalRatingLandlord() {
      var arrRatingLandlord = this.results.map(review => {
        return review.ratingLandlord;
      });
      return parseFloat((
        arrRatingLandlord.reduce((a, b) => a + b, 0) / arrRatingLandlord.length
      ).toFixed(2));
    },
    total(){
      return ((this.totalRatingDistrict + this.totalRatingBuilding + this.totalRatingLandlord) / 3).toFixed(1)
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
        this.updateParamsAndReload(place);
      } else {
        new google.maps.Map(document.getElementById("myMap"), {
          center: {
            lat: 48.85661400000001,
            lng: 2.3522219000000177
          },
          scrollwheel: false,
          zoom: 7
        });
      }
    },
    updateParamsAndReload(place) {
      api.getReviews(place).then(responseFromServer => {
        console.log(responseFromServer);
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
          console.log(r);
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

<style scoped>
.container {
  overflow: auto;
  width: 900;
  padding-top: 100px;
}
#left {
  height: 300px;
  float: left;
  width: 49%;
}
#reviews {
  padding-top: 20px;
}
#myMap {
  height: 300px;
  float: right;
  width: 500px;
}
.bloc_moyenne {
  border: 1px solid #f7b000;
  background-color: #fff7e8;
  border-radius: 5px;
  width: 140px;
  padding: 10px 0 14px 0;
  float: left;
  margin-top: 4px;
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
</style>