<script setup>
import { ref } from 'vue'
import RolesTable from '@/table/roles-table.vue'

const showAddCard = ref(false)

const comfirmAddRole = ref(false)


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


</script>

<template>
    <VRow class="row">
        <VCol cols="12" class="col">
            <VCard title="Danh sách ">
                <RolesTable :data="desserts" />
            </VCard>
        </VCol>
        <VCol cols="12">
            <VBtn id="add-role-btn" @click="showAddCard = true">Thêm quyền</VBtn>
        </VCol>

        <VCol v-if="showAddCard">
            <VCard title="THÊM QUYỀN" id="add-card">
                <VBtn id="close-btn" icon="mdi-close" @click="showAddCard = false"></VBtn>
                <VCol cols="12">
                    <VTextField label="Vai trò" />
                </VCol>

                <VCol>
                    <VRow>
                        <VCol cols="6">
                            <VCheckbox label="Admin" />
                        </VCol>
                        <VCol cols="6">
                            <VCheckbox label="Nhân viên chăm sóc khách hàng" />
                        </VCol>
                        <VCol cols="6">
                            <VCheckbox label="Nhân viên kho hàng" />
                        </VCol>
                    </VRow>
                </VCol>
                <VDivider />
                <VCol>
                    <VCheckbox v-model="comfirmAddRole" label="Xác nhận thêm" />
                    <VBtn :disabled="!comfirmAddRole">Thêm</VBtn>
                </VCol>
            </VCard>

        </VCol>

    </VRow>
</template>

<style lang="scss" scoped>
.row {
    display: flex;
    flex-direction: column;
}

#add-card {
    position: relative;
    display: flex;
    flex-direction: column;
}

#add-role-btn {
    width: 150px;
}

#close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
}
</style>
