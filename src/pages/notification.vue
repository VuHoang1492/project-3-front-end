<script setup>
import NotificationCard from '@/views/card/NotificationCard.vue';
</script>
<template>
    <VRow>
        <VCol cols="10" class="ml-16 mt-16">
            <VCard title="THÔNG BÁO" class="pb-16">
                <NotificationCard message="This is notification"></NotificationCard>
                <NotificationCard message="This is notification"></NotificationCard>
                <NotificationCard message="This is notification"></NotificationCard>
                <NotificationCard message="This is notification"></NotificationCard>
            </VCard>
        </VCol>
    </VRow>
</template>