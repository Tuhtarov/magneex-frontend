<template>
  <v-card elevation="4" outlined>
    <v-card-title>{{ fullName }}</v-card-title>
    <v-card-text class="d-flex flex-wrap">
      <div class="col-12 col-md-7 pt-0 ps-0">
        <p>Телефон: {{ employee.people.phone }}</p>
        <p>Email: {{ employee.people.email }}</p>
        <p>Должность: {{ employee.jobPosition ? employee.jobPosition.name : '-' }}</p>
        <p>Роль: {{ employee.role ? employee.role.name : '-' }}</p>
        <p>Дата рождения: {{ birthDay }}</p>
      </div>
      <v-spacer></v-spacer>
      <div class="d-none d-md-block pb-2">
        <v-img
            width="200"
            height="200"
            class="mb-2"
            alt="Сотрудник"
            src="https://polynect.com.ua/wp-content/uploads/2021/09/man.jpeg">
        </v-img>
      </div>
    </v-card-text>
  </v-card>
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
    },
    birthDay() {
      if (this.employee === null || this.employee.people === undefined) return '-';
      let fromEntity = new Date(this.employee.people.birthday);
      return fromEntity.toLocaleDateString('ru');
    },
  },
}
</script>
