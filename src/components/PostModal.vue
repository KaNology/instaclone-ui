<!-- https://codenotfound.dev/article/vuejs-building-popup-modal-with-slot -->
<template>
    <div class="popup-modal hide" ref="popupPost">
        <span @click="onClose" class="close">X</span>
        <div class="popup-modal__wrapper">
            <div v-if="post" class="post row">
                <div class="col-7">
                    <transition-group class="card-image-container" name="fade" tag="div">
                        <div v-for="i in [currentIndex]" :key="i">
                            <img style="object-fit: cover;"
                                :src="`data:image/png;base64,${post.files[currentIndex]}`" />
                        </div>
                    </transition-group>
                    <a v-if="currentIndex > 0" class="prev" @click="prev" href="#"><i
                            class="bi bi-caret-left-square-fill"></i></a>
                    <a v-if="currentIndex < post.files.length - 1" class="next" @click="next" href="#"><i
                            class="bi bi-caret-right-square-fill"></i></a>
                </div>
                <div class="col-5">
                    <div class="row">
                        User
                    </div>
                    <div class="row">
                        <h4>{{post.title}}</h4>
                    </div>
                    <div class="post-description row">
                        <p>{{post.description}}</p>
                    </div>
                    <div class="row mb-2">
                        <div>
                            <i @click="likePost(post.postId)" v-if="post.isLiked" class="bi bi-star-fill post-like"></i>
                            <i @click="likePost(post.postId)" v-else class="bi bi-star post-like"></i>
                        </div>
                        <div class="col-12 p-0">
                            {{post.numLikes}} Likes
                        </div>
                    </div>
                    <div class="row mb-2" v-for="(comment, index) in post.comments" :key="index">
                        <div class="comment-avatar col-1">
                            <img :src="`data:image/png;base64,${comment.userAvatar}`" />
                        </div>

                        <div class="col-11">
                            <div class="">
                                <span class="font-weight-bold">{{comment.userName}}</span>
                            </div>
                            <div class="comment-content">
                                <p class="mb-0">
                                    {{comment.content}}
                                </p>
                                1 like
                            </div>
                        </div>
                    </div>
                    <div class="comment-box input-group">
                        <textarea v-model="commentContent" class="form-control"
                            placeholder="Leave a comment..."></textarea>
                        <i @click="addComment(post.postId)" class="bi bi-chat-right-text-fill"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            post: null,
            currentIndex: 0,
            commentContent: null
        }
    },
    props: ["baseURL"],
    methods: {
        onClose() {
            this.hide();
            this.$emit("onClose");
        },
        show(postId) {
            this.getPost(postId);
            this.currentIndex = 0;
            this.$refs.popupPost.classList.remove("hide");
        },
        hide() {
            this.$refs.popupPost.classList.add("hide");
        },
        next() {
            if (this.currentIndex < this.post.files.length - 1) {
                this.currentIndex += 1;
            }
            else {
                this.currentIndex = 0;
            }
        },
        prev() {
            if (this.currentIndex > 0) {
                this.currentIndex -= 1;
            }
            else {
                this.currentIndex = this.post.files.length - 1;
            }
        },
        async getPost(postId) {
            await axios.get(`${this.baseURL}post/${postId}?token=${localStorage.getItem("token")}`).then(res => {
                this.post = res.data
            }).catch(err => {
                console.log(err)
            })
        },
        async addComment(postId) {
            await axios({
                method: 'post',
                url: `${this.baseURL}comment/create?token=${localStorage.getItem("token")}&postId=${postId}`,
                data: this.commentContent,
                headers: {
                    'Content-Type': 'text/plain'
                }
            }).then(() => {
                this.getPost(this.post.postId)
                this.commentContent = ''
            }).catch(err => {
                console.log(err)
            })
        },
        async likePost(postId) {
            await axios.post(`${this.baseURL}like/likePost?token=${localStorage.getItem("token")}&postId=${postId}`)
                .then(() => {
                    this.getPost(this.post.postId)
                }).catch(err => console.log(err))
        }
    }
}
</script>
<style lang="scss" scoped>
.popup-modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 99990;
    top: 0;
    left: 0;
    background-color: rgba($color: #000000, $alpha: .7);
    display: flex;
    justify-content: center;
    align-items: center;

    &.hide {
        display: none !important;
    }

    .close {
        position: fixed;
        top: 10px;
        right: 10px;
        padding: 6px;
        color: white;
        cursor: pointer;
    }

    &__wrapper {
        width: 65%;
        height: 90%;
        background-color: white;
        border-radius: 6px;

        .post {
            width: 100%;
            height: 100%;
        }
    }
}

// https://awik.io/fill-div-vertically-horizontally-centered-image-using-css/
.card-image-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: black;
}

.card-image-container img {
    height: 95%;
    min-width: 100%;
    position: absolute;
    top: -9999px;
    bottom: -9999px;
    left: -9999px;
    right: -9999px;
    margin: auto;
}

.prev,
.next {
    cursor: pointer;
    position: absolute;
    top: 45%;
    color: white;
    opacity: 70%;
    font-size: 1.2rem;
}

.next {
    right: 1.2rem;
}

.prev {
    left: 1.2rem;
}

.next:hover,
.prev:hover {
    opacity: 100%;
}

.comment-avatar {
    position: relative;

    img {
        width: 30px;
        height: 30px;
        object-fit: cover;
        border-radius: 50%;

        position: absolute;
        left: 0;
        top: 5px;
    }
}

.comment-content {
    width: 100%;
    word-break: break-all;
}

.comment-box {
    position: relative;

    i {
        position: absolute;
        bottom: 5px;
        right: 15px;
        color: dodgerblue;
        cursor: pointer;
        opacity: 0.5;
        z-index: 9999;
    }

    i:hover {
        opacity: 1;
    }

    textarea {
        display: block;
    }
}

.post-like {
    font-size: x-large;
    cursor: pointer;
    color: dodgerblue;
}

.post-description {
    word-break: break-all;
}
</style>