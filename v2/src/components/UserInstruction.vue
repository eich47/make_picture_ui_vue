<template>
    <p>
        {{text}}
    </p>
</template>

<script>
  export default {
    name: "UserInstruction",
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