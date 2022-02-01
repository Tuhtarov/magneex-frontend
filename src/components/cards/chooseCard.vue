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
          <span v-if="selectedId">Выбрано: <b>{{ selectedName }}</b></span>
          <span v-else>Не выбрано</span>
        </template>
        <template v-else>
          <v-progress-circular color="primary" indeterminate/>
        </template>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <choose-item-dialog
            :items="items"
            :value="selectedId"
            @select="onChoose">
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
    title: {type: String},
    items: {type: []},
  },

  data: () => ({
    selectedId: null,
    selectedName: null
  }),

  computed: {
    itemsLoading() {
      return !this.items?.length > 0;
    },
    isDark() {
      return this.$vuetify.theme.dark;
    }
  },

  methods: {
    onChoose({id, name}) {
      this.selectedId = id;
      this.selectedName = name;

      this.$emit('change', id)
    },
  }
}
</script>

<style scoped>

</style>