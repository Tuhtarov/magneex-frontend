<template>
  <v-card elevation="4" outlined>
    <template v-if="positionsNotEmpty">
      <v-card-title>Должности</v-card-title>

      <v-card-subtitle>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            style="max-width: 500px"
            hide-details
        ></v-text-field>
      </v-card-subtitle>

      <v-card-text>
        <v-data-table
            :style="{maxWidth: maxWidth}"
            :headers="headers"
            :items="positions"
            :no-data-text="'Данные отстутствуют'"
            :search="search"
        ></v-data-table>
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
      {text: '#', align: 'start', width: '40px', value: 'id'},
      {text: 'Наименование', align: 'start', value: 'name',},
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