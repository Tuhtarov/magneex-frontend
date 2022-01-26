<template>
  <v-sheet class="mt-2">
    <v-card
        :elevation="isDark ? '4' : '2'"
        :loading="positionsLoading"
        :disabled="positionsLoading">
      <v-card-title style="font-size: 1rem;">
        <v-icon>mdi-account</v-icon>
        Должность сотрудника
      </v-card-title>
      <v-card-subtitle>
        <span>выбор не обязателен</span>
      </v-card-subtitle>

      <v-card-text>
        <template v-if="!positionsLoading">
          <span v-if="value">Выбрано: <b>{{ selectedName }}</b></span>
          <span v-else>По умолчанию: <b>Стажёр</b></span>
        </template>
        <template v-else>
          <v-progress-circular color="primary" indeterminate/>
        </template>
      </v-card-text>

      <!--Компонент модального окна-->
      <v-dialog v-model="showDialog" scrollable max-width="300px" @input="updateId">
        <!--Кнопка открытия модалки-->
        <template v-slot:activator="{ on, attrs }">
          <v-card-actions>
            <v-spacer/>
            <v-btn v-bind="attrs" v-on="on">Выбрать</v-btn>
          </v-card-actions>
        </template>

        <!--Сама модалка-->
        <v-card>
          <v-card-title>Выберите должность</v-card-title>
          <v-divider/>
          <v-card-text style="height: 300px;">
            <v-radio-group v-model="selectedId" column>
              <v-radio
                  v-for="position in jobPositions"
                  :key="`${position.name}${position.id}`"
                  :label="position.name" :value="position.id"/>
            </v-radio-group>
          </v-card-text>

          <v-divider/>

          <v-card-actions>
            <v-btn color="light-green" text @click="onSave">
              Сохранить
            </v-btn>
            <v-spacer/>
            <v-btn color="red" text @click="showDialog = false">
              Закрыть
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-sheet>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "employeePositionChoose",
  props: {
    value: {
      type: Number
    }
  },
  data: () => ({
    selectedId: null,
    showDialog: false
  }),
  computed: {
    ...mapGetters({jobPositions: 'jobPosition/getJobPositions'}),
    positionsLoading() {
      return !this.jobPositions?.length > 0;
    },
    selectedName() {
      return this.jobPositions.reduce((p, c) => +c.id === +this.value ? p + c.name : p, '');
    },
    isDark() {
      return this.$vuetify.theme.dark;
    }
  },
  methods: {
    onSave() {
      this.showDialog = false
      this.$emit('change', this.selectedId)
    },
    updateId() {
      this.selectedId = this.value;
    }
  },
  async mounted() {
    await this.$store.dispatch('jobPosition/fetchJobPositions')
        .catch(e => console.dir(e));
  },
}
</script>

<style scoped>

</style>