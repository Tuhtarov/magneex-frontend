<template>
      <v-card elevation="7">
        <v-card-title class="justify-center">
          Отсканируй это 🙃
        </v-card-title>
        <v-img
            class="d-block mx-auto"
            contain
            height="400" width="400"
            color="error" alt="QR code"
            src="https://ecoprint.spb.ru/wp-content/uploads/qr-%D0%BA%D0%BE%D0%B4.gif">
        </v-img>
      </v-card>
</template>

<script>
// import {mapActions, mapGetters} from "vuex";

export default {
  name: 'job-positions',
  data: () => ({
    loading: true,
    hasError: false
  }),
  // computed: mapGetters({jobPositions: 'jobPosition/getJobPositions'}),
  // methods: mapActions({fetchPositions: 'jobPosition/fetchJobPositions'}),
  async beforeMount() {
    // await this.fetchPositions()
    //     .catch(() => this.hasError = true)
    //     .finally(() => this.loading = false);
  }
};
</script>