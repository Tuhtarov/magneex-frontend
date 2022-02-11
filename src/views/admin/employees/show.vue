<template>
  <v-col>
    <v-card v-if="!fetchError">
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

    <!--Ошибка, если сотрудник не был получен-->
    <v-card v-else>
      <v-card-text>
        <text-error message="При получении данных от сервера возникла ошибка."/>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import {mapActions} from "vuex";
import TimeLineShort from "@/components/cards/timeLineShort";
import PeopleInfoCard from "@/components/cards/peopleInfoCard";
import TextError from "@/components/outputs/text-error";

export default {
  name: "showEmployeePage",
  components: {TextError, PeopleInfoCard, TimeLineShort},
  data: () => ({
    employee: null,
    fetchError: false
  }),
  methods: {
    ...mapActions({getEmployeeById: 'employee/getEmployeeById'})
  },
  mounted() {
    const id = this.$route.params.id;

    if (id !== undefined) {
      this.getEmployeeById(id)
          .then(employee => this.employee = employee)
          .catch(() => this.fetchError = true);
    }
  }
}
</script>

<style scoped>

</style>