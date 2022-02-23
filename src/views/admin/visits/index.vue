<template>
  <v-col>
    <v-card>
      <v-card-title>Журнал посещений</v-card-title>
      <v-card-subtitle>Здесь отображается история посещений.</v-card-subtitle>
    </v-card>

    <v-card>
      <v-card-text>
        <visits-table :include-employee="true" :visits="visits"/>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import VisitsTable from "@/components/tables/visits-table";
import {mapGetters} from "vuex";

export default {
  name: "journal-visits",
  components: {VisitsTable},
  computed: mapGetters({
    visits: 'visit/getAllVisits'
  }),
  async beforeMount() {
    await this.$store.dispatch('visit/fetchAllHistory')
  }
}
</script>
