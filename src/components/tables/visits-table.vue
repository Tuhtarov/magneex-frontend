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
          :items="visits"
          :loading="loading"
          :sort-desc="true"
          :sort-by="'workDate'"
          :no-data-text="'Данные отсутствуют'"
          :search="search"
      >
        <template v-slot:item.employee.people.family="{item}">
          <span v-if="item.employee.people">
            <router-link :to="{name: 'employees-show', params: {id: item.employee.id}}" class="text-decoration-none">
              {{ getFullName(item.employee.people) }}
            </router-link>
          </span>
          <span v-else :class="getColor(null)">-</span>
        </template>

        <template v-slot:item.workDate="{ value }">
          <span :class="getColor(value)">{{ value ? value : "-" }}</span>
        </template>

        <template v-slot:item.beginWorkTime="{ value }">
          <span :class="getColor(value)">{{ value ? value : "-" }}</span>
        </template>

        <template v-slot:item.endWorkTime="{ value }">
          <span :class="getColor(value)">{{ value || "-" }}</span>
        </template>
      </v-data-table>
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  name: "visits-table",
  props: {
    visits: Array,
    includeEmployee: Boolean
  },
  data: () => ({
    search: "",
  }),
  computed: {
    loading() {
      return this.visits.length <= 0;
    },
    headers() {
      return [
        {text: "#", value: "id",},
        this.includeEmployee && {text: "Сотрудник", value: "employee.people.family"},
        {text: "Дата", value: "workDate",},
        {text: "Время начала", value: "beginWorkTime",},
        {text: "Время окончания", value: "endWorkTime",}
      ];
    },
  },
  methods: {
    getColor: (val) => ({
      "error--text": val === null,
      'success--text': val === 'сегодня'
    }),
    getFullName: ({family, name}) => `${family} ${name}`,
  },
};
</script>
