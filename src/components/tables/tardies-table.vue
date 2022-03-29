<template>
  <v-sheet>
    <v-text-field
        v-model="search"
        :disabled="loading"
        class="mb-2"
        append-icon="mdi-magnify"
        label="Поиск"
        style="max-width: 200px"
        single-line
        hide-details
    />

    <v-data-table
        elevation="3" outlined
        :loading="loading"
        :search="search" :headers="headers" :items="tardies"
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
      <template v-slot:item.tardy="{item: {tardy: t}}">
        {{ t }} мин. ({{ Math.round(t / 60) }} ч)
      </template>

    </v-data-table>

    <report-visit-dialog-description
        v-if="dialogDescriptionData"
        title="Опоздание"
        :value="dialogDescription" @change="dialogDescription = $event"
        :visit="dialogDescriptionData">
      <template v-slot:bottomText>
        <p><b>Опоздание в минутах: {{ dialogDescriptionData.tardy }}</b></p>
      </template>
    </report-visit-dialog-description>

  </v-sheet>
</template>

<script>
import ReportVisitDialogDescription from "@/components/dialogs/reports/report-visit-dialog-description";

export default {
  components: {ReportVisitDialogDescription},

  name: "tardies-table",
  props: {
    tardies: Array,
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
        {text: "Опоздание", value: "tardy"},
        {
          text: "Подробнее",
          value: "description",
          align: "center",
          sortable: false,
        },
      ]
    }
  },

  methods: {
    showDescriptionDialog(item) {
      this.dialogDescription = true
      this.dialogDescriptionData = item
    },
  },
};
</script>
