<template>
  <component v-if="mainComponent" :is="mainComponent"/>
  <v-progress-circular class="mx-auto my-5" v-else-if="loadingMainComponent" indeterminate/>

  <!--Если не был подгружен компонент для домашней страницы текущего пользователя-->
  <v-col v-else-if="!loadingMainComponent && !mainComponent" cols="6" class="mb-auto">
    <v-sheet>
      <text-error :message="'Не удалось прогрузить компонент домашней страницы'"/>
    </v-sheet>
  </v-col>
</template>

<script>
import TextError from "@/components/outputs/text-error";

export default {
  name: 'Home',
  components: {TextError},
  data: () => ({
    mainComponent: null,
    loadingMainComponent: true
  }),
  methods: {
    loadHomeForRole(name) {
      this.mainComponent = () => import(`@/components/dashboards/${name}Dashboard.vue`);
    },
  },
  beforeMount() {
    this.$store.dispatch('user/fetchCurrentUser').then(user => {
      const roleName = user?.employee?.role?.name;

      if (roleName) {
        this.loadHomeForRole(roleName)
      }

      this.loadingMainComponent = false;
    });
  },
}
</script>