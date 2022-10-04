<template>
    <div class="row">
        <router-link class="offset-10 col-1" :to="{name: 'CreatePostView'}">
            <button type="button" class="btn btn-success">Add Post</button>
        </router-link>
    </div>
    <div v-if="posts" class="row">
        <div v-for="(post,key) in posts" :key="key" class="col-3">
            <img class="avatar" :src="`data:image/png;base64,${post.files[0]}`">
            <p class="text-center">{{post.title}}</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: "UserProfilePhoto",
    props: ["baseURL"],
    data() {
        return {
            posts: null,
        }
    },
    methods: {
        async getPost() {
            await axios.get(`${this.baseURL}/post/list/${this.$route.params.id}`).then(res => {
                console.log(res.data)
                this.posts = res.data
            })
        }
    },
    mounted() {
        this.getPost()
    }
}
</script>
<style>
.avatar {
    display: block;
    width: 200px;
    height: 200px;
    object-fit: cover;
}
</style>