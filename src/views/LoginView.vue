<template>
    <div class="container">
        <h1 class="mb-4">Instaclone Login</h1>
        <form @submit.prevent="signin" class="login-form offset-md-3 col-md-6">
            <div class="form-group row">
                <div class="offset-md-1 col-md-10">
                    <input type="email" class="form-control" placeholder="Email" v-model="email"
                        v-bind:class="{'is-invalid': errors.email}" @blur="validate">
                    <div class="invalid-feedback">
                        {{errors.email}}
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="offset-md-1 col-md-10">
                    <input type="password" class="form-control" placeholder="Password" v-model="password"
                        v-bind:class="{'is-invalid': errors.password}" @blur="validate">
                    <div class="invalid-feedback">
                        {{errors.password}}
                    </div>
                </div>
            </div>
            <button class="btn btn-lg btn-primary" type="submit">Sign In</button>
        </form>
        <router-link :to="{name: 'SignUpView'}">
            <a href="">Create an account</a>
        </router-link>
    </div>
</template>
<script>
import axios from 'axios';
import sweetalert from 'sweetalert';
export default {
    name: "LoginView",
    props: ["baseURL"],
    data() {
        return {
            email: null,
            password: null,
            errors: {
                email: '',
                password: '',
            }
        };
    },
    methods: {
        validate() {
            let isValid = true
            this.errors = {
                email: '',
                password: ''
            }

            if (!this.email) {
                this.errors.email = "Please enter your email"
                isValid = false
            }
            else if (!this.isEmail(this.email)) {
                this.errors.email = "This is not a valid email"
                isValid = false
            }
            if (!this.password) {
                this.errors.password = "Please provide a password"
                isValid = false
            }

            return isValid
        },
        isEmail(value) {
            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
        },
        signin() {
            if (this.validate()) {
                let user = {
                    email: this.email,
                    password: this.password
                }

                axios.post(`${this.baseURL}user/signin`, user).then((res) => {
                    localStorage.setItem("token", res.data.token)
                    this.$router.push({ name: 'HomeView' });
                    sweetalert({
                        text: 'Login Success',
                        icon: 'success'
                    })
                }).catch(err => {
                    sweetalert({
                        text: 'Something is wrong',
                        icon: 'error'
                    })
                    console.log(err)
                })
            }
        }
    }
}
</script>
<style>
.login-form {
    margin-bottom: 1rem;
    background-color: rgb(242, 242, 242);
    padding: 1rem;
    border-radius: 20px;
    box-shadow: 3px 3px 10px 3px #c9c9c9;
}
</style>