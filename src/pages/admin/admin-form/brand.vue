<script setup>
import { getUpgradeForm, processForm } from '@/services/axios/api/api';
import { reactive } from 'vue';
import { useToastStore } from '@/stores/toast';


const toast = useToastStore()
const data = reactive([])

getUpgradeForm().then(res => {
    res.data.data.forEach(item => {
        data.push(item)
    })
}).catch(err => {
    console.log(err);
})


const handleProcessForm = (action, formId, index, active) => {
    processForm({ action: action, formId: formId }).then(res => {
        console.log(res);
        data.splice(index, 1);
        toast.openToast("Hành động thành công!")
    }).catch(err => {
        console.log(err);
        toast.openToast("Có lỗi xảy ra!")
    })

}
</script>

<template>
    <div class="ma-2">


        <VTable>
            <thead>
                <tr>
                    <th class="text-uppercase">
                        Người dùng
                    </th>
                    <th class="text-uppercase">
                        Email
                    </th>
                    <th class="text-uppercase">
                        Số điện thoại
                    </th>
                    <th class="text-uppercase">
                        Thương hiệu
                    </th>
                    <th class="text-uppercase">
                        Level
                    </th>
                    <th class="text-uppercase text-center">

                    </th>
                </tr>
            </thead>

            <tbody id="brand-table">
                <tr v-for=" (item, index) in data">
                    <td>
                        <span>{{ item.userName }}</span>
                    </td>
                    <td>
                        <span>{{ item.email }}</span>
                    </td>
                    <td>
                        <span>{{ item.numberPhone }}</span>
                    </td>
                    <td>
                        <span>{{ item.brandName }}</span>
                    </td>
                    <td>
                        <span>{{ item.level == 'trial' ? 'Thử nghiệm' : 'Nâng cao' }}</span>
                    </td>
                    <td class="text-center">
                        <div class="d-flex flex-row">

                            <v-dialog width="500">
                                <template v-slot:activator="{ props }">
                                    <VBtn v-bind="props" variant="text" color="error">DECLINE </VBtn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="Xác nhận">
                                        <v-card-text>
                                            Xác nhận
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn text="Đóng" @click="isActive.value = false"></v-btn>
                                            <v-btn variant="text" color="error" @click="() => {
                                                handleProcessForm('DENIED', item._id, index, isActive)
                                                isActive.value = false
                                            }">Từ
                                                chối</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                            <v-dialog width="500">
                                <template v-slot:activator="{ props }">
                                    <VBtn v-bind="props" variant="text">ACCEPT </VBtn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="Xác nhận">
                                        <v-card-text>
                                            Xác nhận
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn text="Đóng" @click="isActive.value = false"></v-btn>
                                            <v-btn variant="text" @click="() => {
                                                handleProcessForm('ACCEPT', item._id, index, isActive)
                                                isActive.value = false
                                            }">Xác nhận</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </div>
                    </td>
                </tr>
            </tbody>
        </VTable>
    </div>
</template>
