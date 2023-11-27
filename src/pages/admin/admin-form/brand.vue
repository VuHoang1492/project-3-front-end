<script setup>

</script>

<template>
    <div class="ma-2">


        <VTable>
            <thead>
                <tr>
                    <th class="text-uppercase">
                        Người dùng
                    </th>
                    <th class="text-uppercase">
                        Email
                    </th>
                    <th class="text-uppercase">
                        Số điện thoại
                    </th>
                    <th class="text-uppercase">
                        Thương hiệu
                    </th>
                    <th class="text-uppercase text-center">

                    </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
                        Nguyen Van A
                    </td>
                    <td>
                        <span>user@gmail.com</span>
                    </td>
                    <td>
                        01234546789
                    </td>
                    <td>
                        MY BRAND
                    </td>
                    <td class="text-center">
                        <div class="d-flex flex-row">
                            <v-btn variant="text" color="error">Từ chối</v-btn>
                            <v-btn variant="text">Xác nhận</v-btn>
                        </div>
                    </td>
                </tr>
            </tbody>
        </VTable>
    </div>
</template>
