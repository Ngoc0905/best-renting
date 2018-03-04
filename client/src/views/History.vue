<template>
    <section class="container">
        <h1>History</h1>
        <nav class="panel">
            <p class="panel-heading">
                Appartment reviewed by me
            </p>
            <div class="panel-block">
                <ul>
                    <li v-for="r in reviews" v-bind:key="r._id">
                        <Review v-bind:detail="r"/>
                    </li>
                </ul>
            </div>
        </nav>
        <nav class="panel">
            <p class="panel-heading">
                AdFinding
            </p>
            <div class="panel-block">
                <ul>
                    <li v-for="r in rentingPosts" v-bind:key="r._id">
                        <Review v-bind:detail="r"/>
                    </li>
                </ul>
            </div>
        </nav>
        <nav class="panel">
            <p class="panel-heading">
                AdRenting
            </p>
            <div class="panel-block">
                <ul>
                    <li v-for="r in findingPosts" v-bind:key="r._id">
                        <Review v-bind:detail="r"/>
                    </li>
                </ul>
            </div>
        </nav>
    </section>
</template>
<style scoped>
    .panel-block ul li {
        margin: 10px 0;
    }
</style>

<script>
    import api from "../api";
    import Review from "../components/Review";
    export default {
        components: {
            Review
        },
        data() {
            return {
                reviews: null,
                rentingPosts: null,
                findingPosts: null
            };
        },
        mounted() {
            this.getPosts();
        },
        methods: {
            getPosts(){
                api.getReviewsByUserId(this.$root.user.id).then(responseFromServer => {
                    this.reviews = responseFromServer.data;
                });
                api.getRentingPostsByUserId(this.$root.user.id).then(responseFromServer => {
                    this.rentingPosts = responseFromServer.data;
                });
                api.getFindingPostsByUserId(this.$root.user.id).then(responseFromServer => {
                    this.findingPosts = responseFromServer.data;
                });
            }
        }
    }
</script>

<style scoped>
.container {
  width: 900px;
}
</style>