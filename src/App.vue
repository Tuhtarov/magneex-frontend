<template>
  <component :is="layout"/>
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
  beforeMount() {
    this.$store.dispatch('user/fetchCurrentUser');
  },
  mounted() {
    initTheme.apply(this);
  }
};
</script>
