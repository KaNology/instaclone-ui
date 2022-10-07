<template>
  <div class="container" style="background-color: white;">
    <div class="row">
      <div v-for="post in posts" :key="post.postId" class="col-12 col-md-6">
        <div class="row">
          <div class="col-6 ">
            <div class="post-thumbnail">
              <img :src="`data:image/png;base64,${post.thumbnail}`" />
            </div>

          </div>
          <div class="col-6">
            <div class="row">
              <img class="user-avatar mr-2" :src="`data:image/png;base64,${post.userAvatar}`" />
              <div class="font-weight-bold" style="color: mediumblue;">{{post.userName}}</div>
            </div>
            <div class="row font-weight-bold">
              {{post.title}}
            </div>
            <div class="row" style="word-break: break-all;">
              {{post.description}}
            </div>
            <div class="row">
              <div class="post-like-box">
                <i @click="likePost(post.postId)" v-if="post.isLiked" class="bi bi-star-fill post-like"></i>
                <i @click="likePost(post.postId)" v-else class="bi bi-star post-like"></i>
                <span>{{post.numLikes}} Likes</span>
              </div>
              <div class="post-date">
                {{formatDate(post.createdDate)}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';
import moment from 'moment';

export default {
  name: 'HomeView',
  props: ["baseURL"],
  data() {
    return {
      posts: null
    }
  },
  methods: {
    async getPosts() {
      await axios.get(`${this.baseURL}post/?token=${localStorage.getItem("token")}`).then(res => {
        this.posts = res.data
      })
    },
    async likePost(postId) {
      await axios.post(`${this.baseURL}like/likePost?token=${localStorage.getItem("token")}&postId=${postId}`)
        .then(() => {
          this.getPosts(postId)
        }).catch(err => console.log(err))
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
    }
  },
  mounted() {
    this.getPosts()
  }
}
</script>
<style lang="scss" scoped>
.post-thumbnail {
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.user-avatar {
  display: block;
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}

.post-like-box {
  position: absolute;
  bottom: 10px;
}

.post-like {
  font-size: large;
  cursor: pointer;
  color: dodgerblue;
  margin-right: 5px;
}

.post-date {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
