<script setup>
import { reactive, ref } from 'vue';
import { useToastStore } from '@/stores/toast';
import { useRoute } from 'vue-router';
import { createReview } from '@/services/axios/api/api'

const route = useRoute()
const toast = useToastStore()
const rules = [
    value => {
        let size = 0
        value.forEach(file => {
            size += file.size
        })
        return !value || !value.length || size < 5000000 || 'File upload nhỏ hơn 5 MB!'
    },
]

const images = reactive([])


const previewFiles = (event) => {

    images.splice(0)
    const files = event.target.files
    data.media = files

    Array.from(files).forEach(file => {

        const theReader = new FileReader();
        theReader.onloadend = async () => {
            images.push({
                name: file.name,
                type: file.type,
                src: await theReader.result

            })
        };

        theReader.readAsDataURL(file);

    });

}



const confirm = ref(true)
const loading = ref(false)
const data = reactive({
    description: null,
    rating: 0,
    media: null,
})

const handleUpload = () => {
    loading.value = true
    if (data.description == null) {
        toast.openToast('Chưa điền đủ thông tin!')
        return
    }

    const formData = new FormData()
    formData.append('restaurant', route.params.restaurantId)
    formData.append('description', data.description)
    formData.append('rating', data.rating)

    for (let i = 0; i < data.media.length; i++) {
        formData.append("media", data.media[i]);
    }

    createReview(formData).then(res => {
        console.log(res);
        toast.openToast('Hành động thành công!!')
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
                                <VTextarea clearable no-resize rows="5" label="Bạn đang nghĩ gì?"
                                    v-model="data.description" />
                            </VCol>

                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>

                            <VCol cols="12" class="d-flex flex-row align-center">
                                <span>Đánh giá: </span> <v-rating class="ml-4" active-color="warning" color="warning"
                                    empty-icon="mdi-star-outline" full-icon="mdi-star" half-increments hover :size="30"
                                    length="10" v-model="data.rating"></v-rating>

                            </VCol>
                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>

                            <VCol cols="12">
                                <v-file-input :rules="rules" class="w-50" multiple accept="image/*, video/*"
                                    placeholder="Tải ảnh lên" prepend-icon="mdi-upload" label="Tải ảnh lên"
                                    @change="previewFiles($event)" @click:clear="() => {
                                        images.splice(0)
                                    }"></v-file-input>
                            </VCol>

                            <v-expand-transition>
                                <VCol cols="12" v-if="images.length">
                                    <VList class="d-flex flex-row flex-wrap">
                                        <VListItem v-for="image in images">
                                            <v-img v-if="String(image.type).includes('image')" class="ma-auto" :width="300"
                                                aspect-ratio="16/9" cover :src="image.src" />
                                            <video :width="400" preload="auto" v-if="String(image.type).includes('video')">
                                                <source :src="image.src" />

                                            </video>
                                        </VListItem>
                                    </VList>
                                </VCol>
                            </v-expand-transition>

                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>


                            <VCol cols="12" class="d-flex flex-column">
                                <v-checkbox class="m-4 w-25" color="primary" label="Xác nhận đăng bài"
                                    @click="confirm = !confirm">

                                </v-checkbox>
                                <VBtn class="mt-4" width="100px" :loading="loading" color="success" :disabled="confirm"
                                    @click="handleUpload">
                                    Đăng
                                </VBtn>

                            </VCol>
                        </VRow>
                    </VForm>
                </VCardItem>
            </VCard>
        </VCol>
    </VRow>
</template>
