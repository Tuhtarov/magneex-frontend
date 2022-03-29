<template>
  <v-col>
    <v-card>
      <v-card-title>Журнал посещений</v-card-title>
      <v-card-subtitle>Здесь отображается история посещений</v-card-subtitle>

      <v-card-actions>
        <v-btn @click="loadVisitsWithTardies">С опозданием</v-btn>
        <v-btn @click="loadVisitsWithOverworks">С переработками</v-btn>

        <v-btn
            v-show="display !== tableType.visits"
            @click="loadAllVisits">Все посещения
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-card-text>
        <!--Все посещения-->
        <visits-table
            v-if="display === tableType.visits"
            :include-employee="true"
            :loading="visitsLoading"
            :visits="visits"
        />
        <!--Все переработки-->
        <overworks-table
            v-if="display === tableType.overworks"
            :loading="overworksLoading"
            :overworks="overworks"
        />
        <!--Все опоздания-->
        <tardies-table
            v-if="display === tableType.tardies"
            :loading="tardiesLoading"
            :tardies="tardies"
        />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import VisitsTable from "@/components/tables/visits-table";
import OverworksTable from "@/components/tables/overworks-table";
import TardiesTable from "@/components/tables/tardies-table";

import {mapGetters} from "vuex";

export default {
  name: "journal-visits",
  components: {VisitsTable, OverworksTable, TardiesTable},

  data: () => ({
    display: "visits",

    tableType: {
      visits: "visits",
      tardies: "tardies",
      overworks: "overworks"
    },
  }),

  computed: mapGetters({
    visits: 'visit/getAllVisits',
    tardies: 'report/getAllTardies',
    overworks: 'report/getAllOverworks',
    visitsLoading: 'visit/visitsIsLoading',
    tardiesLoading: 'report/tardiesIsLoading',
    overworksLoading: 'report/overworksIsLoading',
  }),

  methods: {
    loadAllVisits() {
      if (this.visits.length < 1) {
        this.$store.dispatch('visit/fetchAllHistory')
      }

      this.display = this.tableType.visits
    },

    loadVisitsWithTardies() {
      if (this.tardies.length < 1) {
        this.$store.dispatch('report/fetchAllTardies')
      }

      this.display = this.tableType.tardies
    },
    loadVisitsWithOverworks() {
      if (this.overworks.length < 1) {
        this.$store.dispatch('report/fetchAllOverworks')
      }

      this.display = this.tableType.overworks
    },
  },

  async beforeMount() {
    await this.loadAllVisits();
  }
}
</script>
