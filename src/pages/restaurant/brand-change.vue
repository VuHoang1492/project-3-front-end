<script setup>
import { useUserStore } from '@/stores/user';
import { useToastStore } from '@/stores/toast';
import { changeBrand } from '@/services/axios/api/api'

const toast = useToastStore()
const userStore = useUserStore()
const newName = ref(userStore.user.brandName)


const handChangeBrand = () => {
    if (newName.value == userStore.user.brandName) {
        toast.openToast('Tên mới phải khác tên cũ!')
        return
    }
    if (!newName.value || !newName.value.length) {
        toast.openToast('Tên không hợp lệ!')
        return
    }

    changeBrand(newName.value).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })

}

</script>

<template>
    <VRow>
        <VCol cols="11" class="ml-16 mt-16">
            <VCard>


                <VCardText>
                    <!-- 👉 Form -->
                    <VForm class="mt-6">
                        <VRow>

                            <VCol cols="10">
                                <VTextField label="TÊN HIỆN TẠI" v-model="userStore.user.brandName" readonly />
                            </VCol>

                            <VCol cols="10">
                                <VTextField label="TÊN MỚI" v-model="newName" />
                            </VCol>


                            <VCol class="d-flex flex-column gap-4  v-col-12 v-col-sm-7">
                                <v-dialog width="500">
                                    <template v-slot:activator="{ props }">
                                        <VBtn class="w-50" v-bind="props">Lưu thay đổi </VBtn>
                                    </template>

                                    <template v-slot:default="{ isActive }">
                                        <v-card title="Xác nhận">
                                            <v-card-text>
                                                Xác nhận
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>

                                                <v-btn text="Đóng" @click="isActive.value = false"></v-btn>
                                                <v-btn text="Xác nhận" color="success" @click="() => {
                                                    handChangeBrand()
                                                    isActive.value = false
                                                }"></v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </template>
                                </v-dialog>
                                <VBtn class="w-50" color="error" @click="newName = userStore.user.brandName">Hủy</VBtn>

                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
