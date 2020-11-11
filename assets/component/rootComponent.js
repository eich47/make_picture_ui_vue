export default {
  data: function(){
    return {
      url: null
    }
  },
  methods: {
    onUrlReady: function (url) {
      console.log(`url = ${url}`);
      this.url = url
    }
  },
  template: `
      <div class="container mt-3">
          <h1 class="h3 text-center mb-3">Создание картинки по параметрам</h1>
          <div class="row">
              <div class="col-md-5">
                  <form-root
                    v-on:url-ready="onUrlReady"
                  ></form-root>
              </div>
              <div class="col">
                <block-image
                    v-bind:url="url"
                ></block-image>
              </div>
          </div>
      </div>
    `
}