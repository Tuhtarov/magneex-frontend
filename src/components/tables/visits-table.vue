<template>
  <v-sheet>
    <v-text-field
      v-model="search"
      class="mb-2"
      :disabled="loading"
      append-icon="mdi-magnify"
      label="Поиск"
      style="max-width: 200px"
      single-line
      hide-details
    />

    <v-sheet elevation="3" outlined>
      <v-data-table
        :headers="headers"
        :items="visitsCurrentEmployee"
        :loading="loading"
        :sort-desc="true"
        :sort-by="'workDate'"
        :no-data-text="'Данные отсутствуют'"
        :search="search"
      >
        <template v-slot:item.workDate="{ value }">
          <span :class="getColor(value)">{{ value ? value : "-" }}</span>
        </template>

        <template v-slot:item.beginWorkTime="{ value }">
          <span :class="getColor(value)">{{ value ? value : "-" }}</span>
        </template>

        <template v-slot:item.endWorkTime="{ value }">
          <span :class="getColor(value)">{{ value ? value : "-" }}</span>
        </template>
      </v-data-table>
    </v-sheet>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "visits-table",
  data: () => ({
    loading: true,
    search: "",
    headers: [
      { text: "#", value: "id", width: "50" },
      { text: "Дата", value: "workDate", width: "100" },
      { text: "Время начала", value: "beginWorkTime", width: "100" },
      { text: "Время окончания", value: "endWorkTime", width: "100" },
    ],
  }),
  computed: {
    ...mapGetters({ visitsCurrentEmployee: "visit/getAllCurrentEmployee" }),
  },
  methods: {
    ...mapActions({
      fetchVisitsCurrentEmployee: "visit/fetchAllByCurrentEmployee",
    }),

    getColor: (val) => ({
      "error--text": val === null,
      'success--text': val === 'сегодня'
    }),
  },
  beforeMount() {
    this.fetchVisitsCurrentEmployee()
        .finally(() => (this.loading = false));
  },
};
</script>
