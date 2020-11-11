export default {
  props: {
    label: {
      type: String,
        required: true,
    }
  },
  data: function() {
    return {
      picked: 'jpg',
    }
  },
  watch:{
    picked: function () {
      let extensionObj = {extension: this.picked}
      return this.$emit('user-data', extensionObj)
      
    }
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