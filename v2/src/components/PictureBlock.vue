<template>
    <div class="block-height">

        <PictureStubProcess
            v-if="isProcess"
        />

        <PictureLoaded
            v-if="isLoaded"
            :src-img="getUrl"
        >

        </PictureLoaded>
    </div>

</template>

<script>
  import PictureLoaded from "./PictureLoaded";
  import PictureStubProcess from "./PictureStubProcess";
  export default {
    name: "PictureBlock",
    components: {PictureStubProcess, PictureLoaded},
    computed: {
      isProcess(){
        return this.$store.state.picture.isStartLoadingImage
      },
      isLoaded(){
        return this.$store.state.picture.isLoadedSuccess
      },
      getUrl(){
          return this.$store.getters.getUrl
      },
    },
  }
</script>

<style scoped>
    .block-height{
        height: 370px;
    }
</style>