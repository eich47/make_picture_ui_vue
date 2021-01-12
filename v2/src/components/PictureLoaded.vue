<template>

        <b-img
            :src="srcImg"
            :alt="srcImg"

            :center="true"
            class="height"
        />

</template>

<script>
  export default {
    name: "PictureLoaded",
    props: {
      srcImg: {
        type: String,
        required: false,
      },
    },
  }
</script>

<style scoped>
    .height {
      max-height: 100%;
            width: 100%;
            object-fit: contain;
    }
</style>