<template>
  <v-list-item link :to="{name: navItem.routeName}">
    <v-list-item-icon>
      <v-icon>{{ navItem.icon }}</v-icon>
    </v-list-item-icon>

    <v-list-item-title>{{ navItem.title }}</v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: 'NavigationItemSingle',
  props: {
    navItem: {
      type: Object
    }
  }
};
</script>
