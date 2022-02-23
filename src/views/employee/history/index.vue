<template>
  <v-col>
    <v-card>
      <v-card-title>История</v-card-title>
      <v-card-subtitle>
        Здесь отображается история посещений за выбранный период.
      </v-card-subtitle>

      <v-card-text style="max-width: 1024px;">
        <visits-table :visits="visitsOfEmployee" />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import VisitsTable from "@/components/tables/visits-table";
import {mapGetters} from "vuex";

export default {
  name: "history-index",
  components: {VisitsTable},
  computed: mapGetters({visitsOfEmployee: "visit/getAllCurrentEmployee"}),

  beforeMount() {
    this.$store.dispatch('visit/fetchAllByCurrentEmployee')
        .finally(() => (this.loading = false));
  },
};
</script>
