<template>
  <v-card max-width="992">
    <v-card-title>Пользователи</v-card-title>
    <v-card-subtitle>Имеющие доступ к системе.</v-card-subtitle>
    <users-table v-if="users" :users="users" />
    <v-card-text v-else>
      <v-progress-circular indeterminate color="primary"/>
      {{users}}
    </v-card-text>
  </v-card>
</template>

<script>
import UsersTable from "@/components/tables/users-table";
import {mapGetters} from "vuex";
export default {
  components: {UsersTable},
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

<style>

</style>