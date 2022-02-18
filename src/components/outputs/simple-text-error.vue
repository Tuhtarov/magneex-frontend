<template>
  <p :class="({'error--text': redColor})">{{ message }}</p>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Ошибка.'
    },
    redColor: {
      type: Boolean,
      default: true
    }
  },
  name: "simple-text-error"
}
</script>