<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{this.address_detail}}
            </p>
        </header>
        <div class="card-content">
            <div class="content">
                <div class="columns">
                    <div class="column is-three-quarters">
                        
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                </div>
                <div class="column">
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["detail"],
  mounted() {
    console.log(this.detail.address.lat, this.detail.address.lng);
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

