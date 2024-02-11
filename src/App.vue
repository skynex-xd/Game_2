<template>
  <game-header />
  <div class="game-container">
    <game-body :wrong-letters-count="wrongLatters.length" />
    <game-wrong-letters :wrong-letters="wrongLatters" />
    <game-word :word="word" :correct-letters="correctLatters" />
  </div>

  <game-popup ref="popup" :word="word" @restart="restart" />
  <game-notification ref="notification" />
</template>

<script setup lang="ts">
import GameHeader from './components/GameHeader.vue'
import GameBody from './components/GameBody.vue'
import GameWrongLetters from './components/GameWrongLetters.vue'
import GameWord from './components/GameWord.vue'
import GamePopup from './components/GamePopup.vue'
import GameNotification from './components/GameNotification.vue'
import { ref, watch } from 'vue'
import { useRandomWord } from './composables/useRandomWord'
import { useLetter } from './composables/useLetters'
import { useNotification } from './composables/useNotification'

const { word, getRandomWord } = useRandomWord()
const { letters, correctLatters, wrongLatters, isLose, isWine, addLetter, resetLetter } =
  useLetter(word)
const { notification, showNotification } = useNotification()
const popup = ref<InstanceType<typeof GamePopup> | null>(null)
const restart = async () => {
  await getRandomWord()
  resetLetter()
  popup.value?.close()
}

watch(wrongLatters, () => {
  if (isLose.value) {
    popup.value?.open('lose')
  }
})

watch(correctLatters, () => {
  if (isWine.value) {
    popup.value?.open('win')
  }
})

window.addEventListener('keydown', ({ key }) => {
  if (isLose.value || isWine.value) {
    return
  }

  if (letters.value.includes(key)) {
    showNotification()
  }

  addLetter(key)
})
</script>
