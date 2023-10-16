<script setup>
const props = defineProps(['data'])

let data = props.data


</script>

<template>
    <VTable>
        <thead>
            <tr>
                <th class="text-uppercase">
                    Role
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in data" :key="item.dessert">
                <td>
                    <RouterLink :to="`/roles/${item.dessert}`">
                        {{ item.dessert }}
                    </RouterLink>
                </td>
            </tr>
        </tbody>
    </VTable>
</template>


