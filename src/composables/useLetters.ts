import { ref, computed, type Ref } from 'vue'

export const useLetter = (word: Ref<string>) => {
  const letters = ref<string[]>([])
  const correctLatters = computed(() =>
    letters.value.filter((letter) => word.value.includes(letter))
  )
  const wrongLatters = computed(() =>
    letters.value.filter((letter) => !word.value.includes(letter))
  )
  const isLose = computed(() => wrongLatters.value.length === 6)
  const isWine = computed(() => [...word.value].every((x) => correctLatters.value.includes(x)))
  const addLetter = (key: string) => {
    if (/[а-яА-ЯёЁ]/.test(key)) {
      letters.value.push(key.toLowerCase())
    }
  }

  const resetLetter = () => {
    letters.value = []
  }

  return {
    letters,
    correctLatters,
    wrongLatters,
    isLose,
    isWine,
    addLetter,
    resetLetter
  }
}
