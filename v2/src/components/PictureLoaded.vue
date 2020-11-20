<template>
    <div class="mt-2">
        <b-img
            :src="srcImg"
            :alt="srcImg"
            fluid
            center="true"
        />
    </div>
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

</style>