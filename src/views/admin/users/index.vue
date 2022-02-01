<template>
  <v-container style="max-width: 1920px;">
    <v-row>
      <v-col>
        <v-card>
          <!--Форма создания пользователя-->
          <v-card-title>Создать пользователя</v-card-title>
          <v-card-subtitle>
            Введите логин, пароль, и выберите сотрудника.
          </v-card-subtitle>

          <v-card-text style="max-width: 992px;">
            <user-create-form/>
          </v-card-text>

          <!--Таблица с пользователями-->
          <v-card-title>Пользователи</v-card-title>
          <v-card-text>
            <users-table v-if="users" :users="users"/>
            <v-progress-circular v-else indeterminate color="primary"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import UsersTable from "@/components/tables/users-table";
import UserCreateForm from "@/components/forms/userCreateForm";

export default {
  components: {UsersTable, UserCreateForm},
  computed: {
    ...mapGetters({users: 'user/getUsers'})
  },
  async mounted() {
    this.$store.dispatch('user/fetchUsers')
        .catch(error => console.dir(error))
    // .then(r => console.dir(r));
  },

}
</script>