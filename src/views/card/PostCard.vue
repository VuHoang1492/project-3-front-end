<script setup>
import { reactive } from 'vue';
import { deletePost } from '@/services/axios/api/api'
import { useToastStore } from '@/stores/toast';



const props = defineProps(['post'])
const toast = useToastStore()
const overlay = ref(false)
const imageInOverlay = reactive({ src: null, type: null, cur: null })

const handleClickImage = (media, index) => {
    imageInOverlay.src = media.src
    imageInOverlay.type = media.type
    imageInOverlay.cur = index
    overlay.value = !overlay.value

}

const clickCtrlLeft = () => {
    if (imageInOverlay.cur != 0) {
        let newIndex = imageInOverlay.cur - 1
        console.log(newIndex);
        imageInOverlay.cur = newIndex
        imageInOverlay.src = props.post.media[newIndex].src
        imageInOverlay.type = props.post.media[newIndex].type
    }
}

const clickCtrlRight = () => {
    if (imageInOverlay.cur != props.post.media.length - 1) {
        let newIndex = imageInOverlay.cur + 1
        console.log(newIndex);
        imageInOverlay.cur = newIndex
        imageInOverlay.src = props.post.media[newIndex].src
        imageInOverlay.type = props.post.media[newIndex].type
    }
}




const create = () => {
    const date = new Date(props.post.createdAt)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const handleDeletePost = () => {
    deletePost(props.post._id).then(res => {
        console.log(res);
        toast.openToast('Hành động thành công!!')
    }).catch(err => {
        console.log(err);
        toast.openToast('Có lỗi xảy ra!!')
    })
}

</script>

<template>
    <v-card class="post-card pt-8 pb-8  mb-8" variant="tonal">
        <v-card-text class="text-h5 font-weight-medium  pb-2" width="100%">
            {{ props.post.title }}
        </v-card-text>
        <v-card-text class="d-flex align-center gap-2 text-overline pb-2 ml-4"><v-icon icon="mdi-clock-outline"></v-icon>{{
            create()
        }}</v-card-text>
        <v-card-text class="description"> {{ props.post.description }}</v-card-text>

        <div class="media-file">
            <div class="media" v-for="media, index in props.post.media">
                <img v-if="media.type.includes('image')" v-on:click="(e) => {
                    handleClickImage(media, index)
                }" :src="media.src" />
                <video v-if="media.type.includes('video')" v-on:click="(e) => {
                    handleClickImage(media, index)
                }" cover :src="media.src"></video>
            </div>
        </div>
    </v-card>
    <div class="overlay" v-if="overlay" @click="(e) => {
        if (e.currentTarget == e.target)
            overlay = !overlay
    }">
        <img v-if="imageInOverlay.type.includes('image')" :src="imageInOverlay.src" class="img-overlay" />
        <video v-if="imageInOverlay.type.includes('video')" :src="imageInOverlay.src" controls="true"></video>
        <div class="control hover" id="left" @click="clickCtrlLeft"><v-icon icon="mdi-chevron-left"></v-icon></div>
        <div class="control hover" id="right" @click="clickCtrlRight"> <v-icon icon="mdi-chevron-right"></v-icon></div>
    </div>
</template>


<style lang="scss" >
.post-card {
    .description {
        text-indent: 30px;
    }

    .report-btn {
        height: 32px;
        min-width: 32px !important;
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 0;
    }


    .media-file {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .media {
            width: 100%;
            display: flex;
            margin: 4px 0;

            img {
                width: 80%;
                margin: auto;
                cursor: pointer;
            }

            video {
                width: 80%;
                margin: auto;
                cursor: pointer;
            }

        }
    }


}


.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #111;
    z-index: 100000;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;


    img {

        margin: auto;
        width: 50%;
    }

    video {

        margin: auto;
        width: 50%;
    }
}

.control {
    height: 100%;
    width: 100px;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;

    .v-icon {
        height: 64px;
        width: 64px;
        color: #f1f1f1;
    }

}

.hover:hover {
    cursor: pointer;
}

#left {
    left: 0;
}

#right {
    right: 0;
}
</style>