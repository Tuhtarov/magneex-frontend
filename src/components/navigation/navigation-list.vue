<template>
  <v-list nav>
    <template v-for="item in navItems">
      <!--Одиночная ссылка-->
      <navigation-item
          v-if="item.single"
          :key="item.title"
          :navItem="item">
      </navigation-item>

      <!--Раскрывающиеся ссылки-->
      <v-list-group
          v-else
          :key="item.title"
          :prepend-icon="item.icon">

        <template v-slot:activator>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </template>

        <v-divider/>

        <navigation-item
            v-for="link in item.links"
            :key="link.title"
            :navItem="link">
        </navigation-item>
        <v-divider/>
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
import NavigationItem from '@/components/navigation/navigation-item-single';

export default {
  name: "navigationList",
  components: {NavigationItem},

  data: () => ({
    navItems: [
      {
        single: true,
        title: "Главная",
        icon: "mdi-home",
        routeName: 'main'
      },
      {
        single: true,
        title: "Сотрудники",
        icon: "mdi-account-group",
        routeName: 'employees'
      },
      {
        single: true,
        title: "Пользователи",
        icon: "mdi-account-supervisor-circle",
        routeName: 'users'
      },
      {
        single: true,
        title: "Должности",
        icon: "mdi-crown",
        routeName: 'job-positions'
      },
    ],
  }),
  methods: {}
};
</script>

<style>
</style>