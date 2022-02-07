<template>
  <v-card elevation="7">
    <v-card-title class="justify-center">Отсканируй это 🙃</v-card-title>

    <v-card-text>
      <div v-if="qr" class="qr--container">
        <vue-qr
            :text="qr"
            :size="300"
        />
      </div>
    </v-card-text>

    <v-card-text v-if="errMsg">
      <text-error :message="errMsg"/>
    </v-card-text>
  </v-card>
</template>

<script>
import qrSubscriber from "@/api/QR/QrSubscriber";
import TextError from "@/components/outputs/text-error";
import {mapGetters, mapMutations} from "vuex";
import VueQr from "vue-qr";
import qrScanner from "../../../api/QR/QrScanner";

export default {
  name: "mercury-subscriber",
  components: {TextError, VueQr},
  data: () => ({
    loading: true,
    errMsg: null,
  }),
  computed: {
    ...mapGetters({qr: "qr/getQR"}),
  },
  methods: {
    ...mapMutations({setQr: "qr/setQR"}),
    closeSession() {
      qrSubscriber.closeSession();
    },
    connect() {
      qrSubscriber.startSession(
          (qr) => this.setQr(qrScanner.getScanUrl(qr.token)),
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