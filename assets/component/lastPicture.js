export default {
  created: function(){
    console.log('lastPicture');
    this.$store.dispatch('getLastPicture')
  },
  computed: {
    lastPictureList(){
      return this.$store.state.lastPicturesList
    },
    isLoadingState(){
      return this.$store.state.isLoadingPicture
    },
    countOfLastPicturesList(){
      return this.$store.state.lastPicturesList.length
    }
  },
  methods:{
    onDeleteOptions(options){
      this.$store.commit({
        type: 'deleteSelectedOptions',
        options: options
      })
    }
  },
  template:`
    <div v-if="countOfLastPicturesList > 0">
    <div class="row no-gutters">
        <h3 v-if="countOfLastPicturesList < 6" class="h5 col-12">Последние созданные картинки: </h3>
        <h3 v-else class="h5 col-12">Последние 6 созданных картинок: </h3>
        <p class="col-12 order-first">Вы также можете загрузить параметры ранее созданных картинок</p>
    </div>
    
    <div class="row">
        <last-options-picture
            v-for="options in lastPictureList"
            :options="options"
            @onDeleteOptions="onDeleteOptions"
            >
        ></last-options-picture>
    </div>
    
    </div>
  `
}