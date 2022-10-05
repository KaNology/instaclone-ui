<template>
    <div class="row">
        <router-link class="offset-11 mb-4" :to="{name: 'CreatePostView'}">
            <button type="button" class="btn btn-success">Add Post</button>
        </router-link>
    </div>
    <div v-if="posts" class="row">
        <div v-for="(post,key) in posts" :key="key" class="col-3">
            <img class="avatar" @click="showPopup(post)" :src="`data:image/png;base64,${post.files[0]}`">
            <p class="text-center">{{post.title}}</p>
        </div>
    </div>

    <PostModal :baseURL="baseURL" ref="popupPost"></PostModal>
</template>
<script>
import axios from 'axios';
import PostModal from '../PostModal.vue';

export default {
    name: "UserProfilePhoto",
    props: ["baseURL"],
    data() {
        return {
            posts: null,
        };
    },
    methods: {
        async getPost() {
            await axios.get(`${this.baseURL}/post/list/${this.$route.params.id}`).then(res => {
                this.posts = res.data;
                console.log(res.data)
            });
        },
        showPopup(post) {
            this.$refs.popupPost.show(post);
        }
    },
    mounted() {
        this.getPost();
    },
    components: { PostModal }
}
</script>
<style>
.avatar {
    display: block;
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin: auto;
}
</style>