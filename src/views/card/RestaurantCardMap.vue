<script setup>
import { ref } from 'vue'
import PostCard from './PostCard.vue'
import ReviewCard from './ReviewCard.vue'
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';



const props = defineProps(['restaurant'])
const router = useRouter()


const tab = ref(null)
const favorite = ref(false)
const setFavoriteIcon = computed(() => {
    return favorite.value ? 'mdi-heart-outline' : 'mdi-plus'
})



</script>

<template>
    <v-card width="100%" variant="flat" class="main-card">
        <v-img src="https://media.timeout.com/images/106000654/1920/1080/image.jpg" aspect-ratio="16/9" cover>
        </v-img>
        <v-card-title class="text-h5" v-text="props.restaurant.name"></v-card-title>
        <v-rating class="ml-4" v-model="props.restaurant.rating" active-color="warning" color="warning" readonly
            empty-icon="mdi-star-outline" full-icon="mdi-star" half-increments :size="30" length="10"></v-rating>

        <v-card-text>Description about restaurant</v-card-text>
        <div class="d-flex">
            <v-btn class=" w-30 mb-2" variant="text" v-on:click="() => favorite = !favorite">Theo dõi
                <v-icon end :icon="setFavoriteIcon"></v-icon>
            </v-btn>
            <v-btn class="w-30 mb-2" variant="text" @click="() => { router.push('/review/create/restaurantId') }">Đánh giá
                <v-icon end icon="mdi-pencil"></v-icon>
            </v-btn>
            <v-btn class="w-30 mb-2" variant="text" @click="$emit('onDirect')">Chỉ đường
                <v-icon end icon="mdi-directions"></v-icon>
            </v-btn>
        </div>
        <v-divider></v-divider>
        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="left">
            <v-tab value="post">Post</v-tab>
            <v-tab value="review">Review</v-tab>
        </v-tabs>
        <v-card-item>
            <v-window v-model="tab">
                <v-window-item value="post">
                    <PostCard></PostCard>
                    <PostCard></PostCard>
                    <PostCard></PostCard>
                </v-window-item>
                <v-window-item value="review">
                    <ReviewCard></ReviewCard>
                    <ReviewCard></ReviewCard>
                    <ReviewCard></ReviewCard>
                </v-window-item>
            </v-window>
        </v-card-item>
    </v-card>
</template>

<style lang="scss" scoped>
.main-card {
    overflow-y: auto;
    position: relative;

    &::-webkit-scrollbar {
        width: 6px;
        background-color: #F5F5F5;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #312d4b;
    }

}
</style>