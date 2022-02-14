<template>
  <text-error :message="'Hello world!'" />
</template>

<script>
import TextError from "@/components/outputs/text-error";
export default {
  name: "employee-qr-scan",
  components: {TextError}
}
</script>

<style scoped>

</style>