<script setup>

</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader error-code="404" error-title="Page Not Found ⚠️"
      error-description="We couldn't find the page you are looking for." />

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VBtn to="/" class="mt-10">
        Back to Home
      </VBtn>
    </div>


  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/misc.scss";

.misc-footer-tree {
  inline-size: 15.625rem;
  inset-block-end: 3.5rem;
  inset-inline-start: 0.375rem;
}
</style>
