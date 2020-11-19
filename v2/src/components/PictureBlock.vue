<template>
    <div>
        <PictureStubBefore
            v-if="! this.$store.getters.getIsUserSendForm"
        />

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
  import PictureStubBefore from "./PictureStubBefore";
  import PictureStubProcess from "./PictureStubProcess";
  export default {
    name: "PictureBlock",
    components: {PictureStubProcess, PictureStubBefore, PictureLoaded},
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

</style>