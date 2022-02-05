<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row class="align-center justify-center">
          <router-view/>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "qrLayout",
};
</script>
