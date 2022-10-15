<template>
    <div v-if="currentUserId == userId" class="row">
        <router-link class="offset-10 mb-4" :to="{name: 'CreatePostView'}">
            <button type="button" class="btn btn-success">Add Post</button>
        </router-link>
    </div>
    <div v-if="posts" class="row">
        <div v-for="(post,key) in posts" :key="key" class="col-3">
            <div style="position: relative;">
                <img v-if="post.thumbnailType == 'image'" class="thumbnail" @click="showPopup(post.postId)" :src="`data:image/png;base64,${post.thumbnail}`">
                <video v-else class="thumbnail" @click="showPopup(post.postId)">
                    <source :src="`data:video/mp4;base64,${post.thumbnail}`" type="video/mp4">
                </video>
                <div v-if="post.isPrivate" class="post-lock"><i class="bi bi-lock-fill"></i></div>
            </div>
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
    props: ["baseURL", "userId", "currentUserId"],
    data() {
        return {
            posts: null,
        };
    },
    methods: {
        async getPosts() {
            await axios.get(`${this.baseURL}/post/list/${this.$route.params.id}?token=${localStorage.getItem("token")}`).then(res => {
                this.posts = res.data;
                console.log(res.data)
            });
        },
        showPopup(postId) {
            this.$refs.popupPost.show(postId);
        }
    },
    mounted() {
        this.getPosts();
    },
    components: { PostModal }
}
</script>
<style>
.post-lock {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: whitesmoke;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    opacity: 0.7;
}

.thumbnail {
    display: block;
    width: 100%;
    height: 250px;
    object-fit: cover;
    margin: auto;
    cursor: pointer;
    border-radius: 10%;
}
</style>