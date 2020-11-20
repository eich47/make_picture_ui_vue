<template>
  <div id="app">
    <b-container class="mt-3">
      <h1 class="h3 text-center mb-3">Создание картинки по параметрам</h1>
      <b-row>
        <b-col md="5">
          <FormOptions/>
        </b-col>
        <b-col>
          <UserInstruction
            :text="textUserInstruction"
            v-if="!this.$store.getters.getIsUserSendForm"
          />
          <PictureBlock/>
          <LastPictureOptionsList
            v-if="isHaveLastPictureOptions"
          />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
