<template>
  <v-dialog
    v-model:model-value="enableResult"
    transition="dialog-bottom-transition"
    width="400"
    @update:model-value="resetValues"
  >
    <v-card class="check-sale__result" v-show="enableResult">
      <v-toolbar
        :color="getColor()"
        :title="getTitle()"
        class="text-center mx-0"
      />
      <v-card-text>
        <p>Comprador<br/><span>{{ getPrice(purchasePrice) }}€</span></p>
        <DealIcon :color="getColor()" />
        <p>Vendedor<br/><span>{{ getPrice(sellerPrice) }}€</span></p>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-btn
    class="auction-match"
    block
    color="primary-darken-1"
    @click="checkSale"
  >
    Comprobar
  </v-btn>
</template>
<script setup lang="ts">
import { onBeforeMount, getCurrentInstance, ref, onBeforeUnmount } from "vue";
import { useFeedbackStore } from "@/stores/feedback";
import DealIcon from "@/components/Misc/Icons/DealIcon.vue";

const emitter = getCurrentInstance()?.proxy?.emitter;
const feedback = useFeedbackStore();

const purchasePrice = ref<number | undefined>();
const sellerPrice = ref<number | undefined>();
const enableResult = ref<boolean>(false);

function canShowResult() {
  let message: string | null = '';
  if (!sellerPrice.value) {
    message = 'Falta por introducir el precio mínimo del vendedor';
  }

  if (!purchasePrice.value) {
    message = 'Falta por introducir el precio máximo del comprador';
  }

  if (message) {
    feedback.show('error', message);
    return false
  }

  return true;
}

const checkSale = () => {
  if (!canShowResult()) {
    return;
  }
  enableResult.value = true;
}

const getPrice = (price: number | undefined) => {
  if (!price) {
    return '';
  }

  const priceSplit =  price.toString().split('.');
  return `${priceSplit[0]}.${priceSplit[1]?.padEnd(2, '0') || '00'}`;
}

function thereIsADeal() {
  return purchasePrice.value! >= sellerPrice.value!;
}

const getColor = () => {
  return thereIsADeal() ? '#43A047' : '#B71C1C';
}

const getTitle = () => {
  return thereIsADeal() ? '¡Enhorabuena! Hay trato :)' : 'Los sentimos, no ha habido trato :(';
}

const resetValues = () => {
  emitter.emit('resetPriceIsNeeded');
  purchasePrice.value = undefined;
  sellerPrice.value = undefined;
}

function savePurchasePrice(price: number) {
  purchasePrice.value = price;
}
function saveSellerPrice(price: number) {
  sellerPrice.value = price;
}
onBeforeMount(() => {
  emitter.on('purchasePriceWasSaved', savePurchasePrice);
  emitter.on('sellerPriceWasSaved', saveSellerPrice);
})
onBeforeUnmount(() => {
  emitter.off('purchasePriceWasSaved', savePurchasePrice);
  emitter.off('sellerPriceWasSaved', saveSellerPrice);
})
</script>