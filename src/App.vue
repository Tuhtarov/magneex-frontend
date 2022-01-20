<template>
  <v-app>
    <component :is="layout" />
  </v-app>
</template>
<script>
import {initTheme} from '@/features/ThemeManager'

export default {
  name: 'App',
  computed: {
    // динамически подгружаем layout приложухи
    layout() {
      let name = this.$route.meta.layout || 'loginLayout';
      return () => import(`@/layouts/${name}.vue`)
    }
  },
  mounted() {
    initTheme.apply(this);
  }
};
</script>
