<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Сотрудник</v-card-title>
          <v-card-subtitle>Информация о сотруднике</v-card-subtitle>

          <!--Данные сотрудника-->
          <v-card-text style="max-width: 882px;">
            <people-info-card v-if="employee" :employee="employee"/>
            <v-progress-circular v-else indeterminate/>
          </v-card-text>

          <v-divider/>

          <!--Недавняя история посещений-->
          <v-card-title>История</v-card-title>
          <v-card-subtitle>Недавняя история посещений</v-card-subtitle>
          <v-card-text style="max-width: 882px;">
            <time-line-short/>
          </v-card-text>

          <v-card-actions>
            <v-btn text link color="primary">Вся история</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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