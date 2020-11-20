<template>
    <b-row>
        <LastPictureOptions
                v-for="options in lastOptionsList"
                :key="options.id"
                :options="options"
        ></LastPictureOptions>
    </b-row>
</template>

<script>
  import LastPictureOptions from "./LastPictureOptions";
  export default {
    name: "LastPictureOptionsList",
    components: {LastPictureOptions},
    computed: {
      lastOptionsList(){
        return this.$store.state.lastPicture.lastPictureList
      },
    },
  }
</script>

<style scoped>

</style>