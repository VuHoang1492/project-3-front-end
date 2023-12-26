<script setup>
import MapLeaf from '@/components/MapLeaf.vue';
import { computed } from 'vue';
import { reactive } from 'vue';
import { ref } from 'vue'


const rules = [
    value => {
        return !value || !value.length || value[0].size < 5000000 || 'Kích thước ảnh cần nhỏ hơn 5 MB!'
    },
]

const image = ref('')

const previewFiles = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    const theReader = new FileReader();

    theReader.onloadend = async () => {
        image.value = await theReader.result;
    };
    theReader.readAsDataURL(file);


}


const lat_lng = reactive({
    lat: null,
    lng: null,
    display_name: ''
})


const onClickMap = (e) => {
    console.log(e);
    lat_lng.lat = e.latlng.lat
    lat_lng.lng = e.latlng.lng
}

const locationString = computed(() => {
    if (lat_lng.lat == null || lat_lng.lng == null) return ""
    return `${lat_lng.lat}, ${lat_lng.lng}`
})



</script>

<template>
    <VRow class="d-flex">
        <VCol cols="11" class="ma-auto mt-2">
            <VCard>

                <VCardItem>
                    <VForm class="mt-4">
                        <VRow>
                            <VCol cols="12">
                                <VTextField label="THƯƠNG HIỆU" />
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Người Sở Hữu" disabled />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Email" disabled />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Số Điện Thoại" disabled />
                            </VCol>



                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>

                            <VCol cols="12">
                                <VTextField label="TÊN CỬA HÀNG" />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>



                            <VCol cols="5">
                                <v-text-field label="GIỜ MỞ CỬA" type="time"></v-text-field>
                            </VCol>
                            <VCol cols="5">
                                <v-text-field label="GIỜ ĐÓNG CỬA" type="time"></v-text-field>
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>


                            <VCol cols="12">
                                <div class="d-flex flex-row flex-wrap">
                                    <v-checkbox class="ml-6" label="Thứ Hai"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Ba"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Tư"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Năm"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Sáu"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Bảy"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Chủ Nhật"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Tất cả"></v-checkbox>
                                </div>

                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>



                            <VCol cols="12">
                                <VTextarea clearable no-resize rows="5" label="MÔ TẢ" />
                            </VCol>

                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>


                            <VCol cols="12">
                                <v-file-input class="w-50" :rules="rules" accept="image/png, image/jpeg, image/bmp"
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
                                <VTextField label="ĐỊA CHỈ" hint="Địa chỉ hiển thị trên app" />

                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>

                            <VCol cols="12" class="d-flex flex-column">
                                <v-checkbox class="m-4 w-25" color="error" label="Xác nhận tạo cửa hàng">

                                </v-checkbox>
                                <VBtn class="mt-4" width="100px" color="success">
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
