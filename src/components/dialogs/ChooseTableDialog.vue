<template>
  <v-dialog :value="visibility" max-width="560" persistent>
    <v-card height="500">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            single-line
            hide-details
        ></v-text-field>
      </v-card-subtitle>

      <v-card-text>
        <v-data-table
            :search="search"
            :headers="headers"
            :items="items"
            :items-per-page="5"
            :single-select="true"
            item-key="id"
            :show-select="true"
            @item-selected="selectedRow = $event"
            :no-data-text="'Отсутствуют элементы для выбора'">
        </v-data-table>
        <v-divider/>
        <slot name="selectedRow" v-bind="selectedRow">
          <v-card min-height="140" max-height="200">
            <v-card-subtitle v-if="notSelected">Ничего не выбрано</v-card-subtitle>
          </v-card>
        </slot>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="confirm" text color="success">Применить</v-btn>
        <v-spacer/>
        <v-btn @click="close" text color="error">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ChooseTableDialog",
  props: {
    headers: {
      type: Array
    },
    items: {
      type: Array
    },
    visibility: {
      type: Boolean
    },
    title: {
      type: String
    }
  },
  data: () => ({
    search: '',
    selectedRow: null,
    notSelected: false
  }),
  methods: {
    confirm() {
      if (this.selectedRow !== null) {
        this.$emit('confirm', this.selectedRow.item)
        this.close();
      } else {
        this.notSelected = true
      }
    },
    close() {
      this.$emit('close', true)
    }
  },
}
</script>

<style scoped>

</style>