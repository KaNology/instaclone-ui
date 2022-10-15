<template>
    <div class="row">
        <p></p>
    </div>
    <div v-if="photos" class="row">
        <div v-for="(photo,key) in photos" :key="key" class="col-3 mb-3">
            <div style="position: relative;">
                <img class="thumbnail" :src="`data:image/png;base64,${photo.photo}`">
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: "UserProfilePhoto",
    data() {
        return {
            photos: null,
        }
    },
    props: ["baseURL", "userId", "currentUserId"],
    methods: {
        async getPhotos() {
            await axios.get(`${this.baseURL}photo/list/${this.$route.params.id}?token=${localStorage.getItem("token")}`).then(res => {
                // console.log(res.data)
                this.photos = res.data;
            })
        }
    },
    mounted() {
        this.getPhotos();
    }
}
</script>