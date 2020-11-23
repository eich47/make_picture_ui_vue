<template>
    <div class="ml-auto">
        <b-button
            v-if="!showContact"
            @click="onClick"
        >Телеграм</b-button>
        <div
            v-else
        >
            <b-navbar-nav>
                <b-nav-item
                        href="https://t.me/sergey_dkd"
                        target="_blank"
                >https://t.me/sergey_dkd</b-nav-item>
            </b-navbar-nav>

        </div>
    </div>

</template>

<script>
  export default {
    name: "ContactBlock",
    data(){
      return {
        showContact: false,
      }
    },
    methods: {
      onClick(){
        this.showContact = true
      },
    },
  }
</script>

<style scoped>

</style>