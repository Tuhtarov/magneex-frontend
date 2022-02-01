<template>
  <v-container fluid style="max-width: 1920px;">
    <v-row>
      <v-col>
        <v-card :loading="loading">
          <!--Форма создания-->
          <v-card-text>
            <job-position-create-form :maxWidth="'650'"/>
          </v-card-text>

          <!--Таблица-->
          <v-card-text>
            <job-positions-table v-if="!loading" :positions="jobPositions"/>
            <br>
            <p class="error--text" v-if="hasError">При получении данных возникла ошибка.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import JobPositionCreateForm from "@/components/forms/JobPositionCreateForm";
import JobPositionsTable from "@/components/tables/job-positions-table";

export default {
  name: 'job-positions',
  components: {JobPositionCreateForm, JobPositionsTable},
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
};
</script>