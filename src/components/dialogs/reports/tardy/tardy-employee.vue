<template>
  <v-dialog v-model="dialog" max-width="850">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on"> Опоздания</v-btn>
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

        <v-data-table :search="search" :headers="headers" :items="tardies">
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

      <v-card-actions>
        <v-btn class="btn-activator" color="primary" text @click="dialog = false">
          Сформировать документ
        </v-btn>
        <v-spacer/>
        <v-btn color="success" text @click="dialog = false"> Ок</v-btn>
      </v-card-actions>

      <tardy-employee-description
          v-if="dialogDescriptionData"
          :visit-tardy="dialogDescriptionData"
          :value="dialogDescription" @change="dialogDescription = $event"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import TardyEmployeeDescription from "@/components/dialogs/reports/tardy/tardy-employee-description";

export default {
  name: "tardy-employee",
  components: {TardyEmployeeDescription},
  props: {
    employee: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    dialog: false,
    dialogDescription: false,
    dialogDescriptionData: null,
    search: '',
    tardies: [],
    hasServerError: false,

    headers: [
      {text: "#", value: "id"},
      {text: "Дата", value: "workDate"},
      {text: "Опоздание", value: "minutes"},
      {
        text: "Подробнее",
        value: "description",
        align: "center",
        sortable: false,
      },
    ],
  }),

  methods: {
    settingTardies(t) {
      let tardies = []
      const date = new Date();
      const getDt = str => new Date(date.toDateString() + ' ' + str)

      t.forEach(tardy => {
        let visit = getDt(tardy.beginWorkTime);
        let job = getDt(tardy.employee.jobPosition.beginWorkTime);
        tardy.minutes = Math.round((visit - job) / 1000 / 60)
        tardies.push(tardy)
      })

      this.tardies = tardies;
    },

    showDescriptionDialog(item) {
      this.dialogDescription = true
      this.dialogDescriptionData = item
    },
  },

  beforeMount() {
    this.$store.dispatch('visit/fetchTardiesByEmployeeId', this.employee.id)
        .then(t => this.settingTardies(t))
        .catch(e => console.dir(e))
        .finally(() => this.hasServerError = true)
  }
};
</script>

<style scoped>
.btn-activator {
  margin: 0 0.5rem 0.5rem 0;
}
</style>