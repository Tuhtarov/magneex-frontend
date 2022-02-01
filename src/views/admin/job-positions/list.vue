<template>
  <v-card
      :loading="loading"
      max-width="1360">
    <v-card-title>Должности</v-card-title>

    <job-positions-table v-if="!loading" :positions="jobPositions"/>

    <v-card-text v-if="hasError">
      При получении данных возникла ошибка.
    </v-card-text>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import JobPositionsTable from "@/components/tables/job-positions-table";

export default {
  name: 'employees-list',
  components: {JobPositionsTable},
  data: () => ({
    loading: true,
    hasError: false
  }),
  computed: mapGetters({jobPositions: 'jobPosition/getJobPositions'}),
  methods: mapActions({fetchPositions: 'jobPosition/fetchJobPositions'}),
  async beforeMount() {
    await this.fetchPositions()
        .catch(() => this.hasError = true)
        .finally(() => this.loading = false);
  }
}
</script>

<style>

</style>