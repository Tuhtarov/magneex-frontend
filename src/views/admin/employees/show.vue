<template>
  <v-col>
    <v-card>
      <v-card-title>Сотрудник</v-card-title>
      <v-card-subtitle>Информация о сотруднике</v-card-subtitle>

      <v-container fluid>
        <v-row>
          <!--Данные сотрудника-->
          <v-col class="col-12 col-md-8">
            <people-info-card v-show="!empErr" :loading="loading" :employee="employee" />

            <simple-text-error
                v-if="empErr"
                :red-color="true"
                :message="empErr"
            />
          </v-col>

          <!--Панель с отчётами-->
          <v-col class="col-md-4" v-if="!empErr">
            <v-card elevation="0" :disabled="loading">
              <v-card-title>Отчёты</v-card-title>

              <v-card-text>
                <v-row no-gutters v-if="employee">
                  <visit-history :employee="employee"/>
                  <overwork-employee :employee="employee"/>
                  <tardy-employee :employee="employee"/>
                </v-row>

                <v-progress-circular indeterminate v-if="loading"/>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-divider/>

      <!--Недавняя история посещений-->
      <template v-if="employee">
        <v-card-title>История</v-card-title>
        <v-card-subtitle>Недавняя история посещений</v-card-subtitle>

        <v-card-text style="max-width: 882px">
          <time-line-short v-if="todayVisit" :visit="todayVisit"/>
          <simple-text-error
              v-else-if="visErr"
              :red-color="false"
              :message="visErr"
          />
        </v-card-text>
      </template>
    </v-card>
  </v-col>
</template>

<script>
import {mapActions} from "vuex";
import TimeLineShort from "@/components/cards/timeLineShort";
import PeopleInfoCard from "@/components/cards/peopleInfoCard";

// ошибки
import visitError from "@/api/Error/VisitError";
import employeeError from "@/api/Error/EmployeeError";
import SimpleTextError from "@/components/outputs/simple-text-error";

// отчёты
import VisitHistory from "@/components/dialogs/reports/visit-history";
import OverworkEmployee from "@/components/dialogs/reports/overwork/overwork-employee";
import TardyEmployee from "@/components/dialogs/reports/tardy/tardy-employee";

export default {
  name: "showEmployeePage",
  components: {
    SimpleTextError,
    PeopleInfoCard,
    TimeLineShort,
    VisitHistory,
    OverworkEmployee,
    TardyEmployee,
  },
  data: () => ({
    employee: null,
    todayVisit: null,
    empErr: null,
    visErr: null,
  }),
  methods: {
    ...mapActions({
      getEmployeeById: "employee/getEmployeeById",
      getTodayVisitByEmployeeId: "visit/fetchTodayByEmployeeId",
    }),
  },

  computed: {
    loading() {
      return !this.employee && !this.empErr;
    },
  },

  beforeMount() {
    const id = this.$route.params.id;

    if (id !== undefined) {
      this.getEmployeeById(id)
          .then((emp) => (this.employee = emp))
          .catch(
              (e) => (this.empErr = employeeError.getMessage(e?.response?.status))
          );

      this.getTodayVisitByEmployeeId(id)
          .then((visit) => (this.todayVisit = visit))
          .catch(
              (e) => (this.visErr = visitError.getMessage(e?.response?.status))
          );
    }
  },
};
</script>