<template>
  <v-dialog v-model="dialog" max-width="850">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="btn-activator" v-bind="attrs" v-on="on" @click="fetchVisits" :loading="loading">
        Переработки
      </v-btn>
    </template>

    <v-card v-if="!loading && dialog">
      <v-card-text>
        <overworks-table :overworks="visits"/>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" text @click="dialog = false">
          Сформировать документ
        </v-btn>
        <v-spacer/>
        <v-btn color="success" text @click="dialog = false">Ок</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import OverworksTable from "@/components/tables/overworks-table";

export default {
  name: "overwork-employee",
  components: {OverworksTable},

  props: {
    employee: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    visits: null,
    dialog: false,

    loading: false,
  }),

  watch: {
    dialog(v) {
      if (!v) {
        this.loading = false
      }
    }
  },

  methods: {
    fetchVisits() {
      if (!this.visits) {
        this.loading = true;

        this.$store.dispatch("report/fetchAllOverworksByEmployeeId", this.employee.id)
            .then((v) => this.visits = v)
            .finally(() => this.loading = false);
      }
    },
  },
};
</script>

<style scoped>
.btn-activator {
  margin: 0 0.5rem 0.5rem 0;
}
</style>