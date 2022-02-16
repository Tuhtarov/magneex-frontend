<template>
  <v-sparkline
      :gradient="gradient"
      :line-width="width"
      :padding="padding"
      :smooth="radius || false"
      :value="value"
      auto-draw
  />
</template>

<script>
export default {
  name: "timeSparkline",
  data: () => ({
    gradient: ["purple", "violet"],
    padding: 7,
    radius: 0,
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    width: 1,
  }),
}
</script>

<style scoped>

</style>