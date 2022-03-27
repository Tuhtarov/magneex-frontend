<template>
  <v-dialog v-model="dialog" max-width="850">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="btn-activator" v-bind="attrs" v-on="on">
        История посещений
      </v-btn>
    </template>

    <v-card>
      <v-divider />

      <v-card-text>
        <visits-table :includeEmployee="false" :visits="visits" />
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" text @click="dialog = false">
          Сформировать документ
        </v-btn>
        <v-spacer />
        <v-btn color="success" text @click="dialog = false"> Ок </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import VisitsTable from "@/components/tables/visits-table.vue";

export default {
  name: "visit-history",
  components: { VisitsTable },
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    dialog: false,
    visits: [],
    error: false,
  }),

  methods: {
    fetchVisits() {
      this.$store.dispatch("visit/fetchAllByEmployeeId", this.employee.id)
        .then((v) => (this.visits = v))
        .catch((e) => console.dir(e))
        .finally(() => (this.error = this.visits.length === 0));
    },
  },

  async beforeMount() {
      this.fetchVisits();
  },
};
</script>

<style scoped>
.btn-activator {
  margin: 0 0.5rem 0.5rem 0;
}
</style>