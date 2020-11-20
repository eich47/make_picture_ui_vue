<template>
    <div>
        <div class="block-height d-flex justify-content-center align-items-md-center" >

            <PictureStubProcess
                    v-if="isProcess"
            />

            <PictureLoaded
                    v-if="isLoaded"
                    :src-img="getUrl"
            >

            </PictureLoaded>
        </div>

        <template v-if="isLoaded">
        <p class="mt-3">
            Чтобы сохранить картинку, нажмите на ней правой кнопкой мыши
            и выберите подходящий пункт меню.
        </p>
        <p>
            Вы также можете открыть картинку в новой вкладке кликнув
            по ссылке <a href="#"
                         @click.prevent="onClick"
                      >открыть</a>
        </p>
        </template>
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
        return this.$store.state.picture.isLoadedSuccess && !this.$store.state.isLoading
      },
      getUrl(){
          return this.$store.getters.getUrl
      },
    },
    methods: {
      onClick(){
        let link = document.createElement('a')
        link.setAttribute('href', this.getUrl)
        link.setAttribute('target', '_blank')
        document.body.appendChild(link)
        link.click()
        link.remove()
      },
    },
  }
</script>

<style scoped>
    .block-height{
        height: 370px;
    }
</style>