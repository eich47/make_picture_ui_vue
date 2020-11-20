<template>
    <h2 class="h6 font-weight-bold text-left">
        <b>{{text}}</b>
    </h2>
</template>

<script>
  export default {
    name: "BaseTitleForSection",
    props: {
      text: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style scoped>

</style>