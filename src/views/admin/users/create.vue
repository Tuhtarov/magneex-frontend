<template>
  <v-card width="992">
    <v-card-title>Создать пользователя</v-card-title>
    <v-card-subtitle>Введите логин, пароль, и выберите сотрудника.</v-card-subtitle>
    <user-create-form />
  </v-card>
</template>

<script>
import UserCreateForm from "@/components/forms/userCreateForm";
export default {
  name: 'users-create',
  components: {UserCreateForm}
}
</script>

<style>

</style>