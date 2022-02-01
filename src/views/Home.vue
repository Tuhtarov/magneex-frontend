<template>
  <component :is="dashboard"/>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  data: () => ({dashboard: null}),
  computed: {
    ...mapGetters({user: 'user/getUser'})
  },
  watch: {
    user() {
      // const role = this.user;
      // this.dashboard = () => import(`@/components/dashboards/${role}Dashboard.vue`)
      this.dashboard = () => import(`@/components/dashboards/adminDashboard.vue`)
    }
  }
}
</script>
