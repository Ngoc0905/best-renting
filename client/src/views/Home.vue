<template>
  <div>
  
    <div class="container">
  
      <h1>Good rental for all</h1>
  
      <h2>Note a raiting for your rental, find a new rental</h2>
  
  
  
      <div>
  
        <SearchAutocomplete v-on:select="onSelect" />
  
      </div>
  
      <div class="review">
  
        <router-link class="button" to="/review-appartment">Review your appartment!</router-link>
  
      </div>
  
      <div id="btn_ccm">
  
        <a href="#" v-scroll-to="{
  
              el: '#bloc_contenant',
  
              offset: -100
  
            }" id="scroll-to-guide-btn" title="How it works Best renting ?">How it works ?<br>
  
            <span class="fa fa-chevron-down"></span></a>
  
      </div>
  
    </div>
  
    <Guide/>
  
  </div>
</template>

<script>
  import api from "../api";
  
  import SearchAutocomplete from "../components/SearchAutocomplete";
  
  import Guide from "../components/Guide";
  
  
  
  export default {
  
    components: {
  
      SearchAutocomplete,
  
      Guide
  
    },
  
    props: ["place"],
  
    data() {
  
      return {
  
        results: []
  
      };
  
    },
  
    mounted() {
  
      document.getElementById('scroll-to-guide-btn').addEventListener('click', function() {
  
        console.log('aaa');
  
        document.getElementsByTagName('body')[0].scrollTo(0, 50);
  
      });
  
    },
  
    methods: {
  
      onSelect(place) {
  
        // after search address
  
        let query = {
  
          lat: place.lat,
  
          lng: place.lng
  
        };
  
  
  
        if (place.street_number) query.street_number = place.street_number;
  
  
  
        if (place.route) query.route = place.route;
  
  
  
        if (place.city) query.city = place.city;
  
  
  
        if (place.region) query.region = place.region;
  
  
  
        if (place.country) query.country = place.country;
  
  
  
        this.$router.push({
  
          name: "findrenting",
  
          query: query
  
        });
  
      }
  
    }
  
  };
</script>

<style scoped>
  .container {
  
    padding-top: 100px;
  
    padding-bottom: 70px;
  
    max-width: 600px;
  
    text-align: center;
  
  }
  
  
  
  h1 {
  
    color: #fff;
  
    text-align: center;
  
    font-size: 48px;
  
    font-family: "Open Sans", Arial, sans-serif;
  
    padding: 10px;
  
  }
  
  
  
  h2 {
  
    color: #fff;
  
    text-align: center;
  
    font-family: "Open Sans", Arial, sans-serif;
  
    font-size: 22px;
  
    padding: 30px;
  
  }
  
  
  
  @media (max-width: 768px) {
  
    .container {
  
      padding: 50px 15px 70px 15px;
  
      max-width: 400px;
  
      text-align: center;
  
    }
  
    h1 {
  
      font-family: "Open Sans", Arial, sans-serif;
  
      font-size: 28px;
  
      padding: 20px;
  
    }
  
    h2 {
  
      font-family: "Open Sans", Arial, sans-serif;
  
      font-size: 13px;
  
      padding: 20px;
  
    }
  
  }
  
  
  
  .review {
  
    padding: 20px 30px;
  
  }
  
  
  
  #btn_ccm {
  
    padding-top: 50px;
  
    font-size: 20px;
  
  }
  
  
  
  #scroll-to-guide-btn,
  
  .fa-chevron-down {
  
    color: #fff;
  
  }
  
  
  
  #scroll-to-guide-btn:hover,
  
  .fa-chevron-down:hover {
  
    color: rgb(66, 59, 168);
  
  }
</style>

