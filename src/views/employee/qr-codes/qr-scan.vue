<template>
  <v-col>
    <v-card>
      <v-card-title>{{ titleContent }}</v-card-title>
      <v-card-subtitle v-show="subTitleContent">{{ subTitleContent }}</v-card-subtitle>

      <v-card-text style="max-width: 882px;">
        <v-progress-circular v-show="qrScanning" indeterminate/>

        <text-error v-if="errorMessage" :message="errorMessage"/>

        <visit-after-scan v-if="todayVisit && !errorMessage" :visit-time="todayVisit.currentTime"/>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="goHome" color="primary">На главную</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import qrUrlManager from "@/api/QR/QrUrlManager";
import getErrorMessage from "@/api/QR/QrErrorMessages";
import {mapActions, mapGetters} from "vuex";
import TextError from "@/components/outputs/text-error";
import VisitAfterScan from "@/components/cards/visitAfterScan";

const scanState = {
  scanning: 'Сканирование...',
  scanSuccess: 'Посещение зарегистрировано.',
  scanError: 'Посещение не зарегистрировано.'
}

export default {
  name: "employeeScan",
  components: {VisitAfterScan, TextError},
  data: () => ({
    titleContent: null,
    subTitleContent: null,
    qrScanning: true,
    errorMessage: null,
  }),
  computed: {
    token() {
      return this.$route.params.token ?? null;
    },
    ...mapGetters({
      todayVisit: 'visit/getTodayVisit'
    })
  },
  methods: {
    ...mapActions({
      setTodayVisit: "visit/setTodayVisit",
    }),
    goHome() {
      this.$router.push({name: 'home'});
    },
  },
  beforeMount() {
    this.titleContent = scanState.scanning

    qrUrlManager
        .scan(this.token)
        .then((visit) => {
          this.setTodayVisit(visit);
          this.titleContent = scanState.scanSuccess
          this.subTitleContent = 'Не забывайте сканировать QR :)'
        })
        .catch((e) => {
          this.titleContent = scanState.scanError
          this.errorMessage = getErrorMessage(e?.response?.status)
        });

    this.qrScanning = false
  },
};
</script>