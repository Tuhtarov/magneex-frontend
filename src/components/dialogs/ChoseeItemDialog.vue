<template>
  <!--Компонент модального окна-->
  <v-dialog v-model="showDialog" scrollable max-width="300px">

    <!--Кнопка открытия модалки-->
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">Выбрать</v-btn>
    </template>

    <!--Сама модалка-->
    <v-card>
      <v-card-title>
        <slot/>
      </v-card-title>

      <v-divider/>

      <v-card-text style="height: 300px;">
        <v-radio-group column :value="value" @change="onChange">
          <v-radio
              v-for="item in items"
              :key="`${item.name}${item.id}`"
              :label="item.name" :value="item.id"/>
        </v-radio-group>
      </v-card-text>

      <v-divider/>

      <!-- Действия -->
      <v-card-actions>
        <v-spacer/>
        <v-btn color="red" text @click="showDialog = false">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ChooseItemDialog",

  props: {
    value: Number,
    items: Array,
  },

  data: () => ({
    showDialog: false
  }),

  methods: {
    onChange(id) {
      this.showDialog = false
      this.$emit('change', id)
    },
  }
}
</script>

<style scoped>

</style>