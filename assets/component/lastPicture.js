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