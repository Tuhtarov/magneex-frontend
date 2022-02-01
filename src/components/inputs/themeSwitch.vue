<template>
  <div class="d-flex align-center">
    <v-card-text
        class="my-auto mr-5 pa-0"
        style="font-size: inherit;">{{ label }}
    </v-card-text>
    <v-switch
        @change="toggleTheme"
        v-model="switcherValue"
        class="ma-0"
        persistent-hint
        inset hide-details>
    </v-switch>
  </div>
</template>

<script>
import {themeIsDark, switchTheme} from "@/features/ThemeManager";

export default {
  name: "themeSwitch",
  props: {
    revert: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Тёмная тема'
    }
  },
  data: () => ({
    switcherValue: themeIsDark()
  }),
  methods: {
    toggleTheme(value) {
      switchTheme.apply(this, [value])
    },
  },
};
</script>

<style>
</style>