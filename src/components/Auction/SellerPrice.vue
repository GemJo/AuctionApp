<template>
  <v-card>
    <v-card-text class="pa-10">
      <FormPrice
          title-label="Precio mínimo que está dispuesto a vender:"
          @save="saveSellerPrice"
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

const saveSellerPrice = (price: number) => {
  emitter.emit('sellerPriceWasSaved', price);
  feedback.show('success', 'El precio mínimo del vendedor se ha guardado correctamente')
}
</script>
