<script setup>
import { createPost } from '@/services/axios/api/api'
import { reactive, ref } from 'vue';
import { useToastStore } from '@/stores/toast';
import { useRoute } from 'vue-router';
import { load } from 'webfontloader';


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
//to preview
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

const data = reactive({
    title: null,
    description: null,
    media: null,
})

const handleUpload = () => {
    loading.value = true
    if (data.title == null || data.description == null) {
        toast.openToast('Chưa điền đủ thông tin!')
        return
    }

    const formData = new FormData()
    formData.append('restaurant', route.params.restaurantId)
    formData.append('title', data.title)
    formData.append('description', data.description)

    for (let i = 0; i < data.media.length; i++) {
        formData.append("media", data.media[i]);
    }

    createPost(formData).then(res => {
        console.log(res);
        toast.openToast('Hành động thành công!!')
        loading.value = false
    }).catch(err => {
        console.log(err);
        toast.openToast('Có lỗi xảy ra!!')
        loading.value = false
    })
}


const loading = ref(false)
</script>

<template>
    <VRow>
        <VCol cols="11" class="ml-16 mt-16">
            <VCard>

                <VCardItem>
                    <VForm class="mt-4">
                        <VRow>
                            <VCol cols="12">
                                <VTextField label="TIÊU ĐỀ" v-model="data.title" />
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
                                            <video :width="400" preload="auto" controls
                                                v-if="String(image.type).includes('video')">
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
                                <VBtn class="mt-4" width="100px" color="success" :disabled="confirm" @click="handleUpload"
                                    :loading="loading">
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
