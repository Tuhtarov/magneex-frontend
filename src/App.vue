<template>
  <v-app>
    <component :is="layout" />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    // динамически подгружаем layout приложухи
    layout() {
      let name = this.$route.meta.layout || 'defaultLayout';
      return () => import(`@/layouts/${name}.vue`)
    }
  }
};
</script>
