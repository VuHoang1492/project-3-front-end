<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

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
                <tr>
                    <td>
                        Nguyen Van A
                    </td>
                    <td>
                        User@gmail.com
                    </td>
                    <td>
                        012345678
                    </td>
                    <td class="text-center">
                        <v-btn variant="text" @click="() => router.push(`/admin/forms/123xz/restaurant`)"> ABCXYZ</v-btn>
                    </td>
                    <td class="text-center">
                        <div class="d-flex flex-row">
                            <v-btn variant="text" color="error">Từ chối</v-btn>
                            <v-btn variant="text">Xác nhận</v-btn>
                        </div>
                    </td>

                </tr>
            </tbody>
        </VTable>
    </div>
</template>
