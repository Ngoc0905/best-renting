<template>
<div class="context">
    <b-field>
        <b-input id="place-input" 
            class="container" 
            placeholder="Enter your location" 
            type="text" icon="magnify"></b-input>
    </b-field>
</div>
</template>

<script>
export default {
    mounted() {
        var input = document.getElementById("place-input");
        var autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.addListener("place_changed", () => {
            var place = autocomplete.getPlace();
            if (place.geometry) {
                this.$emit('select', place);
            }
        });
    }
};
</script>

