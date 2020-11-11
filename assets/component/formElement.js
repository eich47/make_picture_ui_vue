export default {
  props: {
    title: {
      type: String,
        required: true,
    },
    components: {
      type: Array,
        required: true,
    }
  },
  methods: {
    inputDataUser: function (data) {
      //пробрасываем событие и данные дальше вверх
      this.$emit('user-data', data)
    }
  },
  template: `
      <div>
        <h2 class="h6 font-weight-bold" >{{title}}</h2>
        
        <template v-for="c in components">
            <component v-bind:is="c.name" v-bind:label="c.label"
             v-on:user-data="inputDataUser"
             v-bind:input-name="c.inputName"
             v-bind:is-correct="c.isCorrect"
             ></component>
        </template>
        
      </div>
    `
}