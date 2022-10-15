<template>
    <div class="row">
        <p></p>
    </div>
    <div v-if="videos" class="row">
        <div v-for="(video,key) in videos" :key="key" class="col-3 mb-3">
            <div style="position: relative;">
                <video class="thumbnail">
                    <source :src="`data:video/mp4;base64,${video.video}`" type="video/mp4">
                </video>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "UserProfileVideo",
    data() {
        return {
            videos: null,
        }
    },
    props: ["baseURL", "userId", "currentUserId"],
    methods: {
        async getVideos() {
            await axios.get(`${this.baseURL}video/list/${this.$route.params.id}?token=${localStorage.getItem("token")}`).then(res => {
                // console.log(res.data)
                this.videos = res.data;
            })
        }
    },
    mounted() {
        this.getVideos();
    }
}
</script>