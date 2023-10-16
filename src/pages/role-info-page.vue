<script setup>

const comfirmSave = ref(false)

const comfirmDelete = ref(false)




</script>

<template>
    <VRow>
        <VCol>
            <VCard title="Roles" id="add-card">
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
                    <VCheckbox v-model="comfirmSave" label="Xác nhận lưu" />
                    <VBtn :disabled="!comfirmSave">Lưu thông tin</VBtn>
                </VCol>
                <VDivider />
                <VCol>
                    <VCheckbox v-model="comfirmDelete" label="Xác nhận xóa" color="error" />
                    <VBtn :disabled="!comfirmDelete" color="error">Xóa</VBtn>
                </VCol>
            </VCard>

        </VCol>
    </VRow>
</template>
