<script setup>
import MapLeaf from '@/components/MapLeaf.vue';
import { getRestaurantByIdForAdmin, processRestaurant } from '@/services/axios/api/api';
import { reactive } from 'vue';

import { useToastStore } from '@/stores/toast';
import { useRoute } from 'vue-router';


const route = useRoute()

const toast = useToastStore()


const data = reactive({
    restaurantName: null,
    description: null,
    open: null,
    close: null,
    user: { userName: null, brandName: null, numberPhone: null, email: null },
    inWeek: [],
    lat: null,
    lng: null,
    image: null,
    displayName: null,
})

let init_point = reactive({ lat: null, lng: null })

getRestaurantByIdForAdmin(route.params.restaurantId).then(res => {
    console.log(res);
    data.restaurantName = res.data.data.restaurantName
    data.description = res.data.data.description
    data.open = res.data.data.open
    data.close = res.data.data.close

    data.user = res.data.data.userId

    console.log(data.user.userName);

    data.lat = res.data.data.lat
    data.lng = res.data.data.lng
    data.displayName = res.data.data.displayName
    data.inWeek = res.data.data.inWeek.split(',')


    data.image = res.data.data.thumbnail

    init_point.lat = data.lat
    init_point.lng = data.lng
}).catch(err => {
    console.log(err);
})

const handleProcess = (action, restaurantId) => {
    processRestaurant({ action: action, restaurantId: restaurantId })
        .then(res => { console.log(res); })
        .catch(err => { console.log(err); })
}

const locationString = computed(() => {
    if (data.lat == null || data.lng == null) return ""
    return `${data.lat}, ${data.lng}`
})
</script>

<template>
    <VRow>
        <VCol cols="11" class="ml-16 mt-16">
            <VCard>

                <VCardItem>
                    <VForm class="mt-4">
                        <VRow>
                            <VCol cols="12">
                                <VTextField label="Người Sở Hữu" readonly v-model="data.user.userName" />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Email" readonly v-model="data.user.email" />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Số Điện Thoại" readonly v-model="data.user.numberPhone" />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Thương Hiệu" readonly v-model="data.user.brandName" />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Tên Cửa Hàng" readonly v-model="data.restaurantName" />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>



                            <VCol cols="5">
                                <v-text-field label="GIỜ MỞ CỬA" type="time" readonly v-model="data.open"></v-text-field>
                            </VCol>
                            <VCol cols="5">
                                <v-text-field label="GIỜ ĐÓNG CỬA" type="time" readonly v-model="data.close"></v-text-field>
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>


                            <VCol cols="12">
                                <div class="d-flex flex-row flex-wrap">
                                    <v-checkbox class="ml-6" label="Thứ Hai" readonly value="Monday"
                                        v-model="data.inWeek"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Ba" readonly value="Tuesday"
                                        v-model="data.inWeek"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Tư" readonly value="Wednesday"
                                        v-model="data.inWeek"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Năm" readonly value="Thursday"
                                        v-model="data.inWeek"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Sáu" readonly value="Friday"
                                        v-model="data.inWeek"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Bảy" readonly value="Saturday"
                                        v-model="data.inWeek"></v-checkbox>
                                    <v-checkbox class="ml-6" label="Chủ Nhật" readonly value="Sunday"
                                        v-model="data.inWeek"></v-checkbox>
                                </div>

                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>



                            <VCol cols="12">
                                <VTextarea clearable no-resize rows="5" label="MÔ TẢ" readonly v-model="data.description" />
                            </VCol>

                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>




                            <VCol cols="12">
                                <v-img class="ma-auto" :width="300" aspect-ratio="16/9" cover :src="data.image" />
                            </VCol>

                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>



                            <VCol cols="6">
                                <VTextField label="TỌA ĐỘ" readonly v-model="locationString" />

                            </VCol>
                            <VCol cols="6">
                                <VTextField label="ĐỊA CHỈ" readonly v-model="data.displayName" />

                            </VCol>
                            <VCol cols="12">
                                <div style="height: 500px;" v-if="init_point.lat != null && init_point.lng != null">
                                    <MapLeaf :allow_click_map="false" :geocoder="false" :init_point="init_point" />
                                </div>
                            </VCol>

                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>

                            <VCol cols="12" class="d-flex flex-column">

                                <div class="d-flex flex-row mt-4">
                                    <v-dialog width="500">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" variant="text" color="success">Chấp nhận </v-btn>
                                        </template>

                                        <template v-slot:default="{ isActive }">
                                            <v-card title="Xác nhận">
                                                <v-card-text>
                                                    Xác nhận
                                                </v-card-text>

                                                <v-card-actions>
                                                    <v-spacer></v-spacer>

                                                    <v-btn text="Đóng" @click="isActive.value = false"></v-btn>
                                                    <VBtn class="mr-4" variant="text" width="100px" color="success" @click="() => {
                                                        isActive.value = false
                                                        handleProcess('ACCEPT', route.params.restaurantId)
                                                    }">
                                                        Xác nhận
                                                    </VBtn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>

                                    <v-dialog width="500">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" variant="text" color="error">Từ chối </v-btn>
                                        </template>

                                        <template v-slot:default="{ isActive }">
                                            <v-card title="Xác nhận">
                                                <v-card-text>
                                                    Từ chối
                                                </v-card-text>

                                                <v-card-actions>
                                                    <v-spacer></v-spacer>

                                                    <v-btn text="Đóng" @click="isActive.value = false"></v-btn>
                                                    <v-btn class="mr-4" variant="text" width="100px" color="error" @click="() => {
                                                        isActive.value = false
                                                        handleProcess('DENIED', route.params.restaurantId)
                                                    }">
                                                        Từ chối
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>


                                </div>

                            </VCol>
                        </VRow>
                    </VForm>
                </VCardItem>
            </VCard>
        </VCol>
    </VRow>
</template>
