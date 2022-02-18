<template>
  <v-card elevation="4">
    <v-card-title>Сегодняшняя история</v-card-title>

    <v-card-text v-if="todayVisit" style="max-width: 882px">
      <time-line-short :visit="todayVisit" />
    </v-card-text>

    <v-card-text>
      <v-progress-circular v-if="visitLoading" indeterminate />
      <template v-else>
        <text-error v-if="hasError" :message="'Есть ошибка при загрузке.'" />
        <p v-if="!hasError && !todayVisit">
          > Вероятно, вы сегодня ещё не посещали предприятие.
        </p>
      </template>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="goHistory">Вся история</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import timeLineShort from "@/components/cards/timeLineShort";
import textError from "@/components/outputs/text-error";

import { mapGetters } from "vuex";

export default {
  name: "people-today-visit",
  components: { timeLineShort, textError },
  data: () => ({
    visitLoading: true,
    hasError: null,
  }),
  computed: {
    ...mapGetters({
      todayVisit: "visit/getTodayCurrentEmployee",
    }),
  },
  methods: {
    goHistory() {
      this.$router.push({ name: "my-visits" });
    },
  },
  beforeMount() {
    this.$store
      .dispatch("visit/fetchTodayByCurrentEmployee")
      .catch(() => (this.hasError = true))
      .finally(() => (this.visitLoading = false));
  },
};
</script>

<style>
</style>