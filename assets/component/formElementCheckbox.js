export default {
  props: {
    label: {
      type: String,
      required: true,
    }
  },
  data: function(){
    return {
      // checked: this.isChecked
    }
  },
  computed: {
    checked: {
      get: function() {
        return this.$store.getters.getTexture
      },
      set: function(newValue){
        this.$store.commit({
          type: 'setTexture',
          texture: newValue
        })
      }
    }
  },
  watch: {
    // checked: function () {
    //   this.$store.commit({
    //     type: 'setTexture',
    //     texture: this.checked
    //   })
    // }
  },
  template: `
      <div class="form-group row">
        <label class="col-sm-2 col-md-3 ">{{label}}</label>
        <div class="col-sm-10 col-md-9">
          <div class="custom-control custom-checkbox">
              <input type="checkbox"
              name="user_texture"
              class="custom-control-input"
              id="texture"
              v-model="checked"
              >
              <label for="texture" class="custom-control-label">добавить</label>
          </div>
        </div>
      </div>
    `
}