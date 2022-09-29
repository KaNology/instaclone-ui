<template>
    <div class="container">
        <h1 class="mb-4">Instaclone Login</h1>
        <form @submit.prevent="signup" class="signup-form offset-md-3 col-md-6">
            <div class="form-group row">
                <div class="offset-md-1 col-md-10">
                    <input type="text" class="form-control" placeholder="First Name" v-model="firstName"
                        v-bind:class="{'is-invalid': errors.firstName}" @blur="validate">
                    <div class="invalid-feedback">
                        {{errors.firstName}}
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="offset-md-1 col-md-10">
                    <input type="text" class="form-control" placeholder="Last Name" v-model="lastName"
                        v-bind:class="{'is-invalid': errors.lastName}" @blur="validate">
                    <div class="invalid-feedback">
                        {{errors.lastName}}
                    </div>
                </div>
            </div>
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
            <div class="form-group row">
                <div class="offset-md-1 col-md-10">
                    <input type="password" class="form-control" placeholder="Password Confirmation"
                        v-model="passwordConf" v-bind:class="{'is-invalid': errors.passwordConf}" @blur="validate">
                    <div class="invalid-feedback">
                        {{errors.passwordConf}}
                    </div>
                </div>
            </div>
            <button class="btn btn-lg btn-primary" type="submit">Sign Up</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import sweetalert from 'sweetalert';
export default {
    name: "SignUpView",
    props: ["baseURL"],
    data() {
        return {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            passwordConf: null,
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordConf: ''
            }
        };
    },
    methods: {
        validate() {
            let isValid = true
            this.errors = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordConf: ''
            }

            if (!this.firstName) {
                this.errors.firstName = "Please enter your first name"
                isValid = false
            }
            if (!this.lastName) {
                this.errors.lastName = "Please enter your last name"
                isValid = false
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
            if (!this.passwordConf) {
                this.errors.passwordConf = "Please provide a password"
                isValid = false
            }
            if (this.passwordConf !== this.password) {
                this.errors.passwordConf = "Password does not match"
                isValid = false
            }

            return isValid
        },
        isEmail(value) {
            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
        },
        signup() {
            if (this.validate()) {
                let newAccount = {
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    password: this.password
                }
                console.log(`${this.baseURL}user/signup`)

                axios.post(`${this.baseURL}user/signup`, newAccount).then(() => {
                    this.$router.push({ name: 'LoginView' });
                    sweetalert({
                        text: 'Registration Success',
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
.signup-form {
    margin-bottom: 1rem;
    background-color: rgb(242, 242, 242);
    padding: 1rem;
    border-radius: 20px;
    box-shadow: 3px 3px 10px 3px #c9c9c9;
}
</style>