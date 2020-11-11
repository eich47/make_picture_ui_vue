export default {
  computed: {
    isLoading() {
      return this.$store.state.isLoadingPicture
    },
    isValidUserData(){
      return this.$store.getters.isValidWidth
        && this.$store.getters.isValidHeight
    }
  },
  template: `
      <div class="form-group row">
          <div class="col-sm-10 col-md-9 ml-auto">
              <input type="submit"
                        class="form-control bg-light"
                        value="Получить картинку"
                        :disabled="isLoading || !isValidUserData"
                        >
          </div>
      </div>
    `
}
