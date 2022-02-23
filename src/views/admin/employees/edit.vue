<template>
  <v-col>
    <v-row>
      <employee-form v-if="employee" :employee="employee"/>
    </v-row>
  </v-col>
</template>

<script>
import {mapActions} from "vuex";
import employeeForm from "@/components/forms/employeeForm";

export default {
  name: "employee-edit",
  components: {employeeForm},

  data: () => ({
    employee: null
  }),

  methods: {
    ...mapActions({getEmployeeById: 'employee/getEmployeeById'})
  },

  beforeMount() {
    let id = this.$route.params?.id;

    this.getEmployeeById(+id)
        .then(r => this.employee = r)
        .catch(e => console.dir(e));
  }
}
</script>

<style scoped>

</style>