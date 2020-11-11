export default {
  props: ['url'],
  computed: {
    isParams: function () {
      if ( this.url === null){
        return false
      }
      return true
    },
    isLoadingState() {
      return this.$store.state.isLoadingPicture
    }
  },
  methods: {
    onClick: function () {
      console.log(document);
      let link = document.createElement('a')
      link.setAttribute('href', this.url)
      link.setAttribute('target', '_blank')
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    onLoadPicture: function () {
      this.$store.commit({
        type: 'changeStatusIsLoadingPictureMutation',
        flag: false,
      })
    }
  },
  template: `
      <div>
      <div v-if="isLoadingState">dfsfsfsd</div>
        <info v-if="!isParams"></info>
        
        <div v-if="isLoadingState && isParams">загрузка....</div>
        
        <template v-if="isParams">
          <div>
            <img v-bind:src="url"
                class="mr-3 img-fluid"
                v-bind:alt="url"
                v-on:load="onLoadPicture"
            >
          </div>
            <div class="mt-3"
                v-if="!isLoadingState"
            >
              <p>Чтобы сохранить картинку, нажмите на ней правой кнопкой мыши и выберите подходящий пункт меню.</p>
              <p>Вы также можете открыть картинку в новой вкладке кликнув по ссылке
                <a href="#"
                   v-on:click.prevent="onClick"
                  >открыть</a>
              </p>
            </div>
        </template>
      </div>
    
    `
}