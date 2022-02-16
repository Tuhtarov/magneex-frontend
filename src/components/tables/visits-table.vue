<template>
  <v-sheet>
    <v-text-field
        class="mb-2"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        style="max-width: 200px;"
        single-line
        hide-details
    />

    <v-sheet elevation="3" outlined>
      <v-data-table
          :headers="headers"
          :items="visitsCurrentEmployee"
          :no-data-text="'Данные отстутствуют'"
          :search="search"
      >
        <template v-slot:item.workDate="{item}">
            <span v-show="item.beginWorkTime">
              {{ (new Date(item.beginWorkTime)).toLocaleDateString('ru') }}
            </span>
          <span v-show="!item.beginWorkTime" class="error--text">-</span>
        </template>
        <template v-slot:item.beginWorkTime="{value = {beginWorkTime}}">
          <span v-show="value">{{ (new Date(value)).toLocaleTimeString('ru') }}</span>
          <span v-show="!value" class="error--text">-</span>
        </template>
        <template v-slot:item.endWorkTime="{value = {endWorkTime}}">
          <span v-show="value">{{ (new Date(value)).toLocaleTimeString('ru') }}</span>
          <span v-show="!value" class="error--text">-</span>
        </template>
      </v-data-table>
    </v-sheet>
  </v-sheet>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "visits-table",
  data: () => ({
    search: "",
    headers: [
      {text: "#", value: "id", width: "50px"},
      {text: "Дата", value: "workDate", width: "100px"},
      {text: "Время начала", value: "beginWorkTime", width: "100px"},
      {text: "Время окончания", value: "endWorkTime", width: "100px"},
    ],
  }),
  computed: {
    ...mapGetters({visitsCurrentEmployee: 'visit/getVisitsCurrentEmployee'})
  },
  methods: mapActions({fetchVisitsCurrentEmployee: 'visit/fetchVisitsCurrentEmployee'}),
  beforeMount() {
    this.fetchVisitsCurrentEmployee()
  }
}
</script>
