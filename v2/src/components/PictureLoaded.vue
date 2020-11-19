<template>
    <div>
        <b-img
            :src="srcImg"
            :alt="srcImg"
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