export default {
  props: {
    label: {
      type: String,
        required: true,
    }
  },
  data: function() {
    return {
      // picked: this.$store.getters.getExtension,
    }
  },
  computed: {
    picked: {
      get: function () {
        return this.$store.getters.getExtension
      },
      set: function (newValue) {
        this.$store.commit({
          type: 'setExtension',
          extension: newValue
        })
      }
    }
  },
  watch:{
    // picked: function () {
    //   this.$store.commit({
    //     type: 'setExtension',
    //     extension: this.picked,
    //   })
    //
    // }
  },
  template: `
        <div class="form-group row">
          <label class="col-sm-2 col-md-3">{{label}}</label>
          <div class="col-sm-10 col-md-9">
              <div class="custom-control custom-radio">
                  <input type="radio"
                  name="customRadio"
                  class="custom-control-input"
                  id="radiojpg"
                  value="jpg"
                  v-model="picked">
                  <label class="custom-control-label" for="radiojpg">jpg</label>
              </div>
              <div class="custom-control custom-radio">
                  <input type="radio"
                  name="customRadio"
                  class="custom-control-input"
                  id="radiogif"
                  value="gif"
                  v-model="picked">
                  <label class="custom-control-label" for="radiogif">gif</label>
              </div>
              <div class="custom-control custom-radio">
                  <input type="radio"
                  name="customRadio"
                  class="custom-control-input"
                  id="radiopng"
                  value="png"
                  v-model="picked">
                  <label class="custom-control-label" for="radiopng">png</label>
              </div>
          </div>
        </div>
    `
}