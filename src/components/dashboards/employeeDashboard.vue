<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card elevation="4">
          <v-card-title>Главная страница для сотрудника</v-card-title>
          <v-card-subtitle>Здесь хранится быстрый доступ к QR коду</v-card-subtitle>
          <v-card-text>TODO</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="stretch">
      <v-col v-for="(card, i) in cards" :key="card.text + i" :cols="card.cols">
        <v-card elevation="4" height="100%">
          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>
          <v-card-text>{{ card.text }}</v-card-text>
          <v-card-actions class="mt-auto flex-wrap">
            <v-btn v-for="(button, i) in card.buttons" :key="button.label + i" shaped elevation="3">
              {{ button.label }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'EmployeeDashboard',
  data: () => ({
    cards: [
      {
        title: 'Карточка пример',
        subtitle: 'Подзаголовок карточки пример',
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur aut autem consectetur dolor, eum
          eveniet fugiat impedit itaque laudantium molestias nam odit optio placeat possimus rem tempore voluptatem
          voluptates!`,
        buttons: [
          {label: 'first btn'}, {label: 'second btn'}
        ],
        cols: 6
      }
    ]
  }),
}
</script>
