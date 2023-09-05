import {ref, reactive} from 'vue'
import { defineStore } from 'pinia'

type ManageFeedback = (msg: string) => void;
interface FeedbackTypes {
  error: ManageFeedback,
  success: ManageFeedback,
}

interface Feedback {
  message: string,
  background: string
  color: string,
  icon: string,
}

export const useFeedbackStore = defineStore('feedback', () => {
  const config = reactive<Feedback>({
    message: 'Esto es una prueba',
    color: 'error',
    icon: 'error',
    background: '#FFCDD2',
  })
  const display = ref<boolean>(false);

  function showError(msg: string): void {
    config.message = msg;
    config.color = 'error';
    config.icon = 'error';
    config.background = '#FFCDD2';
  }
  function showSuccess(msg: string): void {
    config.message = msg;
    config.color = 'success';
    config.icon = 'check_circle';
    config.background = '#C8E6C9';
  }
  const manageFeedback: FeedbackTypes = {
    error: (msg: string) => showError(msg),
    success: (msg: string) => showSuccess(msg),
  }

  function hide(): void {
    display.value = false;
  }

  function show(type: keyof FeedbackTypes, msg: string): void {
    manageFeedback[type](msg);
    display.value = true;
  }
  return { show, hide, display, config };
})
