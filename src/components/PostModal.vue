<!-- https://codenotfound.dev/article/vuejs-building-popup-modal-with-slot -->
<template>
    <div class="popup-modal hide" ref="popupPost">
        <span @click="onClose" class="close">X</span>
        <div class="popup-modal__wrapper">
            <div v-if="content" class="content row">
                <div class="col-7">
                    <transition-group class="card-image-container" name="fade" tag="div">
                        <div v-for="i in [currentIndex]" :key="i">
                            <img :src="`data:image/png;base64,${content.files[currentIndex]}`" />
                        </div>
                    </transition-group>
                    <a v-if="currentIndex > 0" class="prev" @click="prev" href="#"><i
                            class="bi bi-caret-left-square-fill"></i></a>
                    <a v-if="currentIndex < content.files.length - 1" class="next" @click="next" href="#"><i
                            class="bi bi-caret-right-square-fill"></i></a>
                </div>
                <div class="col-5">
                    <div class="row">
                        User
                    </div>
                    <div class="row">
                        <h4>{{content.title}}</h4>
                    </div>
                    <div class="row">
                        <p>{{content.description}}</p>
                    </div>
                    <div class="row">
                        Comment Section
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            content: null,
            currentIndex: 0,
        }
    },
    methods: {
        onClose() {
            this.hide();
            this.$emit("onClose");
        },
        show(content) {
            this.content = content;
            this.currentIndex = 0;
            this.$refs.popupPost.classList.remove("hide");
        },
        hide() {
            this.$refs.popupPost.classList.add("hide");
        },
        next() {
            if (this.currentIndex < this.content.files.length - 1) {
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
                this.currentIndex = this.content.files.length - 1;
            }
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

        .content {
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
</style>