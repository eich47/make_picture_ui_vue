<template>
    <b-form-group
        :label="label"
        label-align="left"
        label-cols-sm="2"
        label-cols-md="3"
    >
        <b-form-radio-group
            name="extension"
            :options="options"
            @change="$emit('change', $event)"
            stacked
            :checked="selected"
            class="text-left"
        >

        </b-form-radio-group>
    </b-form-group>
</template>

<script>
  export default {
    name: "FormRadioButton",
    props: {
      label: {
        type: String,
        required: true,
      },
      options: {
        type: Array,
        required: true,
      },
      selected: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style scoped>

</style>