<template>
    <LastPictureOptions

    ></LastPictureOptions>
</template>

<script>
  import LastPictureOptions from "./LastPictureOptions";
  export default {
    name: "LastPictureOptionsList",
    components: {LastPictureOptions},
    computed: {
      lastOptionsList(){
        return this.$store.lastPicture.lastPicturesList
      },
    },
  }
</script>

<style scoped>

</style>