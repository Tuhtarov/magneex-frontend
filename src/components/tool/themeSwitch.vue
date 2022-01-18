<template>
  <v-switch @change="toggleTheme" inset hide-details label="Тёмная тема">
  </v-switch>
</template>

<script>
export default {
  name: "themeSwitch",
  methods: {
    toggleTheme(value) {
      this.$vuetify.theme.dark = value;
    },
  },
};
</script>

<style>
</style>