<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const reports = [
    {
        user: 'Frozen Yogurt',
        reporter: 159,
        reason: 6,

    },
    {
        user: 'Ice cream sandwich',
        reporter: 237,
        reason: 6,

    },
    {
        user: 'Eclair',
        reporter: 262,
        reason: 6,

    },
    {
        user: 'Cupcake',
        reporter: 305,
        reason: 6,

    },
    {
        user: 'Gingerbread',
        reporter: 356,
        reason: 6,

    },
]
</script>

<template>
    <VTable>
        <thead>
            <tr>
                <th class="text-uppercase">
                    Người dùng
                </th>
                <th class="text-uppercase text-center">
                    Người tố cáo
                </th>
                <th class="text-uppercase text-center">
                    Nguyên nhân
                </th>
                <th class="text-uppercase text-center">

                </th>

            </tr>
        </thead>

        <tbody>
            <tr v-for="item in reports" :key="item.user">
                <td>
                    {{ item.user }}
                </td>
                <td class="text-center">
                    {{ item.reporter }}
                </td>
                <td class="text-center">
                    <v-btn variant="text" @click="() => router.push(`/admin/forms/${item.user}/report`)">Xem</v-btn>
                </td>
                <td class="text-center">
                    <v-btn variant="text">Block</v-btn>
                </td>
            </tr>
        </tbody>
    </VTable>
</template>
