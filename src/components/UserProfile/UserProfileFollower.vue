<template>
    <div class="row">
        <p></p>
    </div>
    <div v-if="followers" class="row">
        <div v-for="(follower,key) in followers" :key="key" class="col-3 mb-3">
            <div class="follower-box">
                <a :href="$router.resolve({name: 'UserProfileView', params: {id: follower.userId}}).href">
                    <img class="avatar" :src="`data:image/png;base64,${follower.avatar}`">
                    <h4 class="text-center">{{follower.username}}</h4>
                </a>

                <div class="row mb-2">
                    <div class="col-6 text">{{follower.photos}}<br>PHOTOS</div>
                    <div class="col-6 text">{{follower.videos}}<br> VIDEOS</div>
                </div>

                <button v-if="follower.isFollowed" @click="follow(follower.userId)" type="button"
                    class="btn btn-primary">Following</button>
                <button v-else @click="follow(follower.userId)" type="button"
                    class="btn btn-outline-primary">Follow</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: "UserProfileFollower",
    data() {
        return {
            followers: null,
        }
    },
    props: ["baseURL", "userId", "currentUserId"],
    methods: {
        async getFollowers() {
            await axios.get(`${this.baseURL}user/follower/${this.$route.params.id}?token=${localStorage.getItem("token")}`).then(res => {
                // console.log(res.data)
                this.followers = res.data;
            })
        },
        async follow(userId) {
            await axios.post(`${this.baseURL}/user/follow/${userId}?token=${localStorage.getItem("token")}`).then(() => {
                this.getFollowers()
            }).catch(err => { console.log(err) })
        }
    },
    mounted() {
        this.getFollowers();
    },
    computed: {
        isFollowed(userId) {
            return this.checkFollowed(userId)
        }
    }
}
</script>
<style lang="scss" scoped>
.follower-box {
    text-align: center;
    box-shadow: 0 0 5px 1px rgb(197, 197, 197);
    margin: 2px;
    padding: 10px;

    .text {
        color: dodgerblue;
        font-weight: 800;
    }
}

.avatar {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin: auto;
}
</style>