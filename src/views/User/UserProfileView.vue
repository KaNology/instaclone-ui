<template>
    <div class="container" style="background-color: white;">
        <div class="row">
            <div class="col-4">
                <img class="profile-pic mx-auto d-block"
                    src="https://th.bing.com/th/id/OIP.7JF-7yTEH3ZfDQIs4w4kKAAAAA?pid=ImgDet&rs=1" alt="">
            </div>
            <div class="col-8">
                <div class="row mb-3">
                    <router-link v-if="userId == currentUserId" :to="{name: 'EditProfileView'}">
                        <button type="button" class="btn btn-outline-primary">Edit Profile</button>
                    </router-link>
                </div>
                <div class="row mb-3">
                    <h1 class="font-weight-bold">Hansford Nguyen</h1>
                </div>
                <div class="row btn-group-toggle text-info">
                    <label class="col-3 btn profile-tabs font-weight-bold">
                        <input type="radio" v-model="activeComponent" value="UserProfilePost">
                        Posts
                    </label>
                    <label class="col-3 btn profile-tabs font-weight-bold">
                        <input type="radio" v-model="activeComponent" value="UserProfilePhoto">
                        Photos
                    </label>
                    <label class="col-3 btn profile-tabs font-weight-bold">
                        <input type="radio" v-model="activeComponent" value="UserProfileVideo">
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
            <component :baseURL="baseURL" :is="activeComponent"></component>
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
            activeComponent: null
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

        this.activeComponent = "UserProfileHeader"
        if (this.userId && this.currentUserId) {
            this.getProfile()
        }
    },
    components: { UserProfilePhoto, UserProfileVideo, UserProfilePost }
}
</script>
<style>
.profile-pic {
    width: 200px;
    height: 200px;
    border-radius: 50%;
}

.profile-tabs {
    font-size: x-large;
}

/* .translate-enter-active,
.translate-leave-active {
    transition: all 0.5s ease;
}

.translate-enter-from,
.translate-leave-to {
    opacity: 0;
    transform: translateX(30px);
} */
</style>