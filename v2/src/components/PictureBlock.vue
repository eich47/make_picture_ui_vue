<template>
    <div :class="{ marginToNotJump: this.$store.getters.getIsUserSendForm}">
        <div class="block-height d-flex justify-content-center align-items-md-center" >
            <transition name="picture-loaded" mode="out-in">
            <PictureStubProcess
                    v-if="isProcess"
            />

            <PictureLoaded
                    v-if="isLoaded"
                    :src-img="getUrl"
            >

            </PictureLoaded>
            </transition>
        </div>

        <template v-if="isLoaded">
        <transition name="show-save-info">
        <p class="mt-3">
            Чтобы сохранить картинку, нажмите на ней правой кнопкой мыши
            и выберите подходящий пункт меню.
        </p>
        </transition>
        <transition name="show-save-info">
        <p>
            Вы также можете открыть картинку в новой вкладке кликнув
            по ссылке <a href="#"
                         @click.prevent="onClick"
                      >открыть</a>
        </p>
        </transition>
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
        return this.$store.state.isLoading
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
        height: 240px;
    }

    /*появление*/
    .picture-loaded-enter{
        opacity: 0;
    }
    .picture-loaded-enter-active{
        transition: opacity .5s ease;
    }

    /*анимация для текста*/
    .show-save-info-enter{
        opacity: 0;
    }
    .show-save-info-enter-active{
        transition: opacity .5s ease;
    }
    .show-save-info-enter-to{
        opacity: 1;
    }

    .marginToNotJump{
        margin-top: 40px;
    }

</style>