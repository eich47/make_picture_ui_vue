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
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import FormOptions from "./components/FormOptions";
import UserInstruction from "./components/UserInstruction";
export default {
  name: 'App',
  components: {
    UserInstruction,
    FormOptions,
  },
  data(){
    return {
      textUserInstruction: `Выберите параметры и нажмите на кнопку "получить картинку"`,
    }
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
