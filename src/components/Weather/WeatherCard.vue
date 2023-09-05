<template>
  <div v-if="weather" class="weather">
    <v-card>
      <v-card-title>
        <h5>El tiempo en Huesca</h5>
        <div>
          <span class="text-subtitle-2">{{ weather.time }}</span>
          <v-btn
            variant="plain"
            icon
            color="primary-darken-1"
            size="x-small"
            :ripple="false"
            @click="loadHuescaWeather"
          >
            <v-icon size="x-small">sync</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="weather__icon">
          <component :is="weatherIcon[weather!.key]"></component>
        </div>
        <div class="weather-info">
          <v-icon class="material-icons-outlined" color="text-muted" size="30">thermostat</v-icon>
          <p>{{ weather.temp }}</p>
        </div>
        <div class="weather-info">
          <v-icon class="material-icons-outlined" color="text-muted" size="30">air</v-icon>
          <p>{{ weather.speed}}</p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import SunnyWeather from "@/components/Misc/Icons/SunnyWeather.vue";
import PartlyCloudyWeather from "@/components/Misc/Icons/PartlyCloudyWeather.vue";
import CloudyWeather from "@/components/Misc/Icons/CloudyWeather.vue";
import FoggyWeather from "@/components/Misc/Icons/FoggyWeather.vue";
import SnowWeather from "@/components/Misc/Icons/SnowWeather.vue";
import RainWeather from "@/components/Misc/Icons/RainWeather.vue";
import StormWeather from "@/components/Misc/Icons/StormWeather.vue";
import {type Component, onBeforeMount, ref} from "vue";
import { getWeather } from "@/services/Weather";
import { useFeedbackStore } from "@/stores/feedback";
import { type Weather, WeatherKey } from "@/services/Weather/WeatherStructure";
const feedback = useFeedbackStore();

const weather = ref<Weather | undefined>();

const weatherIcon: {[key: string]: Component } = {
  [WeatherKey.sunny]: SunnyWeather,
  [WeatherKey.partlyCloudy]: PartlyCloudyWeather,
  [WeatherKey.cloudy]: CloudyWeather,
  [WeatherKey.foggy]: FoggyWeather,
  [WeatherKey.snow]: SnowWeather,
  [WeatherKey.rain]: RainWeather,
  [WeatherKey.storm]: StormWeather,
};
const loadHuescaWeather = async () => {
  const response = await getWeather.execute();
  if (!response.success) {
    feedback.show('error', 'Ha ocurrido un error al obtener el tiempo')
    return;
  }
  weather.value = response.weather;
}
onBeforeMount(() => {
  loadHuescaWeather();
})
</script>