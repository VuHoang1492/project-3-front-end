<script setup>
import { deleteRestaurant, getConsiderRestaurant } from '@/services/axios/api/api';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const data = reactive([])

getConsiderRestaurant().then(res => {
    console.log(res);
    res.data.data.forEach(item => {
        data.push(item)
    })
}).catch(err => {
    console.log(err);
})


const handleDelete = (id) => {
    deleteRestaurant(id).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}
</script>

<template>
    <div class="ma-16">


        <VTable>
            <thead>
                <tr>
                    <th class="text-uppercase ">
                        Tên cửa hàng
                    </th>
                    <th class="text-uppercase text-center">

                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in data" :key="item._id">
                    <td>
                        {{ item.restaurantName }}
                    </td>
                    <td class="text-center">
                        <div class="d-flex flex-row justify-center">

                            <v-dialog width="500">
                                <template v-slot:activator="{ props }">
                                    <VBtn v-bind="props" variant="text" color="error">Xóa </VBtn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="Xác nhận">
                                        <v-card-text>
                                            Xác nhận xóa
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn text="Đóng" @click="isActive.value = false"></v-btn>
                                            <v-btn variant="text" color="error" @click="handleDelete(item._id)">Xóa</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                            <v-btn variant="text" @click="() => router.push(`/owner/manage-restaurant/${item._id}`)">Chỉnh
                                sửa</v-btn>
                        </div>
                    </td>
                </tr>
            </tbody>
        </VTable>
    </div>
</template>
