<script setup>
import { getAllBrand, getAllRestaurantOfOnwer } from '@/services/axios/api/api';
import { watch } from 'vue';

const loadBrand = ref(true)
getAllBrand().then(res => {

    res.data.data.forEach(item => {
        brands.push(item)
    })

    console.log(brands);
}).catch(err => {
    console.log(err);
}).finally(() => loadBrand.value = false)

const chosseBrand = (e) => {
    curBrand.email = e.email
    curBrand.brandName = e.brandName
    curBrand.userName = e.userName
    curBrand.id = e._id
    curBrand.numberPhone = e.numberPhone
}

let curBrand = reactive({
    brandName: null,
    userName: null,
    id: null,
    email: null,
    numberPhone: null

})

const data = []
watch(curBrand, () => {
    getAllRestaurantOfOnwer(curBrand.id).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
})

const brands = reactive([])

const customFilter = (itemTitle, queryText, item) => {
    const textOne = item.raw.brandName.toLowerCase()
    const textTwo = item.raw._id.toLowerCase()
    const searchText = queryText.toLowerCase()
    return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
}
</script>

<template>
    <div class="d-flex flex-column">
        <div class="d-flex flex-column mt-4 mb-4">
            <div class="d-flex flex-row  w-50 mb-4">

                <v-autocomplete variant="underlined" :loading="loadBrand" :items="brands" :custom-filter="customFilter"
                    item-title="brandName" item-value="_id" return-object @update:model-value="chosseBrand"
                    label="Thương hiệu"></v-autocomplete>
            </div>

            <div class=" w-50">
                <v-btn>Tìm kiếm</v-btn>
            </div>
        </div>

        <VTable>
            <thead>
                <tr>
                    <th class="text-uppercase">
                        Nhà hàng
                    </th>
                    <th class="text-uppercase text-center">
                        Chủ sở hữu
                    </th>
                    <th class="text-uppercase text-center">

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
