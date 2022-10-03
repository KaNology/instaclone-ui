<template>
    <div class="container" style="background-color: white;">
        <div class="row">
            <h2>New Post</h2>
        </div>
        <form action="">
            <div class="form-row mb-5">
                <div class="col-6">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" placeholder="Post Title">
                    </div>
                    <div class="input-group-prepend">
                        <label for="sharingmode">Sharing mode</label>
                    </div>
                    <select class="custom-select" id="sharingmode">
                        <option selected>Choose...</option>
                        <option>Public</option>
                        <option>Private</option>
                    </select>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>Description</label>
                        <textarea type="text" class="form-control" placeholder="Post Description"></textarea>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Photo/Video</label>

                <div class="row">
                    <div v-for="(image,key) in previewImages" :key="key" class="image-box col-3">
                        <img :src="image" class="image-preview">
                        <div class="image-layer">
                            <i @click="removeImage(image)" class="image-close bi bi-x-circle"></i>
                        </div>
                    </div>
                    <div class="col-3">
                        <label class="image-label" for="file">
                            <div class="image-icon">
                                <i class="bi bi-plus-circle"></i>
                            </div>
                        </label>
                        <input style="display: none;" @change="onFileChange" id="file" type="file" ref="uploadImage"
                            class="form-control" accept="image/png, image/jpeg, image/jpg" multiple>
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
export default {
    name: "CreatePostView",
    data() {
        return {
            id: null,
            previewImages: [],
            // active: false,
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
                reader.readAsDataURL(files[i])
            }
        },
        removeImage(object) {
            const filtersList = this.previewImages.filter(element => element !== object)
            this.previewImages = filtersList
        }
    },
    mounted() {
        this.id = this.$route.params.id;
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