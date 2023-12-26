<script setup>
const props = defineProps(['message'])
</script>

<template>
    <div class="notify-card">
        <div class="message">
            <span>
                {{ props.message }}
            </span>
        </div>
        <a>
            Click here
        </a>
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