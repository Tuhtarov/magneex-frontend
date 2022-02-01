<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12 col-md-8">
        <v-card elevation="5">
          <v-card-title>{{ fullName }}</v-card-title>
          <v-card-text>
            <p>Дата рождения: {{ employee.people.birthday }}</p>
            <p>Телефон: {{ employee.people.phone }}</p>
            <p>Email: {{ employee.people.email }}</p>
            <!--            <p>Логин: {{ employee.user.login }}</p>-->
            <!--            <p>Роль: {{ employee.role.name }}</p>-->
            <!--            <p>Должность: {{ employee.jobPosition.name }}</p>-->
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 d-none d-md-flex col-md-4">
        <v-spacer/>
        <v-card elevation="5">
          <v-img
              width="200"
              height="200"
              src="https://polynect.com.ua/wp-content/uploads/2021/09/man.jpeg">
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "peopleInfoCard",
  props: {
    employee: {type: Object, default: null}
  },
  computed: {
    fullName() {
      if (this.employee !== null) {
        const {name, family, patronymic} = this.employee.people;
        return `${family} ${name} ${patronymic}`;
      }

      return '';
    }
  }
}
</script>

<style scoped>
.span__accent span {
  font-weight: bold;
}
</style>