<template>
    <div class="container" style="background-color: white;">
        <div v-if="user" class="row">
            <div class="col-4">
                <img class="profile-pic" :src="`data:image/png;base64,${user.avatar}`">
            </div>
            <div class="col-8">
                <div class="row mb-3">
                    <router-link v-if="userId == currentUserId" :to="{name: 'EditProfileView'}">
                        <button type="button" class="btn btn-outline-primary">Edit Profile</button>
                    </router-link>
                </div>
                <div class="row mb-3">
                    <h1 class="font-weight-bold">{{user.firstName}} {{user.lastName}}</h1>
                </div>
                <div class="row btn-group-toggle text-info">
                    <label class="col-3 btn profile-tabs font-weight-bold">
                        <input type="radio" v-model="activeComponent" value="UserProfilePost">
                        <span>{{user.posts}}</span>
                        Posts
                    </label>
                    <label class="col-3 btn profile-tabs font-weight-bold">
                        <input type="radio" v-model="activeComponent" value="UserProfilePhoto">
                        <span>{{user.photos}}</span>
                        Photos
                    </label>
                    <label class="col-3 btn profile-tabs font-weight-bold">
                        <input type="radio" v-model="activeComponent" value="UserProfileVideo">
                        <span>{{user.videos}}</span>
                        Videos
                    </label>
                    <!-- <label class="col-3 btn profile-tabs font-weight-bold">
                        <input type="radio"> Following
                    </label>
                    <label class="col-3 btn profile-tabs font-weight-bold">
                        <input type="radio"> Followers
                    </label> -->
                </div>
            </div>
        </div>
        <transition name="translate" mode="out-in">
            <div>
                <UserProfilePost v-if="activeComponent == 'UserProfilePost'" :baseURL="baseURL" :userId="userId" :currentUserId="currentUserId"></UserProfilePost>
                <UserProfilePhoto v-if="activeComponent == 'UserProfilePhoto'"></UserProfilePhoto>
                <UserProfileVideo v-if="activeComponent == 'UserProfileVideo'"></UserProfileVideo>
            </div>
        </transition>
    </div>
</template>
<script>
import UserProfilePost from '@/components/UserProfile/UserProfilePost.vue';
import UserProfilePhoto from '@/components/UserProfile/UserProfilePhoto.vue';
import UserProfileVideo from '@/components/UserProfile/UserProfileVideo.vue';
import axios from 'axios';
export default {
    name: "UserProfileView",
    props: ["baseURL"],
    data() {
        return {
            userId: null,
            currentUserId: null,
            token: null,
            user: null,
            activeComponent: "UserProfilePost",
        };
    },
    methods: {
        async getProfile() {
            await axios.get(`${this.baseURL}user/profile/${this.userId}`).then(res => {
                this.user = res.data
            })
        },
        async getCurrentUserId() {
            // Check if the current user match with the current profile
            await axios.get(`${this.baseURL}user/?token=${localStorage.getItem("token")}`).then(res => {
                this.currentUserId = res.data
            })
        }
    },
    mounted() {
        this.userId = this.$route.params.id;
        this.getCurrentUserId();
        this.getProfile()

    },
    components: { UserProfilePhoto, UserProfileVideo, UserProfilePost }
}
</script>
<style>
.profile-pic {
    display: block;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    margin: auto;
}

.profile-tabs {
    font-size: x-large;
}

.translate-enter-active,
.translate-leave-active {
    transition: all 0.5s ease;
}

.translate-enter-from,
.translate-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>