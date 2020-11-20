<template>
    <div>
        <b-row>
            <b-col cols="12">
                <h3 class="h5">Последние созданные картинки: </h3>
            </b-col>
            <b-col cols="12" class="order-first mt-3">
                <p>Вы также можете загрузить параметры ранее созданных картинок</p>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <LastPictureOptions
                    v-for="options in lastOptionsList"
                    :key="options.id"
                    :options="options"
            ></LastPictureOptions>
        </b-row>
    </div>
</template>

<script>
  import LastPictureOptions from "./LastPictureOptions";
  export default {
    name: "LastPictureOptionsList",
    components: {LastPictureOptions},
    computed: {
      lastOptionsList(){
        return this.$store.state.lastPicture.lastPictureList
      },
    },
  }
</script>

<style scoped>

</style>