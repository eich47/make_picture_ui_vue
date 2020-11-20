<template>
    <b-col
        md="6"
        xl="4"
    >
        <b-list-group tag="ul">
            <b-list-group-item tag="li">
                {{size}}
            </b-list-group-item>

            <b-list-group-item tag="li" class="p-3">
                <div :style="{ backgroundColor: options.color, height: 24 + 'px'}"></div>
            </b-list-group-item>

            <b-list-group-item tag="li">
                Формат: {{options.extension}}
            </b-list-group-item>

            <b-list-group-item tag="li">
                Текст: {{text}}
            </b-list-group-item>

            <b-list-group-item tag="li">
                Текстура: {{texture}}
            </b-list-group-item>

            <div class="d-flex">
                <b-button
                   variant="info"
                   class="col"
                   @click="onLoad"
                >Загрузить</b-button>
                <b-button
                    variant="warning"
                    class="col"
                    @click="onDelete()"
                >Удалить</b-button>
            </div>
        </b-list-group>
    </b-col>
</template>

<script>
  export default {
    name: "LastPictureOptions",
    props: {
      options: {
        type: Object,
        required: true,
      },
    },
    computed: {
      size(){
        return `${this.options.width}x${this.options.height}`
      },
      text(){
        return (this.options.text) ? this.options.text : `без текста`
      },
      texture(){
        return this.options.texture ? `да` : `нет`
      },
    },
    methods: {
      onDelete(){
        this.$store.dispatch('deleteSelectedOptionsFromStorage', this.options)
      },
      onLoad(){
        this.$store.commit('setCurrentOptions', this.options)
      },
    },
  }
</script>

<style scoped>

</style>