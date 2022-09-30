<template>
    <div class="container" style="background-color: white;">
        <div class="row">
            <h2>New Photo</h2>
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
            <div class="form-row">
                <div class="form-group">
                    <label>Photo/Video</label>
                    <input type="file" class="form-control" accept="image/png, image/jpeg, image/jpg">
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
        };
    },
    mounted() {
        this.id = this.$route.params.id;
    },
    components: {}
}
</script>
<style>

</style>