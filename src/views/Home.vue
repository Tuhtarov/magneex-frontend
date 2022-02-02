<template>
  <component :is="dashboard"/>
<!--  <text-error v-show="dashboard === null" :message="'Не удалось прогрузить компонент домашней страницы'"/>-->
</template>

<script>
import {mapGetters} from "vuex";
import TextError from "@/components/outputs/text-error";

export default {
  name: 'Home',
  components: {TextError},
  data: () => ({
    dashboard: null
  }),
  computed: {
    ...mapGetters({currentUser: 'user/getCurrentUser'}),
  },
  methods: {
    loadHomeForRole(name) {
        this.dashboard = () => import(`@/components/dashboards/${name}Dashboard.vue`);
    },
  },
  mounted() {
    let name = this.currentUser?.role;
    console.log(name)
    if (name) {
      this.loadHomeForRole(name)
    }
  }
}
</script>