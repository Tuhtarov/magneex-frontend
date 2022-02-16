<template>
  <v-card elevation="7">
    <v-card-title class="justify-center">Отсканируй это 🙃</v-card-title>

    <v-card-text>
      <div v-if="qrUrl" class="qr--container">
        <vue-qr :text="qrUrl" :size="qrSize"/>
      </div>

      {{qrUrl}}
    </v-card-text>

    <v-card-text v-if="errMsg">
      <text-error :message="errMsg"/>
    </v-card-text>
  </v-card>
</template>

<script>
import VueQr from "vue-qr";
import TextError from "@/components/outputs/text-error";
import qrUrlManager from "@/api/QR/QrUrlManager";
import qrSubscriber from "@/api/QR/QrSubscriber";

export default {
  name: "mercury-subscriber",
  components: {TextError, VueQr},
  data: () => ({
    loading: true,
    qrSize: 300,
    qrUrl: null,
    errMsg: null,
  }),
  methods: {
    closeSession() {
      qrSubscriber.closeSession();
    },
    connect() {
      qrSubscriber.startSession(
          (qr) => this.qrUrl = qrUrlManager.getScanUrl(qr.token), 
          (err) => this.errMsg = err
      );
    },
  },
  beforeMount() {
    this.connect();
  },
  destroyed() {
    this.closeSession();
  },
};
</script>

<style scoped>
.qr--container {
  display: flex;
  margin: auto auto;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 400px;
  max-width: 400px;
}
</style>