<template>
  <v-card>
    <v-card-title>{{title}}</v-card-title>
    <v-card-text>{{text}}</v-card-text>
    <v-img :src="errorImage" width="250" height="250" class="mx-auto"></v-img>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn dark @click="$router.push('/')">
        <span>На главную</span>
        <v-icon
            class="ms-2">
          mdi-home-circle
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "errorCard",
  props: {
    title: {
      type: String,
      default: 'Заголовок не задан'
    },
    text: {
      type: String,
      default: 'Текст ошибки не задан'
    },
  },
  data: () => ({
    errorImage: 'https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg'
  })
}
</script>

<style scoped>

</style>