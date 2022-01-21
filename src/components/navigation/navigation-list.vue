<template>
  <v-list nav>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-home</v-icon>
      </v-list-item-icon>

      <v-list-item-title>Главная</v-list-item-title>
    </v-list-item>

    <v-list-group
        v-for="(navItem, i) in navItems"
        :key="navItem.title + i"
        :prepend-icon="navItem.icon"
    >
      <template v-slot:activator>
        <v-list-item-title>{{ navItem.title }}</v-list-item-title>
      </template>

      <v-divider/>

      <v-list-item
          v-for="(link, i) in navItem.links"
          :key="link.title + i"
          :to="{name: link.name}"
          link>
        <v-list-item-icon>
          <v-icon dark>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ link.title }}</v-list-item-title>
      </v-list-item>

      <v-divider/>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  name: "navigationList",
  data: () => ({
    navItems: [
      {
        title: "Сотрудники",
        icon: "mdi-account-group",
        links: [
          {icon: "mdi-format-list-checkbox", title: "Обзор", name: 'employees-list'},
          {icon: "mdi-plus", title: "Добавить", name: 'employees-create'},
        ],
      },
      {
        title: "Пользователи",
        icon: "mdi-account-supervisor-circle",
        links: [
          {icon: "mdi-format-list-checkbox", title: "Обзор", name: 'users-list'},
          {icon: "mdi-plus", title: "Добавить", name: 'users-create'},
        ],
      },
      {
        title: "Должности",
        icon: "mdi-crown",
        links: [
          {icon: "mdi-format-list-checkbox", title: "Обзор", name: 'responsibilities-list'},
          {icon: "mdi-plus", title: "Добавить", name: 'responsibilities-create'},
        ],
      },
    ],
  }),
  methods: {
  }
};
</script>

<style>
</style>