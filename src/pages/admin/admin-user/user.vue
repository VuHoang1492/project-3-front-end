<script setup>

</script>

<template>
    <div class="d-flex flex-column">
        <div class="d-flex flex-column mt-4 mb-4">
            <div class="d-flex flex-row  w-50 mb-4">
                <v-text-field variant="underlined" class=" mr-8" clearable outlined dense label="Người dùng"></v-text-field>
                <v-select variant="underlined" class=" mr-8" label="Phân loại"
                    :items="['Tất cả', ' Người dùng', 'Chủ nhà hàng']">
                </v-select>
            </div>

            <div class=" w-50">
                <v-btn>Tìm kiếm</v-btn>
            </div>
        </div>

        <VTable>
            <thead>
                <tr>
                    <th class="text-uppercase">
                        Người dùng
                    </th>
                    <th class="text-uppercase text-center">
                        Vai trò
                    </th>
                    <th class="text-uppercase text-center">
                        Tình trạng
                    </th>
                </tr>
            </thead>

            <tbody>
                <!-- <tr v-for="item in desserts" :key="item.dessert">
                <td>
                    {{ item.dessert }}
                </td>
                <td class="text-center">
                    {{ item.calories }}
                </td>
                <td class="text-center">
                    {{ item.fat }}
                </td>
                <td class="text-center">
                    {{ item.carbs }}
                </td>
                <td class="text-center">
                    {{ item.protein }}
                </td>
            </tr> -->
            </tbody>
        </VTable>
    </div>
</template>
