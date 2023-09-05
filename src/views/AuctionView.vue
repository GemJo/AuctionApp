<template>
  <div class="auction">
    <v-tabs v-model="tab" fixed-tabs hide-slider>
      <v-tab :value="UserTabs.purchaser">Comprador</v-tab>
      <v-tab :value="UserTabs.seller">Vendedor</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="UserTabs.purchaser">
        <purchaser-price />
      </v-window-item>
      <v-window-item :value="UserTabs.seller">
        <seller-price />
      </v-window-item>
    </v-window>
    <CheckSale />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import PurchaserPrice from "@/components/Auction/PurchaserPrice.vue";
import SellerPrice from "@/components/Auction/SellerPrice.vue";
import CheckSale from "@/components/Auction/CheckSale.vue";
enum UserTabs { purchaser = 'purchaser', seller = 'seller' }
const tab = ref<string>(UserTabs.purchaser);
</script>