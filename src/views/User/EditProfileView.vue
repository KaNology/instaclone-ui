<template>
    <div class="container" style="background-color: white;">
        <div class="row">
            <h2>Edit User Profile</h2>
        </div>
        <form v-if="user" @submit.prevent="editUser" enctype="multipart/form-data">
            <div class="form-row">
                <div class="form-group offset-4 col-4">
                    <label>Avatar</label>
                    <div>
                        <label class="avatar-label" for="file">
                            <img class="avatar" :src="`data:image/png;base64,${user.avatar}`">
                            <div class="avatar-icon">
                                <i class="bi bi-plus-circle"></i>
                            </div>
                        </label>

                        <input id="file" type="file" ref="uploadImage" class="avatar-input form-control"
                            accept="image/png, image/jpeg, image/jpg" @change="onFileChange"
                            v-bind:class="{'is-invalid': errors.avatar}" @blur="validate">
                        <div class="invalid-feedback">
                            {{errors.avatar}}
                        </div>
                    </div>
                </div>
            </div>
            <h3 class="row">Basic Information</h3>
            <div class="form-row">
                <div class="form-group offset-4 col-4">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="user.firstName"
                        v-bind:class="{'is-invalid': errors.firstName}" @blur="validate">
                    <div class="invalid-feedback">
                        {{errors.firstName}}
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group offset-4 col-4">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="user.lastName"
                        v-bind:class="{'is-invalid': errors.lastName}" @blur="validate">
                    <div class="invalid-feedback">
                        {{errors.lastName}}
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group offset-4 col-4">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="user.email"
                        v-bind:class="{'is-invalid': errors.email}" @blur="validate">
                    <div class="invalid-feedback">
                        {{errors.email}}
                    </div>
                </div>
            </div>
            <h3 class="row">Change Password</h3>
            <div class="form-row">
                <div class="form-group offset-4 col-4">
                    <label>Old Password</label>
                    <input type="password" class="form-control" v-model="oldPassword"
                        v-bind:class="{'is-invalid': errors.oldPassword}" @blur="validate">
                    <div class="invalid-feedback">
                        {{errors.oldPassword}}
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group offset-4 col-4">
                    <label>New Password</label>
                    <input type="password" class="form-control" v-model="newPassword"
                        v-bind:class="{'is-invalid': errors.newPassword}" @blur="validate">
                    <div class="invalid-feedback">
                        {{errors.newPassword}}
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group offset-4 col-4">
                    <label>New Password Confirmation</label>
                    <input type="password" class="form-control" v-model="passwordConf"
                        v-bind:class="{'is-invalid': errors.passwordConf}" @blur="validate">
                    <div class="invalid-feedback">
                        {{errors.passwordConf}}
                    </div>
                </div>
            </div>
            <div class="form-row">
                <button type="submit" class="btn btn-success offset-4 col-1">Create</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "EditProfileView",
    props: ["baseURL"],
    data() {
        return {
            userId: null,
            user: null,
            oldPassword: null,
            newPassword: null,
            passwordConf: null,
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                oldPassword: '',
                newPassword: '',
                passwordConf: ''
            }
        };
    },
    methods: {
        async editUser() {
            if (this.validate()) {
                const formData = new FormData();
                formData.append("avatar", this.user.avatar)
                formData.append("firstName", this.user.firstName)
                formData.append("lastName", this.user.lastName)
                formData.append("email", this.user.email)
                formData.append("oldPassword", this.oldPassword)
                formData.append("newPassword", this.newPassword)

                await axios.post(`${this.baseURL}user/profile/${this.userId}?token=${localStorage.getItem("token")}`, formData)
                    .then(res => console.log(res))
            }
        },
        onFileChange() {
            let files = this.$refs.uploadImage.files;
            if (!files.length)
                return;
            this.user.avatar = files[0];
        },
        validate() {
            let isValid = true
            this.errors = {
                avatar: '',
                firstName: '',
                lastName: '',
                email: '',
                oldPassword: '',
                newPassword: '',
                passwordConf: ''
            }
            if (!this.user.avatar) {
                this.errors.avatar = "Please provide an avatar"
                isValid = false
            }
            if (!this.user.firstName) {
                this.errors.firstName = "Please enter your first name"
                isValid = false
            }
            if (!this.user.lastName) {
                this.errors.lastName = "Please enter your last name"
                isValid = false
            }
            if (!this.user.email) {
                this.errors.email = "Please enter your email"
                isValid = false
            }
            else if (!this.isEmail(this.user.email)) {
                this.errors.email = "This is not a valid email"
                isValid = false
            }
            if (!this.oldPassword) {
                this.errors.oldPassword = "Please provide a password"
                isValid = false
            }
            if (!this.newPassword) {
                this.errors.newPassword = "Please provide a password"
                isValid = false
            }
            if (!this.passwordConf) {
                this.errors.passwordConf = "Please provide a password"
                isValid = false
            }
            else if (this.passwordConf !== this.newPassword) {
                this.errors.passwordConf = "Password does not match"
                isValid = false
            }

            return isValid
        },
        isEmail(value) {
            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
        },
        async getProfile() {
            await axios.get(`${this.baseURL}user/profile/${this.userId}`).then(res => {
                this.user = res.data
            })
        }
    },
    mounted() {
        this.userId = this.$route.params.id;
        this.getProfile()
    },
}
</script>
<style>
.avatar-label {
    position: relative;
}

.avatar {
    display: block;
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.avatar-icon {
    display: block;
    width: 200px;
    height: 200px;

    color: white;
    text-align: center;
    font-size: 125px;
    background-color: black;
    opacity: calc(50%);

    top: 0px;
    position: absolute;
}

.avatar-input {
    display: none;
}
</style>