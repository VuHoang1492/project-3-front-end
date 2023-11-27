<script setup>
import MapLeaf from '@/components/MapLeaf.vue';
import { reactive, ref } from 'vue';


// const rules = [
//     value => {
//         return !value || !value.length || value[0].size < 5000000 || 'Kích thước ảnh cần nhỏ hơn 5 MB!'
//     },
// ]

const images = reactive([])


const previewFiles = (event) => {

    images.splice(0)
    console.log(event.target.files)
    const files = event.target.files


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






</script>

<template>
    <VRow>
        <VCol cols="11" class="ml-16 mt-16">
            <VCard>

                <VCardItem>
                    <VForm class="mt-4">
                        <VRow>
                            <VCol cols="12">
                                <VTextField label="TIÊU ĐỀ" />
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
                                <v-file-input class="w-50" multiple accept="image/*, video/*" placeholder="Tải ảnh lên"
                                    prepend-icon="mdi-upload" label="Tải ảnh lên" @change="previewFiles($event)"
                                    @click:clear="() => {
                                        images.splice(0)
                                    }"></v-file-input>
                            </VCol>

                            <v-expand-transition>
                                <VCol cols="12" v-if="images.length">
                                    <VList class="d-flex flex-row flex-wrap">
                                        <VListItem v-for="image in images">
                                            <v-img v-if="String(image.type).includes('image')" class="ma-auto" :width="300"
                                                aspect-ratio="16/9" cover :src="image.src" />
                                            <video :width="400" preload="auto" autoplay loop
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
                                <v-checkbox class="m-4 w-25" color="primary" label="Xác nhận đăng bài">

                                </v-checkbox>
                                <VBtn class="mt-4" width="100px" color="success">
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
