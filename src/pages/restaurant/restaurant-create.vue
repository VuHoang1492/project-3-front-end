<script setup>
import MapLeaf from '@/components/MapLeaf.vue';
import { computed, reactive, ref } from 'vue';
import { createRestaurant } from '@/services/axios/api/api'
import { useToastStore } from '@/stores/toast';

const toast = useToastStore()

const loading = ref(false)

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
    loading.value = true
    const formData = new FormData()
    formData.append("restaurantName", data.restaurantName)
    formData.append("description", data.description)
    formData.append("open", data.open)
    formData.append("close", data.close)
    formData.append("inWeek", data.inWeek)

    formData.append("displayName", data.displayName)
    formData.append("lat", data.lat)
    formData.append("lng", data.lng)

    formData.append("thumbnail", data.image)

    createRestaurant(formData).then(res => {
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
    <VRow>
        <VCol cols="11" class="ml-16 mt-16">
            <VCard>

                <VCardItem>
                    <VForm class="mt-4">
                        <VRow>
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
    </VRow>Row>
</template>
