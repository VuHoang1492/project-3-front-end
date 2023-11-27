<script setup>
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




</script>

<template>
    <VRow>
        <VCol cols="11" class="ml-16 mt-16">
            <VCard>
                <VCardItem class="mb-4">
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">

                            <v-chip v-bind="props" :color="isHovering ? 'success' : undefined" title="Hover over me"
                                class="ma-2" color="pink" label text-color="white"
                                @click="() => router.push('/manage-restaurant')">
                                <v-icon start icon="mdi-label"></v-icon>
                                <p
                                    :class="+ isHovering ? 'text-h6 font-italic ma-auto ml-1 mr-1' : 'font-italic ma-auto ml-1 mr-1'">
                                    BRAND NAME
                                </p>
                            </v-chip>
                        </template>
                    </v-hover>
                    <v-hover>
                        <template v-slot:default="{ isHovering, props }">

                            <v-chip v-bind="props" :color="isHovering ? 'success' : undefined" title="Hover over me"
                                class="ma-2" color="pink" label text-color="white"
                                @click="() => router.push('/manage-restaurant')">
                                <v-icon start icon="mdi-label"></v-icon>
                                <p
                                    :class="+ isHovering ? 'text-h6 font-italic ma-auto ml-1 mr-1' : 'font-italic ma-auto ml-1 mr-1'">
                                    RESRAUTANT NAME
                                </p>
                            </v-chip>
                        </template>
                    </v-hover>

                </VCardItem>
                <VCardItem>
                    <VForm class="mt-4">
                        <VRow>
                            <VCol cols="12">
                                <VTextField label="TÊN CỬA HÀNG" />
                            </VCol>

                            <VCol cols="5">
                                <v-text-field label="GIỜ MỞ CỬA" type="time"></v-text-field>
                            </VCol>
                            <VCol cols="5">
                                <v-text-field label="GIỜ ĐÓNG CỬA" type="time"></v-text-field>
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
                                <VTextarea clearable no-resize rows="5" label="MÔ TẢ" />
                            </VCol>
                            <VCol cols="12">
                                <v-file-input class="w-50" :rules="rules" accept="image/png, image/jpeg, image/bmp"
                                    placeholder="Thumbnail" prepend-icon="mdi-camera" label="Thumbnail"
                                    @change="previewFiles($event)" @click:clear="() => {
                                        image = ''
                                    }"></v-file-input>
                            </VCol>

                            <VCol v-if="image !== ''">
                                <v-img class="ma-auto" :width="300" aspect-ratio="16/9" cover :src="image" />
                            </VCol>
                            <VCol cols="12" class="d-flex flex-column">
                                <v-checkbox class="m-4 w-25" color="error" label="Xác nhận tạo cửa hàng">

                                </v-checkbox>
                                <VBtn class="mt-4" width="200px" color="success">
                                    Lưu thay đổi
                                </VBtn>
                                <VBtn class="mt-4" width="200px" color="error">
                                    Hủy bỏ
                                </VBtn>

                            </VCol>

                        </VRow>
                    </VForm>
                </VCardItem>
            </VCard>
        </VCol>
    </VRow>
</template>
