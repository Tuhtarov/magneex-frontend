<template>
  <v-card class="span-opacity" outlined>
    <v-card-text>
      <p><span>Имя:</span> {{ employee.people.name }}</p>
      <p><span>Фамилия:</span> {{ employee.people.family }}</p>
      <p><span>Отчество:</span> {{ employee.people.patronymic }}</p>
      <p><span>Дата рождения:</span> {{ birthDay }}</p>
      <p><span>Телефон:</span> {{ employee.people.phone }}</p>
      <p><span>Email:</span> {{ employee.people.email }}</p>
      <v-divider dark /><br>
      <p><span>Должность:</span> {{ employee.job_position ? employee.job_position.name : "-" }}</p>
      <p><span>Роль:</span> {{ employee.role ? employee.role.name :  "-" }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "peopleShortInfoCard",
  props: {
    employee: {
      type: Object
    }
  },
  computed: {
    birthDay() {
      let fromEntity = new Date(this.employee.people.birthday);
      return fromEntity.toLocaleDateString('ru');
    },
  }
}
</script>

<style scoped>
.span__accent span {
  font-weight: bold;
}
</style>