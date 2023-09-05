<template>
  <h2 class="mb-4">{{ titleLabel }}</h2>
  <v-form ref="purchaseForm">
    <v-text-field
      v-model="price"
      type="number"
      variant="outlined"
      append-icon="euro_symbol"
      :rules="[rules.required, rules.positiveNumber]"
      @blur="save"
    />
  </v-form>
</template>
<script setup lang="ts">
import {getCurrentInstance, onBeforeMount, onBeforeUnmount, ref} from "vue";
const emitter = getCurrentInstance()?.proxy?.emitter;
interface Props {
  titleLabel: string,
}
const props = defineProps<Props>();
const emits = defineEmits(['save']);
const purchaseForm = ref();

const price = ref<string | undefined>();

const rules = {
  required: (v: string) => !!v || 'El campo es requerido',
  positiveNumber: (v: string) => Number(v) > 0 || 'Porfavor introduce un número mayor de 0',
};

const save = () => {
  purchaseForm.value.validate();
  if (!purchaseForm.value.isValid) {
    return;
  }
  emits('save', Number(price.value));
}

function resetPrice() {
  price.value = undefined;
  purchaseForm.value.reset();
}
onBeforeMount(() => {
  emitter.on('resetPriceIsNeeded', resetPrice);
});
onBeforeUnmount(() => {
  emitter.off('resetPriceIsNeeded', resetPrice);
});
</script>