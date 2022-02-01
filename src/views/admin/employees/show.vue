<template>
  <v-card max-width="882">
    <v-card-title>Сотрудник</v-card-title>
    <v-card-subtitle>Информация о сотруднике</v-card-subtitle>
    <v-card-text>
      <people-info-card v-if="employee" :employee="employee" />
      <v-progress-circular v-else indeterminate />
    </v-card-text>
    <v-divider />
    <v-card-subtitle>История: </v-card-subtitle>
    <time-line-short />
    <v-card-actions>
      <v-btn text link color="primary">Вся история</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";
import TimeLineShort from "@/components/cards/timeLineShort";
import PeopleInfoCard from "@/components/cards/peopleInfoCard";

export default {
  name: "showEmployeePage",
  components: {PeopleInfoCard, TimeLineShort},
  data: () => ({
    employee: null,
  }),
  methods: {
    ...mapActions({getEmployeeById: 'employee/getEmployeeById'})
  },
  async mounted() {
    const id = this.$route.params.id;

    if (id !== undefined) {
      await this.getEmployeeById(id)
          .then(employee => this.employee = employee)
          .catch(error => console.dir(error));
    }
  }
}
</script>

<style scoped>

</style>