<template>
<div class="context">
    <b-field>
        <b-input id="place-input" 
            placeholder="Enter your location" 
            type="text" icon="magnify"></b-input>
    </b-field>
</div>
</template>

<script>
export default {
  props: [],
  mounted() {
    let input = document.getElementById("place-input");
    let autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      let place = autocomplete.getPlace();
      if (place.geometry) {
        let address = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };

        let street_number = place.address_components.find(
          f => f.types.indexOf("street_number") !== -1
        );
        if (street_number)
          address.street_number = street_number.long_name;

        let route = place.address_components.find(
          f => f.types.indexOf("route") !== -1
        );
        if (route) address.route = route.long_name;

        let locality = place.address_components.find(
          f => f.types.indexOf("locality") !== -1
        );
        if (locality) address.city = locality.long_name;

        let administrative_area_level_1 = place.address_components.find(
          f => f.types.indexOf("administrative_area_level_1") !== -1
        );
        if (administrative_area_level_1)
          address.region = administrative_area_level_1.long_name;

        let country = place.address_components.find(
          f => f.types.indexOf("country") !== -1
        );
        if (country) address.country = country.long_name;

        let postal_code = place.address_components.find(
          f => f.types.indexOf("postal_code") !== -1
        );
        if (postal_code) address.postal = postal_code.long_name;

        this.$emit("select", address);
      }
    });
  }
};
</script>

<style scoped>
.context{
  padding-top: 300px;
}
</style>
