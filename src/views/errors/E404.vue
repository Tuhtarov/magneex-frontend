<template>
  <error-card
      title="Ошибка 404"
      :text="message">
  </error-card>
</template>

<script>
import errorCard from "@/components/cards/errorCard";

export default {
  name: "E404",
  data: () => ({
    message: 'Такого адреса не существует.'
  }),
  components: {
    errorCard
  }
}
</script>

<style scoped>

</style>