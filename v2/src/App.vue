<template>
  <div id="app">
    <b-container class="mt-3">
      <h1 class="h3 text-center mb-3">Создание картинки по параметрам</h1>
      <b-row>
        <b-col md="5">
          <FormOptions/>
        </b-col>
        <b-col md="7">
          <UserInstruction
            :text="textUserInstruction"
            v-if="!this.$store.getters.getIsUserSendForm"
          />
          <PictureBlock/>

          <transition name="last-pictures">
          <LastPictureOptionsList
            v-if="isHaveLastPictureOptions"
          />
          </transition>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import FormOptions from "./components/FormOptions";
import UserInstruction from "./components/UserInstruction";
import PictureBlock from "./components/PictureBlock";
import LastPictureOptionsList from "./components/LastPictureOptionsList";
export default {
  name: 'App',
  components: {
    LastPictureOptionsList,
    PictureBlock,
    UserInstruction,
    FormOptions,
  },
  data(){
    return {
      textUserInstruction: `Выберите параметры и нажмите на кнопку "получить картинку"`,
    }
  },
  computed: {
    isHaveLastPictureOptions() {
      return this.$store.state.lastPicture.lastPictureList.length > 0
    },
  },
  created() {
    //загрузим сохранные опции
    this.$store.dispatch('loadSavedOptions')
  },
}
</script>

<style>
    .last-pictures-enter{
        opacity: 0;
        transform: translateY(50px);
    }
    .last-pictures-leave-to{
        transform: translateX(1000px);
        opacity: 0;
    }
    .last-pictures-enter-active,
    .last-pictures-leave-active{
        transition: all 1s;
    }
</style>
