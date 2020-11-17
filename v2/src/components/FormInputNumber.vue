<template>
    <b-form-group
        :label="label"
        :label-for="generatedId"
        label-align="left"
        label-cols-sm="2"
        label-cols-md="3"
        :invalid-feedback="invalidMessage"
        :state="isValidValueEnteredUser"
    >
       <b-form-input
         :id="generatedId"
         type="number"
         :value="value"
         @input="$emit('input', $event)"
       >

       </b-form-input>
    </b-form-group>
</template>

<script>
  export default {
    name: "FormInputNumber",
    props: {
      label: {
        type: String,
        required: true
      },
      generatedId: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      },
      isValidValueEnteredUser:{
        type: Boolean,
        required: true
      },
      invalidMessage: {
        type: String,
        required: true
      }
    },
    }
</script>

<style scoped>

</style>