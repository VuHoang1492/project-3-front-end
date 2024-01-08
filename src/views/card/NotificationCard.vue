<script setup>
import { seenNoti } from '@/services/axios/api/api'
import { useNotificationStore } from '@/stores/notification';
const props = defineProps(['message', 'link', 'item_id'])


const notification = useNotificationStore()
const clickSeen = (id) => {
    seenNoti(id).then(res => {
        console.log(res);
        notification.decreaseCount()
    }).catch(err => {
        console.log(err);
    })

}
</script>

<template>
    <div class="notify-card">
        <div class="message">
            <span>
                {{ props.message }}
            </span>
        </div>
        <RouterLink :to="props.link" @click="clickSeen(props.item_id)">
            Xem
        </RouterLink>
    </div>
</template>

<style scoped>
.notify-card {
    height: 50px;
    margin: 16px;
    padding: 16px;
    border-bottom: 1px #9f9f9f solid;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>