export default {
  props: {
    label: {
      type: String,
        required: true,
    }
  },
  data: function () {
    return {
      labelId: (Math.random() * (9e9 - 1e9) + 1e9).toFixed(0)
    }
  },
  methods: {
    selectColor: function (event) {
      let hexColor = event.target.value
      this.$store.commit({
        type: 'setColor',
        color: hexColor
      })
    }
  },
  template: `
      <div class="form-group row">
          <label v-bind:for="labelId" class="col-sm-2 col-md-3 col-form-label">{{ label }}</label>
          <div class="col-sm-10 col-md-9">
              <input type="color" class="form-control" name="user_color"
              v-bind:id="labelId"
              v-on:input="selectColor"
              value="#c0c0c0"
              >
          </div>
      </div>
    `
}