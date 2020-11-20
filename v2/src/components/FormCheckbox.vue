<template>
    <b-form-group
        :label="label"
        label-align="left"
        label-cols-sm="2"
        label-cols-md="3"
        label-class="py-0"
    >
        <b-form-checkbox
                :id="generatedId"
                :checked="checked"
                :name="name"
                class="text-left"
                @change="$emit('change', $event)"
        >
            {{checkboxText}}
        </b-form-checkbox>
    </b-form-group>

</template>

<script>
  export default {
    name: "FormCheckbox",
    props: {
      label: {
        type: String,
        required: true,
      },
      checkboxText: {
        type: String,
        required: true,
      },
      generatedId: {
        type: String,
        required: true,
      },
      checked: {
        type: Boolean,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style scoped>

</style>