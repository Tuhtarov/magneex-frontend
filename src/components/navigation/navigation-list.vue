<template>
  <v-list nav>
    <template v-for="route in navRoutes">
      <!--Одиночная ссылка-->
      <navigation-item
        v-if="!route.multiple"
        :key="route.title"
        :route-name="route.name"
        :nav-title="route.title"
        :nav-icon="route.icon"
      />
    </template>
  </v-list>
</template>

<script>
import NavigationItem from "@/components/navigation/navigation-item-single";
import { mapGetters } from "vuex";

export default {
  name: "navigationList",
  components: { NavigationItem },
  computed: {
    ...mapGetters({ currentRole: "user/getCurrentRole" }),
    navRoutes() {
      return this.currentRole ? this.fetchNavRoutes() : null;
    },
  },
  methods: {
    /** Формирование маршрутов из vue router */
    fetchNavRoutes() {
      let navRoutes = [];

      // проходимся по всем роутам из vue router
      this.$router.options.routes.forEach((route) => {
        const isNavLink = !!route?.meta?.navLink;

        if (isNavLink) {
          const routeForRole = route?.meta?.role;
          const { title, icon } = route?.meta?.navLink;

          // добавляем в результат объект для формирования ссылки
          if (this.currentRole ===  routeForRole || routeForRole === 'common') {
            navRoutes.push({
              name: route.name,
              title,
              icon,
            });
          }
        }
      });

      return navRoutes;
    },
  },
};
</script>
