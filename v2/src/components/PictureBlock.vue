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
      isLoading() {
        return this.$store.state.isLoading
      },
      isProcess(){
        return this.$store.state.isLoading
      },
      isLoaded(){
        //TODO определеть момент окончание загрузки картинки
        return false
      },
    },
  }
</script>

<style scoped>

</style>