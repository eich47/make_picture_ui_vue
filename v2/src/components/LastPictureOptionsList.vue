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
            <transition-group name="last" tag="div" class="row">
            <LastPictureOptions
                    v-for="options in lastOptionsList"
                    :key="options.id"
                    :options="options"
            ></LastPictureOptions>
            </transition-group>
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
    .last-enter,
    .last-leave-to{
        opacity: 0;
    }
    .last-enter{
        transform: translateY(-30px);
    }
    .last-leave-to{
        transform: translateY(30px);
    }
    .last-enter-active,
    .last-leave-active{
        transition: all .3s;
    }
    .last-move{
        transition: transform 1s;
    }
</style>