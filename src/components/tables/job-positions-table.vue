<template>
  <v-card elevation="4" outlined>
    <template v-if="positionsNotEmpty">
      <v-card-title>Должности</v-card-title>

      <v-card-subtitle>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            single-line
            style="max-width: 500px"
            hide-details />
      </v-card-subtitle>

      <v-card-text>
        <v-data-table
            :style="{maxWidth: maxWidth}"
            :headers="headers"
            :items="positions"
            :no-data-text="'Данные отстутствуют'"
            :search="search" />
      </v-card-text>
    </template>
    <template v-else>
      <v-card-text>
        <v-progress-circular indeterminate/>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "job-positions-table",
  props: {
    positions: {
      default: []
    },
    maxWidth: {
      type: String,
      default: '100%'
    }
  },
  data: () => ({
    search: '',
    headers: [
      {text: '#', align: 'start', width: '40', value: 'id'},
      {text: 'Наименование', align: 'start', value: 'name'},
      {text: 'Зарплата', align: 'start', value: 'salary'},
      {text: 'Начало', align: 'start', value: 'beginWorkTime'},
      {text: 'Конец', align: 'start', value: 'endWorkTime'},
    ],
  }),
  computed: {
    positionsNotEmpty() {
      return this.positions?.length > 0 ?? false;
    }
  }
}
</script>

<style scoped>

</style>