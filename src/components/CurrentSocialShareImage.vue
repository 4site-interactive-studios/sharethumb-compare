<script setup>
import {ref} from 'vue'
const showHelp = ref(false);
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
<template>
  <div class="relative w-[151px] h-[57px]">
    <img src="../assets/current-box.svg" class="cursor-pointer no-select" @click="showHelp = true"/>
    <Transition>
      <div v-if="showHelp" class="absolute w-[200px] h-[154px] bottom-7 left-12">
          <img src="../assets/speech-box.svg" />
          <p class="absolute w-full p-6 top-0 text-sm">When people share your page on Social Media, this is what they see</p>
          <img src="../assets/x.svg" class="absolute top-2.5 right-2.5 cursor-pointer no-select" @click="showHelp = false"/>
      </div>
    </Transition>
  </div>
</template>