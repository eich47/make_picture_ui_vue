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
    inputTextForPicture: function (event) {
      let text = event.target.value;
      text = text.trim();
      this.$store.commit({
        type: 'setText',
        text: text
      })
    }
  },
  template: `
      <div class="form-group row">
          <label v-bind:for="labelId" class="col-sm-2 col-md-3 col-form-label">{{ label }}</label>
          <div class="col-sm-10 col-md-9">
              <input type="text" class="form-control" name="user_text"
              v-bind:id="labelId"
              v-on:input="inputTextForPicture">
          </div>
      </div>
    `
}