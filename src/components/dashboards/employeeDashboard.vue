<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card elevation="4">
          <v-card-title>Добро пожаловать 😎</v-card-title>
          <v-card-subtitle>
            На данной странице вы можете просмотреть историю своих посещений
          </v-card-subtitle>

          <v-card-text style="max-width: 882px">
            <people-info-card :employee="currentEmployee" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <people-today-visit />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import peopleInfoCard from "@/components/cards/peopleInfoCard";
import peopleTodayVisit from "@/components/cards/peopleTodayVisit";

import { mapGetters } from "vuex";

export default {
  components: { peopleInfoCard, peopleTodayVisit },
  name: "EmployeeDashboard",
  data: () => ({

  }),
  computed: {
    ...mapGetters({
      currentEmployee: "user/getCurrentEmployee",
    }),
  },
};
</script>
