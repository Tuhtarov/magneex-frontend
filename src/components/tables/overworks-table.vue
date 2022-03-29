<template>
  <v-sheet>
    <v-text-field
        v-model="search"
        class="mb-2"
        append-icon="mdi-magnify"
        label="Поиск"
        :disabled="loading"
        style="max-width: 200px"
        single-line
        hide-details
    />

    <v-data-table
        elevation="3" outlined
        :loading="loading"
        :search="search" :headers="headers" :items="overworks"
        :no-data-text="'Данные отсутствуют'"
    >
      <template v-slot:item.description="{item}">
        <v-btn
            small
            elevation="3"
            class="ma-0"
            color="primary"
            icon
            outlined
            @click="showDescriptionDialog(item)"
        >
          <v-icon small>mdi-eye-outline</v-icon>
        </v-btn>
      </template>

      <template v-slot:item.overwork="{item: {overwork: o}}">
        {{ o }} мин. ({{ Math.round(o / 60) }} ч)
      </template>
    </v-data-table>

    <report-visit-dialog-description
        v-if="dialogDescriptionData"
        title="Опоздание"
        :value="dialogDescription" @change="dialogDescription = $event"
        :visit="dialogDescriptionData">
      <template v-slot:bottomText>
        <p><b>Пеработка: {{ dialogDescriptionData.overwork }} мин.</b></p>
      </template>
    </report-visit-dialog-description>
  </v-sheet>
</template>

<script>
import ReportVisitDialogDescription from "@/components/dialogs/reports/report-visit-dialog-description";

export default {
  components: {ReportVisitDialogDescription},

  name: "overworks-table",
  props: {
    overworks: Array,
    includeEmployee: Boolean,
    loading: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    search: "",
    dialogDescription: false,
    dialogDescriptionData: null,
  }),

  computed: {
    headers() {
      return [
        {text: "#", value: "id"},
        {text: "Дата", value: "workDate"},
        {text: "Переработка", value: "overwork"},
        {
          text: "Подробнее",
          value: "description",
          align: "center",
          sortable: false,
        },
      ]
    },
  },

  methods: {
    showDescriptionDialog(item) {
      this.dialogDescription = true
      this.dialogDescriptionData = item
    },
  },
};
</script>
