<script setup>
import NotificationCard from '@/views/card/NotificationCard.vue';
import { reactive } from 'vue';
import { getAllNotification } from '@/services/axios/api/api'

let data = reactive([])

getAllNotification().then(res => {

    res.data.data.forEach(item => {
        data.push(item)
    })
}).catch(err => {
    console.log(err);
})


const generateMessage = (data) => {
    if (data.type == 'UPGRADE') return `${data.email} muốn làm đối tác với Map Food`
    if (data.type == 'CREATE_RESTAURANT') return `${data.email} muốn tạo một cửa hàng`
    return 'Default Message'
}

const generateLink = (type) => {
    if (type == 'UPGRADE') return '/admin/forms#brand'
    if (type = 'UPGRADE') return '/admin/forms#restaurant'
    return 'Default Message'
}

</script>
<template>
    <VRow>
        <VCol cols="10" class="ml-16 mt-16">
            <VCard title="THÔNG BÁO" class="pb-16">
                <NotificationCard v-for="item in data" :message="generateMessage(item)" :link="generateLink(item.type)"
                    :item_id="item._id" />

            </VCard>
        </VCol>
    </VRow>
</template>