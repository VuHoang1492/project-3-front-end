<script setup>
import { getAllRestaurant, getPostByRestaurant } from '@/services/axios/api/api';
import PostCardManage from '@/views/card/PostCardManage.vue'
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToastStore } from '@/stores/toast';

const router = useRouter()
const toast = useToastStore()

const data = reactive([])
getAllRestaurant().then(res => {
    console.log(res);
    res.data.data.forEach(item => {
        data.push(item)
    })
    console.log(data);
}).catch(err => {
    console.log(err);
})

const restaurantId = ref(null)

const posts = reactive([])
const changeRestaurant = (restaurantId) => {

    getPostByRestaurant(restaurantId).then(res => {
        posts.splice(0)
        res.data.data.forEach(item => {
            posts.push(item)
        })
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

</script>

<template>
    <VRow class="d-flex">
        <div class="btn-control ">
            <v-tooltip text="Thêm bài cho cửa hàng hiện tại   " location="bottom">
                <template v-slot:activator="{ props }">
                    <VCard>
                        <VBtn v-bind="props" variant="text" color="primary" icon="mdi-note-plus-outline" @click="() => {
                            if (restaurantId == null) {
                                toast.openToast('Chưa chọn cửa hàng!!')
                                return
                            }
                            router.push(`post/create/${restaurantId}`)
                        }" />
                    </VCard>
                </template>
            </v-tooltip>
        </div>

        <VCol cols="9" class="ma-auto mt-8">
            <VRow>
                <VCol cols="6" class="ma-auto mb-8">
                    <v-select label="Chọn nhà hàng" :items="data" item-title="restaurantName" item-value="_id"
                        v-model="restaurantId" @update:modelValue="changeRestaurant"> </v-select>
                </VCol>
                <VCol cols="9" class="ml-auto mr-auto mb-8 d-flex flex-column">
                    <PostCardManage v-for="item in posts" :post="item"></PostCardManage>

                </VCol>

            </VRow>



        </VCol>
    </VRow>
</template>


<style scoped lang="scss">
.btn-control {
    position: fixed;
    right: 100px;
    top: 100px;

}
</style>