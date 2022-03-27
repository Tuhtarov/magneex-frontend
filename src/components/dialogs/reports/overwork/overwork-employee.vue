<template>
  <v-dialog v-model="dialog" max-width="850">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="btn-activator" v-bind="attrs" v-on="on">
        Переработки
      </v-btn>
    </template>

    <v-card>
      <v-divider/>
      <v-card-text>
        <v-text-field
            v-model="search"
            class="mb-2"
            append-icon="mdi-magnify"
            label="Поиск"
            style="max-width: 200px"
            single-line
            hide-details
        />

        <v-data-table :search="search" :headers="headers" :items="overworks">
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
        </v-data-table>
      </v-card-text>

      <overwork-employee-description
          v-if="dialogDescriptionData"
          :visit-overwork="dialogDescriptionData"
          :value="dialogDescription" @change="dialogDescription = $event"
      />

      <v-card-actions>
        <v-btn color="primary" text @click="dialog = false">
          Сформировать документ
        </v-btn>
        <v-spacer/>
        <v-btn color="success" text @click="dialog = false"> Ок</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import overworkEmployeeDescription from "@/components/dialogs/reports/overwork/overwork-employee-description";

import {checkOverwork} from "@/api/Entity/VisitManager";

export default {
  name: "overwork-employee",
  components: {overworkEmployeeDescription},


  props: {
    employee: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    search: '',
    dialog: false,

    dialogDescription: false,
    dialogDescriptionData: null,

    headers: [
      {text: "#", value: "id"},
      {text: "Дата", value: "workDate"},
      {text: "Переработка", value: "overwork"},
      {
        text: "Подробнее",
        value: "description",
        align: "center",
        sortable: false,
      },
    ],

    overworks: [],
  }),

  beforeMount() {
    this.$store
        .dispatch("visit/fetchAllByEmployeeId", this.employee.id)
        .then((v) => this.settingOverworks(v));
  },

  methods: {
    showDescriptionDialog(item) {
      this.dialogDescription = true
      this.dialogDescriptionData = item
    },

    settingOverworks(visits) {
      const overworks = [];

      visits.forEach((visit) => {
        let val = checkOverwork(visit).overwork;

        if (val === null) {
          return;
        }

        visit.overwork = val
        overworks.push(visit);
      });

      this.overworks = overworks;
    },


  },
};
</script>

<style scoped>
.btn-activator {
  margin: 0 0.5rem 0.5rem 0;
}
</style>