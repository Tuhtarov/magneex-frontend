<template>
  <v-sheet class="mt-2">
    <v-card
        outlined
        :elevation="isDark ? '4' : '2'"
        :loading="itemsLoading"
        :disabled="itemsLoading">

      <v-card-title style="font-size: 1rem;">
        <span style="text-transform: capitalize;">{{ title }}</span>
      </v-card-title>

      <slot />

      <v-card-text>
        <template v-if="!itemsLoading">
          <span v-if="value">Выбрано: <b>{{ selectedName }}</b></span>
          <span v-else>Не выбрано</span>
        </template>

        <template v-else>
          <v-progress-circular color="primary" indeterminate/>
        </template>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <choose-item-dialog :items="items" :value="value" @change="onChange">
          Выберите {{ title }}
        </choose-item-dialog>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
import ChooseItemDialog from "@/components/dialogs/ChoseeItemDialog";

export default {
  name: "chooseCard",
  components: {ChooseItemDialog},

  props: {
    title: String,
    items: Array,
    value: Number
  },

  computed: {
    itemsLoading() {
      return !this.items?.length > 0;
    },
    isDark() {
      return this.$vuetify.theme.dark;
    },
    selectedName() {
      return this.items.reduce((p, c) => +c.id === +this.value ? p + c.name : p, '')
    },
  },

  methods: {
    onChange(id) {
      this.$emit('change', id)
      this.$emit('input', id)
    },
  }
}
</script>

<style scoped>

</style>