<script setup>
import { ref } from 'vue'
import PostCard from './PostCard.vue'
import ReviewCard from './ReviewCard.vue'
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'
import { followRestaurant, unfollowRestaurant, getPostByRestaurant, getReviewBrRestaurant } from '@/services/axios/api/api';
import { Roles } from '@/helpers/roles'


const props = defineProps(['restaurant'])
const router = useRouter()
const userStore = useUserStore()

const tab = ref(null)
const follow = ref(false)

const status = computed(() => {

    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = daysOfWeek[dayOfWeek];
    const inWeek = props.restaurant.inWeek.split(',')
    follow.value = props.restaurant.favorite
    const open = props.restaurant.open.split(':')
    const start = new Date()
    start.setHours(Number(open[0]), Number(open[1]), 0)

    const close = props.restaurant.close.split(':')
    const end = new Date()
    end.setHours(Number(close[0]), Number(close[1]), 0)

    if (end < start) end.setDate(now.getDate() + 1)

    if (start <= now && now <= end && inWeek.includes(today)) return 'Đang mở cửa'
    return 'Đang đóng cửa'

})


const handleFollow = (id) => {
    followRestaurant(id).then(res => {
        console.log(res);
        follow.value = true
    }).catch(err => {
        console.log(err);
    })
}

const handleUnfollow = (id) => {
    unfollowRestaurant(id).then(res => {
        console.log(res);
        follow.value = !follow.value
    }).catch(err => {
        console.log(err);
    })
}


const post = reactive([])
getPostByRestaurant(props.restaurant._id).then(res => {
    res.data.data.forEach(item => {
        post.push(item)
    })
    console.log(res);
}).catch(err => {
    console.log(err);
})

const review = reactive([])
getReviewBrRestaurant(props.restaurant._id).then(res => {
    res.data.data.forEach(item => {
        review.push(item)
    })
    console.log(review);
}).catch(err => {
    console.log(err);
})

</script>

<template>
    <v-card width="100%" variant="flat" class="main-card">
        <v-img :src="props.restaurant.thumbnail" aspect-ratio="16/9" cover>
        </v-img>
        <v-card-title class="text-h5" v-text="props.restaurant.restaurantName"></v-card-title>
        <v-rating class="ml-4" v-model="props.restaurant.rating" active-color="warning" color="warning" readonly
            empty-icon="mdi-star-outline" full-icon="mdi-star" half-increments :size="30" length="10"></v-rating>

        <v-card-text class="d-flex align-center gap-2 text-body-1">Thời gian: <v-icon icon="mdi-clock-outline"></v-icon>{{
            props.restaurant.open }} - <v-icon icon="mdi-clock-outline"></v-icon>{{ props.restaurant.close }}</v-card-text>
        <v-card-text class="d-flex align-center gap-2 text-body-1">Số điện thoại : {{ props.restaurant.userId.numberPhone
        }}</v-card-text>
        <v-card-text class="d-flex align-center text-body-1">Hiện tại : {{ status }}</v-card-text>
        <v-card-text class="d-flex align-center text-body-1">Địa chỉ : {{ props.restaurant.displayName }}</v-card-text>
        <v-divider></v-divider>
        <v-card-text class="text-body-1">{{ props.restaurant.description }}</v-card-text>
        <v-divider></v-divider>
        <div class="d-flex mt-2">
            <v-btn v-if="userStore.user.role !== Roles.GUEST && userStore.user.role !== Roles.ADMIN && !follow"
                class=" w-30 mb-2" variant="text" v-on:click="handleFollow(props.restaurant._id)">
                Follow
                <v-icon end icon="mdi-plus"></v-icon>
            </v-btn>
            <v-btn v-if="userStore.user.role !== Roles.GUEST && userStore.user.role !== Roles.ADMIN && follow"
                class=" w-30 mb-2" variant="text" v-on:click="handleUnfollow(props.restaurant._id)">
                Unfollow
                <v-icon end icon="mdi-heart" color="error"></v-icon>
            </v-btn>
            <v-btn v-if="userStore.user.role !== Roles.GUEST && userStore.user.role !== Roles.ADMIN" class="w-30 mb-2"
                variant="text" @click="() => { router.push(`/review/create/${props.restaurant._id}`) }">Đánh giá
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
                    <PostCard v-for="item in post" :post="item"></PostCard>
                </v-window-item>
                <v-window-item value="review">
                    <ReviewCard v-for="item in review" :review="item"></ReviewCard>
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