<template>
  <v-card>
    <v-card-text class="pa-10">
      <FormPrice
        title-label="Precio máximo que está dispuesto a pagar:"
        @save="savePurchasePrice"
      />
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import FormPrice from "@/components/Auction/FormPrice.vue";
import { getCurrentInstance } from "vue";
import { useFeedbackStore } from "@/stores/feedback";

const emitter = getCurrentInstance()?.proxy?.emitter;
const feedback = useFeedbackStore();

const savePurchasePrice = (price: number) => {
  emitter.emit('purchasePriceWasSaved', price);
  feedback.show('success', 'El precio máximo del comprador se ha guardado correctamente')
}
</script>