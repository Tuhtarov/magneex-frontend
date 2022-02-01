<template>
  <error-card
      title="Ошибка 404"
      text="Такого адреса не существует.">
  </error-card>
</template>

<script>
import errorCard from "@/components/cards/errorCard";

export default {
  name: "E404",
  components: {
    errorCard
  },
}
</script>

<style scoped>

</style>