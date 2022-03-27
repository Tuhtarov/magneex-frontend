<template>
  <v-list-item link :to="{name: routeName}">
    <v-list-item-icon>
      <v-icon>{{ navIcon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-title>{{ navTitle }}</v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: 'NavigationItemSingle',
  props: {
    routeName: String,
    navTitle: String,
    navIcon: String
  }
};
</script>
