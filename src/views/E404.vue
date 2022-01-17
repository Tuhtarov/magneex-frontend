<template>
  <v-container fluid class="fill-height">
    <v-row class="justify-center">
      <v-col class="col-md-6 col-sm-10" style="max-width: 650px;">
        <v-card>
          <v-card-title>Ошибка 404</v-card-title>
          <v-card-text>Такого адреса не существует.</v-card-text>
          <v-img :src="errorLink" width="250" height="250" class="mx-auto"></v-img>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "E404",
  data: () => ({
    key: 'error 404',
    errorLink: 'https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg'
  })
}
</script>

<style scoped>

</style>