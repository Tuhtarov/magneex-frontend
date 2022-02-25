<template>
  <v-col class="col-12 col-md-7 col-lg-8">
    <v-card elevation="3">
      <v-card-title>
        {{ employee ? 'Редактирование' : 'Добавление' }} сотрудника.
      </v-card-title>
      <v-card-subtitle>
        Заполните все поля, и нажмите кнопку {{ actionText }}.
      </v-card-subtitle>

      <v-form class="mx-auto form__login px-4 pb-5">
        <v-row align-content="stretch">
          <v-col class="col-12 col-sm-6">
            <v-text-field
                v-model="family"
                label="Фамилия"
                required
                @input="$v.family.$touch()"
                @blur="$v.family.$touch()"
                :error-messages="familyErrors"
            />

            <v-text-field
                v-model="name"
                label="Имя"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
                :error-messages="nameErrors"
            />

            <v-text-field
                v-model="patronymic"
                label="Отчество"
                required
                @input="$v.patronymic.$touch()"
                @blur="$v.patronymic.$touch()"
                :error-messages="patronymicErrors"
            />

            <v-dialog
                ref="dialog"
                v-model="datePicker"
                :return-value.sync="birthday"
                width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="birthday"
                    label="День рождения"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @input="$v.birthday.$touch()"
                    @blur="$v.birthday.$touch()"
                    :error-messages="birthdayErrors"
                />
              </template>

              <v-date-picker v-model="birthday" scrollable locale="ru-RU">
                <v-btn text color="error" @click="datePicker = false">
                  Отмена
                </v-btn>
                <v-spacer/>
                <v-btn text color="success" @click="$refs.dialog.save(birthday)">
                  Ок
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col class="col-12 col-sm-6">
            <v-text-field
                v-model="email"
                label="Email"
                type="email"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                :error-messages="emailErrors"
            />

            <v-text-field
                v-model="phone"
                label="Телефон"
                @input="$v.phone.$touch()"
                @blur="$v.phone.$touch()"
                :error-messages="phoneErrors"
            />
          </v-col>
        </v-row>
        <v-divider class="my-2"/>

        <!--Выбор должности и роли-->
        <v-row>
          <v-col class="col-12 col-sm-6">
            <choose-card title="должность" v-model="jobPositionId" :items="jobPositions"/>
          </v-col>

          <v-col class="col-12 col-sm-6">
            <choose-card title="роль" v-model="roleId" :items="roles"/>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="d-flex flex-wrap">
            <v-btn @click="submit" type="button" color="primary" class="mr-4">
              {{ actionText }}
              <v-icon dark right> mdi-checkbox-marked-circle</v-icon>
            </v-btn>
            <v-spacer/>
            <v-btn @click="clear" icon>
              <v-icon dark>mdi-cached</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
import {minLength, required, email, maxLength} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import ChooseCard from "@/components/cards/chooseCard";
import {mapActions, mapGetters} from "vuex";
import dateFormat from 'dateformat';

const defaultRule = {required, minLength: minLength(3), maxLength: maxLength(200)};
const phone = (value) => (/^((8|\+7)?[0-9]{5,10}$)/).test(value)

const validations = {
  name: defaultRule,
  family: defaultRule,
  patronymic: defaultRule,
  email: {required, email: email},
  phone: {required, minLength: minLength(11), maxLength: maxLength(12), phone},
  birthday: {required}
}

export default {
  name: "employee-form",
  components: {ChooseCard},
  mixins: [validationMixin],
  validations: validations,

  props: {
    employee: Object
  },

  data: () => ({
    name: '',
    family: '',
    patronymic: '',
    birthday: '',
    email: '',
    phone: '',
    jobPositionId: null,
    roleId: null,

    datePicker: null,
  }),

  computed: {
    ...mapGetters({
      roles: 'role/getRoles',
      jobPositions: 'jobPosition/getJobPositions'
    }),

    nameErrors() {
      return this.validate(this.$v.name);
    },
    familyErrors() {
      return this.validate(this.$v.family);
    },
    patronymicErrors() {
      return this.validate(this.$v.patronymic);
    },
    birthdayErrors() {
      return this.validate(this.$v.birthday);
    },
    emailErrors() {
      return this.validate(this.$v.email);
    },
    phoneErrors() {
      return this.validate(this.$v.phone)
    },

    actionText() {
      return this.employee ? 'сохранить' : 'добавить';
    },
  },

  methods: {
    ...mapActions({
      createEmployee: 'employee/createEmployee',
      editEmployee: 'employee/editEmployee'
    }),

    async submit() {
      this.$v.$touch();
      if (this.$v.$error) return;

      if (this.employee) {
        const editData = {
          id: this.employee.id,
          data: {
            people_data: this.getPeopleData(),
            ...this.getRelatedData()
          }
        };

        await this.editEmployee(editData);
      } else {
        await this.createEmployee(this.getEmployee());
      }
    },

    validate(input) {
      const errors = [];

      const {$dirty, $params, required, minLength, maxLength, email, phone} = input;

      if ($dirty) {
        if (required !== undefined) {
          !required && errors.push("Поле обязательно.");
        }

        if (minLength !== undefined) {
          !minLength && errors.push(`Минимальное количество символов: ${$params.minLength.min}`);
        }

        if (email !== undefined) {
          !email && errors.push('Введите корректный email адрес.')
        }

        if (phone !== undefined) {
          !phone && errors.push('Введите корректный номер телефона. Пример: 89114445566');
        }

        if (maxLength !== undefined) {
          !maxLength && errors.push(`Максимальная длина номера телефона: ${$params.maxLength.max}`)
        }
      }

      return errors;
    },

    getPeopleData() {
      return {
        name: this.name,
        family: this.family,
        patronymic: this.patronymic,
        birthday: this.birthday,
        email: this.email,
        phone: this.phone,
      }
    },

    getRelatedData() {
      return {
        job_position_id: this.jobPositionId,
        role_id: this.roleId,
      }
    },

    getEmployee() {
      return {
        ...this.getPeopleData(),
        ...this.getRelatedData()
      };
    },

    clear() {
      this.name = '';
      this.family = '';
      this.patronymic = '';
      this.birthday = '';
      this.email = '';
      this.phone = '';
      this.jobPositionId = null;
      this.roleId = null;
      this.$v.$reset();
    },
  },

  beforeMount() {
    if (this.employee) {
      const {people: {name, family, patronymic, birthday, email, phone}, jobPosition, role} = this.employee;

      this.name = name;
      this.family = family;
      this.patronymic = patronymic;
      this.email = email;
      this.phone = phone;
      this.birthday = dateFormat(new Date(birthday), 'yyyy-mm-dd');
      this.jobPositionId = jobPosition?.id;
      this.roleId = role?.id;
    }

    this.$store.dispatch('role/fetchRoles')
    this.$store.dispatch('jobPosition/fetchJobPositions')
  },
}
</script>

<style scoped>

</style>