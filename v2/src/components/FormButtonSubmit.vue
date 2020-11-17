<template>
    <b-form-group
        label-cols-sm="2"
        label-cols-md="3"
        :invalid-feedback="invalidMessage"
        :state="isValidData"
    >
        <b-button
                type="submit"
                block
                variant="secondary"
        >
            {{label}}
        </b-button>
    </b-form-group>

</template>

<script>
  export default {
    name: "FormButtonSubmit",
    props: {
      label: {
        type: String,
        required: true,
      },
      invalidMessage:{
        type: String,
        required: true,
      },
      isValidData: {
        type: Boolean,
        required: true,
      },
    },
  }
</script>

<style scoped>

</style>