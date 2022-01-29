<template>
  <v-card>
    <template v-if="positionsNotEmpty">
      <v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
          :headers="headers"
          :items="positions"
          :no-data-text="'Данные отстутствуют'"
          :search="search"
      >
      </v-data-table>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "job-positions-table",
  props: {
    positions: {
      default: []
    }
  },
  data: () => ({
    search: '',
    headers: [
      {text: '#', align: 'start', value: 'id',},
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