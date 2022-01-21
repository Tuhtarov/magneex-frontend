<template>
  <v-list nav :disabled="true">
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

      <v-divider />
      <v-list-item
        link
        v-for="(link, i) in navItem.links"
        :key="link.title + i"
      >
        <v-list-item-icon>
          <v-icon dark>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ link.title }}</v-list-item-title>
      </v-list-item>
      <v-divider />
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
          { icon: "mdi-format-list-checkbox", title: "Обзор" },
          { icon: "mdi-plus", title: "Добавить" },
        ],
      },
      {
        title: "Должности",
        icon: "mdi-weight-lifter",
        links: [
          { icon: "mdi-format-list-checkbox", title: "Обзор" },
          { icon: "mdi-plus", title: "Добавить" },
        ],
      },
      {
        title: "Пользователи",
        icon: "mdi-account-supervisor-circle",
        links: [
          { icon: "mdi-format-list-checkbox", title: "Обзор" },
          { icon: "mdi-plus", title: "Добавить" },
        ],
      },
       {
        title: "Роли",
        icon: "mdi-crown",
        links: [
          { icon: "mdi-format-list-checkbox", title: "Обзор" },
          { icon: "mdi-plus", title: "Добавить" },
        ],
      },
    ],
  }),
};
</script>

<style>
</style>