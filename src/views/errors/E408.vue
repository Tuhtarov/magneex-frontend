<template>
  <error-card
      title="Ошибка 408"
      text="Превышено время ожидания от сервера. Проверьте соединение с интернетом.">
  </error-card>
</template>

<script>
import errorCard from "@/components/cards/errorCard";

export default {
  name: "E408",
  components: {
    errorCard
  },
}
</script>

<style scoped>

</style>