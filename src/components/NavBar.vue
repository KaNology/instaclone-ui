<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <router-link :to="{name: 'HomeView'}">
            <a class="navbar-brand text-light">InstaClone</a>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="row collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline col-10">
                <input class="form-control" type="search" placeholder="Search" aria-label="Search">
            </form>
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" v-if="!token">
                    <router-link :to="{name: 'LoginView'}">
                        <a class="nav-link active">Login</a>
                    </router-link>
                </li>
                <li class="nav-item" v-if="userId">
                    <router-link :to="{name: 'UserProfileView', params: {id: userId}}">
                        <a class="nav-link active">Profile</a>
                    </router-link>
                </li>
                <li class="nav-item" v-if="token">
                    <a @click="logout" class="nav-link active" href="">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
import axios from 'axios';

export default {
    name: "NavBar",
    props: ["baseURL"],
    data() {
        return {
            token: null,
            userId: null
        };
    },
    methods: {
        logout() {
            localStorage.removeItem("token");
        }
    },
    mounted() {
        this.token = localStorage.getItem("token");
        if (this.token) {
            // Get the user id from the token after login
            axios.get(`${this.baseURL}user/?token=${this.token}`).then(res => {
                this.userId = res.data
            })
        }
    }
};
</script>