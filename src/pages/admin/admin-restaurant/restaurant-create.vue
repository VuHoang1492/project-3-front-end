<script setup>
import MapLeaf from '@/components/MapLeaf.vue';
import { computed } from 'vue';
import { reactive } from 'vue';
import { ref } from 'vue'
import { getAllBrand, adminCreateRestaurant } from '@/services/axios/api/api'

import { useToastStore } from '@/stores/toast';

const toast = useToastStore()

const rules = [
    value => {
        return !value || !value.length || value[0].size < 5000000 || 'Kích thước ảnh cần nhỏ hơn 5 MB!'
    },
]

const image = ref('')

const previewFiles = (event) => {

    const file = event.target.files[0];
    data.image = file
    const theReader = new FileReader();

    theReader.onloadend = async () => {
        image.value = await theReader.result;
    };
    theReader.readAsDataURL(file);


}




const onClickMap = (e) => {
    console.log(e);
    data.lat = e.latlng.lat
    data.lng = e.latlng.lng
}

const locationString = computed(() => {
    if (data.lat == null || data.lng == null) return ""
    return `${data.lat}, ${data.lng}`
})



const loadBrand = ref(true)
getAllBrand().then(res => {

    res.data.data.forEach(item => {
        brands.push(item)
    })

    console.log(brands);
}).catch(err => {
    console.log(err);
}).finally(() => loadBrand.value = false)


const brands = reactive([])

const customFilter = (itemTitle, queryText, item) => {
    const textOne = item.raw.brandName.toLowerCase()
    const textTwo = item.raw._id.toLowerCase()
    const searchText = queryText.toLowerCase()
    return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
}


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



const loading = ref(false)

const data = reactive({
    restaurantName: null,
    description: null,
    open: null,
    close: null,
    inWeek: [],
    lat: null,
    lng: null,
    image: null,
    displayName: null,
})


let confirmSubmit = ref(false)

const handleSubmit = () => {
    console.log(data);
    loading.value = true
    const formData = new FormData()
    formData.append("userId", curBrand.id)
    formData.append("restaurantName", data.restaurantName)
    formData.append("description", data.description)
    formData.append("open", data.open)
    formData.append("close", data.close)
    formData.append("inWeek", data.inWeek)

    formData.append("displayName", data.displayName)
    formData.append("lat", data.lat)
    formData.append("lng", data.lng)

    formData.append("thumbnail", data.image)
    for (let pair of formData) {
        console.log(pair[1], pair[0]);
    }
    adminCreateRestaurant(formData).then(res => {
        console.log(res);
        toast.openToast('Yêu cầu của bạn đã được gửi tới Admin')
        loading.value = false
    }).catch(err => {
        console.log(err);
        toast.openToast('Có lỗi xảy ra!!')
        loading.value = false
    })
}



</script>

<template>
    <VRow class="d-flex">
        <VCol cols="11" class="ma-auto mt-2">
            <VCard>

                <VCardItem>
                    <VForm class="mt-4">
                        <VRow>
                            <VCol cols="12">
                                <v-autocomplete :loading="loadBrand" :items="brands" :custom-filter="customFilter"
                                    item-title="brandName" item-value="_id" return-object
                                    @update:model-value="chosseBrand"></v-autocomplete>
                            </VCol>

                            <VCol cols="12">
                                <VTextField label="Người Sở Hữu" readonly v-model="curBrand.userName" />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Email" readonly v-model="curBrand.email" />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Số Điện Thoại" readonly v-model="curBrand.numberPhone" />
                            </VCol>



                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>

                            <VCol cols="12">
                                <VTextField label="TÊN CỬA HÀNG" v-model="data.restaurantName" />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>



                            <VCol cols="5">
                                <v-text-field label="GIỜ MỞ CỬA" type="time" v-model="data.open"></v-text-field>
                            </VCol>
                            <VCol cols="5">
                                <v-text-field label="GIỜ ĐÓNG CỬA" type="time" v-model="data.close"></v-text-field>
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>


                            <VCol cols="12">
                                <div class="d-flex flex-row flex-wrap">
                                    <v-checkbox class="ml-6" label="Thứ Hai" value="Monday"
                                        v-model="data.inWeek"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Ba" value="Tuesday"
                                        v-model="data.inWeek"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Tư" value="Wednesday"
                                        v-model="data.inWeek"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Năm" value="Thursday"
                                        v-model="data.inWeek"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Sáu" value="Friday"
                                        v-model="data.inWeek"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Bảy" value="Saturday"
                                        v-model="data.inWeek"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Chủ Nhật" value="Sunday"
                                        v-model="data.inWeek"></v-checkbox>
                                </div>

                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>



                            <VCol cols="12">
                                <VTextarea clearable no-resize rows="5" label="MÔ TẢ" v-model="data.description" />
                            </VCol>

                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>


                            <VCol cols="12">
                                <v-file-input class="w-50" :rules="rules" accept="image/png, image/jpg"
                                    placeholder="Thumbnail" prepend-icon="mdi-camera" label="Thumbnail"
                                    @change="previewFiles($event)" @click:clear="() => {
                                        image = ''
                                    }"></v-file-input>
                            </VCol>

                            <VCol cols="12" v-if="image !== ''">
                                <v-img class="ma-auto" :width="300" aspect-ratio="16/9" cover :src="image" />

                            </VCol>

                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>





                            <VCol cols="12">


                                <div style="height: 500px;">
                                    <MapLeaf :_click_map="onClickMap" />

                                </div>
                            </VCol>
                            <VCol cols="6">
                                <VTextField label="TỌA ĐỘ" disabled v-model="locationString" />

                            </VCol>
                            <VCol cols="6">
                                <VTextField label="ĐỊA CHỈ" hint="Địa chỉ hiển thị trên app" v-model="data.displayName" />

                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>

                            <VCol cols="12" class="d-flex flex-column">
                                <v-checkbox class="m-4 w-25" color="error" label="Xác nhận tạo cửa hàng"
                                    v-model="confirmSubmit">

                                </v-checkbox>
                                <VBtn :loading="loading" class="mt-4" width="100px" color="success"
                                    :disabled="!confirmSubmit" @click="handleSubmit">
                                    Tạo
                                </VBtn>

                            </VCol>
                        </VRow>
                    </VForm>
                </VCardItem>
            </VCard>
        </VCol>
    </VRow>
</template>
