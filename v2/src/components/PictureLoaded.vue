<template>
    <div>
        загруженная картинка
        <img :src="srcImg" alt="some image">
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