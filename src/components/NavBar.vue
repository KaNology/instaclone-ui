<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">Navbar</a>
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
                <li class="nav-item" v-if="token">
                    <a @click="logout" class="nav-link active" href="">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    name: "NavBar",
    data() {
        return {
            token: null
        };
    },
    methods: {
        logout() {
            localStorage.removeItem("token");
        }
    },
    mounted() {
        this.token = localStorage.getItem("token");
    }
};
</script>