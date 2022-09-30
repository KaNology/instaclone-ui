<template>
    <div class="row">
        <router-link class="offset-10 col-1" :to="{name: 'CreatePostView'}">
            <button type="button" class="btn btn-success">Add Post</button>
        </router-link>
    </div>
</template>
<script>
export default {
    name: "UserProfilePhoto"
}
</script>