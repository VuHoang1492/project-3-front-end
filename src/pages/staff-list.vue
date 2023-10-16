<script setup>
import { ref } from 'vue'
import StaffTable from '@/table/staff-list-table.vue'



let desserts = ref([
    {
        dessert: 'Frozen Yogurt',
        calories: 159,
        fat: 6,
        carbs: 24,
        protein: 4,
    },
    {
        dessert: 'Ice cream sandwich',
        calories: 237,
        fat: 6,
        carbs: 24,
        protein: 4,
    },
    {
        dessert: 'Eclair',
        calories: 262,
        fat: 6,
        carbs: 24,
        protein: 4,
    },
    {
        dessert: 'Cupcake',
        calories: 305,
        fat: 6,
        carbs: 24,
        protein: 4,
    },
    {
        dessert: 'Gingerbread',
        calories: 356,
        fat: 6,
        carbs: 24,
        protein: 4,
    },
])

const page = ref(1);
const pageCount = 4;

const clickNext = () => {
    desserts.value.pop()

}

</script>

<template>
    <VRow class="row">
        <VCol cols="12" class="col">
            <VCard title="Danh sách nhân viên">
                <StaffTable :desserts="desserts" />
            </VCard>
            <v-pagination v-model="page" :length="pageCount" v-on:update:model-value="clickNext"></v-pagination>
        </VCol>
    </VRow>
</template>

<style lang="scss" scoped>
.row {
    height: 100%;

    .col {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}
</style>
