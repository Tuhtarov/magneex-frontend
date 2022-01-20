<template>
  <v-card>
    <v-card-title>Создать сотрудника</v-card-title>
    <v-card-subtitle>Lorem ipsum dolor sit amet.</v-card-subtitle>

    <form class="mx-auto form__login">
      <v-text-field v-model="people.name" label="Имя" type="text"></v-text-field>
      <v-text-field v-model="people.family" label="Фамилия" type="text"></v-text-field>
      <v-text-field v-model="people.patronymic" label="Отчество" type="text"></v-text-field>
      <v-text-field v-model="people.birthday" label="День рождения" type="date"></v-text-field>
      <v-text-field v-model="people.email" label="Email" type="email"></v-text-field>
      <v-text-field v-model="people.phone" label="Телефон" type="password"></v-text-field>

      <div class="d-flex mt-4">
        <v-btn class="mr-4">Сохранить
          <v-icon dark right> mdi-checkbox-marked-circle</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </div>
    </form>
  </v-card>
</template>

<script>
export default {
  name: 'people-create-form',
  data: () => ({
    people: {
      name: '',
      family: '',
      patronymic: '',
      birthday: '',
      email: '',
      phone: ''
    }
  }),
  methods: {
    clear() {
      [...this.people].forEach(field => {
        console.log(field)
      })
    }
  }
};
</script>

<style>
</style>