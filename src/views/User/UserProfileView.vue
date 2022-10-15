<template>
    <div class="container" style="background-color: white;">
        <div v-if="user" class="row">
            <div class="col-4">
                <img v-if="user.avatar" class="profile-pic" :src="`data:image/png;base64,${user.avatar}`">
                <img v-else src="@/assets/default.png" class="profile-pic">
            </div>
            <div class="col-8">
                <div class="row mb-3">
                    <router-link v-if="userId == currentUserId" :to="{name: 'EditProfileView'}">
                        <button type="button" class="btn btn-outline-primary">Edit Profile</button>
                    </router-link>
                    <button v-if="isFollowed && userId != currentUserId" @click="follow" type="button" class="btn btn-primary">Following</button>
                    <button v-else-if="!isFollowed && userId != currentUserId" @click="follow" type="button" class="btn btn-outline-primary">Follow</button>
                </div>
                <div class="row mb-3">
                    <h1 class="font-weight-bold">{{user.firstName}} {{user.lastName}}</h1>
                </div>
                <div class="row btn-group-toggle text-info">
                    <label class="col-4 btn profile-tabs font-weight-bold">
                        <input type="radio" v-model="activeComponent" value="UserProfilePost">
                        <span>{{user.posts}}</span>
                        Posts
                    </label>
                    <label class="col-4 btn profile-tabs font-weight-bold">
                        <input type="radio" v-model="activeComponent" value="UserProfilePhoto">
                        <span>{{user.photos}}</span>
                        Photos
                    </label>
                    <label class="col-4 btn profile-tabs font-weight-bold">
                        <input type="radio" v-model="activeComponent" value="UserProfileVideo">
                        <span>{{user.videos}}</span>
                        Videos
                    </label>
                    <label class="col-6 btn profile-tabs font-weight-bold">
                        <input type="radio" v-model="activeComponent" value="UserProfileFollowing">
                        <span>{{user.followings}}</span>
                        <input type="radio"> Following
                    </label>
                    <label class="col-6 btn profile-tabs font-weight-bold">
                        <input type="radio" v-model="activeComponent" value="UserProfileFollower">
                        <span>{{user.followers}}</span>
                        <input type="radio"> Followers
                    </label>
                </div>
            </div>
        </div>
        <transition name="translate" mode="out-in">
            <div>
                <UserProfilePost v-if="activeComponent == 'UserProfilePost'" :baseURL="baseURL" :userId="userId"
                    :currentUserId="currentUserId"></UserProfilePost>
                <UserProfilePhoto v-if="activeComponent == 'UserProfilePhoto'" :baseURL="baseURL" :userId="userId"
                    :currentUserId="currentUserId"></UserProfilePhoto>
                <UserProfileVideo v-if="activeComponent == 'UserProfileVideo'" :baseURL="baseURL" :userId="userId"
                    :currentUserId="currentUserId"></UserProfileVideo>
                <UserProfileFollower v-if="activeComponent == 'UserProfileFollower'" :baseURL="baseURL" :userId="userId"
                    :currentUserId="currentUserId"></UserProfileFollower>
                <UserProfileFollowing v-if="activeComponent == 'UserProfileFollowing'" :baseURL="baseURL" :userId="userId"
                    :currentUserId="currentUserId"></UserProfileFollowing>
            </div>
        </transition>
    </div>
</template>
<script>
import UserProfilePost from '@/components/UserProfile/UserProfilePost.vue';
import UserProfilePhoto from '@/components/UserProfile/UserProfilePhoto.vue';
import UserProfileVideo from '@/components/UserProfile/UserProfileVideo.vue';
import UserProfileFollower from '@/components/UserProfile/UserProfileFollower.vue';
import UserProfileFollowing from '@/components/UserProfile/UserProfileFollowing.vue';
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
            isFollowed: null,
            activeComponent: "UserProfilePost",
        };
    },
    methods: {
        async follow() {
            await axios.post(`${this.baseURL}/user/follow/${this.userId}?token=${localStorage.getItem("token")}`).then(() => {
                this.checkFollowed();
            }).catch(err => { console.log(err) })
        },
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
        },
        async checkFollowed() {
            await axios.get(`${this.baseURL}/user/isFollowed/${this.userId}?token=${localStorage.getItem("token")}`).then(res => {
                this.isFollowed = res.data
                console.log(res.data)
            }).catch(err => console.log(err))
        }
    },
    mounted() {
        this.userId = this.$route.params.id;
        this.getCurrentUserId();
        this.getProfile();
        this.checkFollowed();

    },
    components: { UserProfilePhoto, UserProfileVideo, UserProfilePost, UserProfileFollower, UserProfileFollowing }
}
</script>
<style lang="scss" scoped>
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