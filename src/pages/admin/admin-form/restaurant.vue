<script setup>
import { getConsiderRestaurantAdmin } from '@/services/axios/api/api';
import { reactive } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const data = reactive([])

getConsiderRestaurantAdmin().then(res => {
    console.log(res.data.data[0]);
    res.data.data.forEach(item => {
        data.push(item)
    })
}).catch(err => {
    console.log(err);
})

</script>

<template>
    <div class="ma-2">


        <VTable>
            <thead>
                <tr>
                    <th class="text-uppercase">
                        Người sở hữu
                    </th>
                    <th class="text-uppercase">
                        Email
                    </th>
                    <th class="text-uppercase">
                        Số điện thoại
                    </th>
                    <th class="text-uppercase text-center">
                        Cửa hàng
                    </th>
                    <th class="text-uppercase text-center">

                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in data">
                    <td>
                        {{ item.userId.userName }}
                    </td>
                    <td>
                        {{ item.userId.email }}
                    </td>
                    <td>
                        {{ item.userId.numberPhone }}
                    </td>
                    <td class="text-center">
                        {{ item.restaurantName }}
                    </td>
                    <td class="text-center">
                        <v-btn variant="text" @click="() => router.push(`/admin/forms/${item._id}/restaurant`)">
                            Xem</v-btn>
                    </td>
                </tr>
            </tbody>
        </VTable>
    </div>
</template>
