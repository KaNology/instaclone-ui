<template>
    <div class="container" style="background-color: white;">
        <div class="row">
            <h2>New Post</h2>
        </div>
        <form @submit.prevent="createPost" action="">
            <div class="form-row mb-5">
                <div class="col-6">
                    <div class="form-group">
                        <label>Title</label>
                        <input v-model="title" type="text" class="form-control" placeholder="Post Title"
                            v-bind:class="{'is-invalid': errors.title}" @blur="validate">
                        <div class="invalid-feedback">
                            {{errors.title}}
                        </div>
                    </div>
                    <div class="input-group-prepend">
                        <label for="sharingmode">Sharing mode</label>
                    </div>
                    <select v-model="isPrivate" class="custom-select" id="sharingmode"
                        v-bind:class="{'is-invalid': errors.isPrivate}" @blur="validate">
                        <option selected>Choose...</option>
                        <option :value="false">Public</option>
                        <option :value="true">Private</option>
                    </select>
                    <div class="invalid-feedback">
                        {{errors.isPrivate}}
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Description</label>
                        <textarea v-model="description" type="text" class="form-control" placeholder="Post Description"
                            v-bind:class="{'is-invalid': errors.description}" @blur="validate"></textarea>
                        <div class="invalid-feedback">
                            {{errors.description}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Photo/Video</label>

                <div class="row">
                    <div v-for="(image,key) in previewImages" :key="key" class="image-box col-3">
                        <img :src="image" class="image-preview">
                        <div class="image-layer">
                            <i @click="removeImage(key)" class="image-close bi bi-x-circle"></i>
                        </div>
                    </div>
                    <div class="col-3">
                        <label class="image-label" for="file">
                            <div class="image-icon">
                                <i class="bi bi-plus-circle"></i>
                            </div>
                        </label>
                        <input style="display: none;" @change="onFileChange" id="file" type="file" ref="uploadImage"
                            class="form-control" accept="image/png, image/jpeg, image/jpg" multiple
                            v-bind:class="{'is-invalid': errors.files}" @blur="validate">
                        <div class="invalid-feedback">
                            {{errors.files}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-row">
                <button type="submit" class="btn btn-success">Create</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import sweetalert from 'sweetalert';

export default {
    name: "CreatePostView",
    props: ["baseURL"],
    data() {
        return {
            userId: null,
            files: [],
            title: null,
            description: null,
            isPrivate: null,
            previewImages: [],
            errors: {
                files: null,
                title: null,
                description: null,
                isPrivate: null
            }
        };
    },
    methods: {
        onFileChange() {
            let files = this.$refs.uploadImage.files;
            if (!files.length)
                return;

            for (let i = 0; i < files.length; i++) {
                let reader = new FileReader
                reader.onload = e => {
                    this.previewImages.push(e.target.result)
                }
                this.files.push(files[i])
                reader.readAsDataURL(files[i])
            }
        },
        removeImage(index) {
            this.previewImages.splice(index, 1)
            this.files.splice(index, 1)
        },
        createPost() {
            if (this.validate()) {
                const formData = new FormData();
                formData.append("title", this.title)
                formData.append("description", this.description)
                formData.append("isPrivate", this.isPrivate)

                this.files.forEach(value => {
                    formData.append("files[]", value)
                })

                console.log(...formData)

                axios.post(`${this.baseURL}post/create?token=${localStorage.getItem("token")}`, formData).then(res => {
                    sweetalert({
                        text: 'Post successfully created',
                        icon: 'success'
                    })
                    console.log(res)
                }).catch(err => {
                    sweetalert({
                        text: 'Something\'s wrong',
                        icon: 'error'
                    })
                    console.log(err)
                })
            }
        },
        validate() {
            let isValid = true
            this.errors = {
                files: null,
                title: null,
                description: null,
                isPrivate: null
            }
            if (!this.title) {
                this.errors.title = "Please provide a title"
                isValid = false
            }
            if (!this.description) {
                this.errors.description = "Please write your description"
                isValid = false
            }
            if (!this.files || this.files.length < 1) {
                this.errors.files = "Please provide some images/videos"
                isValid = false
            }
            if (this.isPrivate === null) {
                this.errors.isPrivate = "Please choose the privacy settings"
                isValid = false
            }

            return isValid
        }
    },
    mounted() {
        this.userId = this.$route.params.id;
    },
    components: {}
}
</script>
<style>
.image-preview {
    width: 200px;
    height: 200px;
    display: block;
    margin: 10px 10px;
    object-fit: cover;
}

.image-layer {
    width: 200px;
    height: 200px;
    display: block;
    margin: 10px 10px;

    color: white;
    font-size: 30px;

    position: absolute;
    top: 0px;

    background-color: black;
    opacity: 0;
}

.image-box:hover>.image-layer {
    opacity: 0.5;
}

.image-close {
    position: absolute;
    right: 10px;

    cursor: pointer;
}

.image-icon {
    display: block;
    width: 200px;
    height: 200px;
    margin: 10px 10px;

    color: white;
    text-align: center;
    font-size: 125px;
    background-color: black;
    opacity: calc(50%);
}
</style>