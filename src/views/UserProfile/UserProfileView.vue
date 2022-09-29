<template>
    <div class="container" style="background-color: white;">
        <div class="row">
            <div class="col-4">
                <img class="profile-pic mx-auto d-block"
                    src="https://th.bing.com/th/id/OIP.7JF-7yTEH3ZfDQIs4w4kKAAAAA?pid=ImgDet&rs=1" alt="">
            </div>
            <div class="col-8">
                <div class="row mb-3">
                    <button type="button" class="btn btn-outline-primary">Edit Profile</button>
                </div>
                <div class="row mb-3">
                    <h1 class="font-weight-bold">Hansford Nguyen</h1>
                </div>
                <div class="row btn-group-toggle text-info">
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
            <component :is="activeComponent"></component>
        </transition>
    </div>
</template>
<script>
import UserProfilePhoto from '../../components/UserProfile/UserProfilePhoto.vue';
import UserProfileVideo from '@/components/UserProfile/UserProfileVideo.vue';
export default {
    name: "UserProfileView",
    data() {
        return {
            id: null,
            activeComponent: "UserProfileHeader"
        };
    },
    mounted() {
        this.id = this.$route.params.id;
    },
    components: { UserProfilePhoto, UserProfileVideo }
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