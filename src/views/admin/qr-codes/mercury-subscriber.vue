<template>
  <v-col>
    <v-card>
      <v-card-title>Подписка на mercury publisher-а</v-card-title>
      <v-card-text v-if="!errMsg">
        <pre>
        <code>
          {{ mercuryMessages }}
        </code>
      </pre>
      </v-card-text>
      <v-card-text v-else>
        <text-error :message="errMsg"/>
      </v-card-text>

      <v-card-actions>
        <v-btn color="error" @click="stopSession">
          Стоп
        </v-btn>

        <v-btn color="error" @click="connect">
          connection
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import qrSubscriber from "@/api/QR/QrSubscriber";
import TextError from "@/components/outputs/text-error";

export default {
  name: "mercury-subscriber",
  components: {TextError},
  data: () => ({
    mercuryMessages: [],
    eventSource: null,
    qrSubscriber: null,
    errMsg: null
  }),
  methods: {
    stopSession() {
      qrSubscriber.stopSession();
    },
    connect() {
      // подписываемся на отслеживание обновлений
      qrSubscriber.startSession(event => {
        this.mercuryMessages.push(event)
      });
    },
  },
  beforeMount() {
    this.connect();
  },
  destroyed() {
    this.stopSession();
  }
}
</script>