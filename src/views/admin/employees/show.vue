<template>
  <v-col>
    <v-card>
      <v-card-title>Сотрудник</v-card-title>
      <v-card-subtitle>Информация о сотруднике</v-card-subtitle>

      <!--Данные сотрудника-->
      <v-card-text style="max-width: 882px;">
        <people-info-card v-if="employee" :employee="employee"/>
        <simple-text-error v-else-if="empErr" :red-color="true" :message="empErr"/>
      </v-card-text>

      <v-divider/>

      <!--Недавняя история посещений-->
      <template v-if="employee">
        <v-card-title>История</v-card-title>
        <v-card-subtitle>Недавняя история посещений</v-card-subtitle>

        <v-card-text style="max-width: 882px;">
          <time-line-short v-if="todayVisit" :visit="todayVisit"/>
          <simple-text-error v-else-if="visErr" :red-color="false" :message="visErr"/>
        </v-card-text>

        <v-card-actions>
          <v-btn text link color="primary">Вся история</v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-col>
</template>

<script>
import {mapActions} from "vuex";
import TimeLineShort from "@/components/cards/timeLineShort";
import PeopleInfoCard from "@/components/cards/peopleInfoCard";
import visitError from "@/api/Error/VisitError";
import employeeError from "@/api/Error/EmployeeError";
import SimpleTextError from "@/components/outputs/simple-text-error";

export default {
  name: "showEmployeePage",
  components: {SimpleTextError, PeopleInfoCard, TimeLineShort},
  data: () => ({
    employee: null,
    todayVisit: null,
    empErr: null,
    visErr: null
  }),
  methods: {
    ...mapActions({
      getEmployeeById: 'employee/getEmployeeById',
      getTodayVisitByEmployeeId: 'visit/fetchTodayByEmployeeId'
    })
  },
  beforeMount() {
    const id = this.$route.params.id;

    if (id !== undefined) {
      this.getEmployeeById(id).then(emp => this.employee = emp)
          .catch((e) => this.empErr = employeeError.getMessage(e?.response?.status));

      this.getTodayVisitByEmployeeId(id)
          .then(visit => this.todayVisit = visit)
          .catch(e => this.visErr = visitError.getMessage(e?.response?.status));
    }
  }
}
</script>

<style scoped>

</style>