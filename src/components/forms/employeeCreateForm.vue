<template>
  <v-card style="max-width: 992px;">
    <v-card-title>Создать сотрудника</v-card-title>
    <v-card-subtitle>Заполните все поля, и нажмите кнопку сохранить.</v-card-subtitle>
    <form class="mx-auto form__login px-4 pb-5">
      <v-row>
        <v-col>
          <v-text-field v-model="people.name" label="Имя" type="text"></v-text-field>
          <v-text-field v-model="people.family" label="Фамилия" type="text"></v-text-field>
          <v-text-field v-model="people.patronymic" label="Отчество" type="text"></v-text-field>
          <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="people.birthday"
              persistent
              width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="people.birthday"
                  label="День рождения"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="people.birthday" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Отмена
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(people.birthday)">
                Ок
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col>
          <v-text-field v-model="people.email" label="Email" type="email"></v-text-field>
          <v-text-field v-model="people.phone" label="Телефон" type="password"></v-text-field>
        </v-col>
      </v-row>

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
  name: 'employees-create-form',
  data: () => ({
    people: {
      name: '',
      family: '',
      patronymic: '',
      birthday: '',
      email: '',
      phone: ''
    },
    modal: null
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