<script setup>
import CurrentSocialShareImage from './CurrentSocialShareImage.vue'
import {ref} from 'vue';
defineProps(['current','theme','domain']);
const loadedImage = ref(false);
function imgLoad() {
  loadedImage.value = true;
}
function generateThemeText(theme, domain) {
  if(theme) {
    return `This is ShareThumb's ${theme.type} ${theme.name} theme!`;
  } else if (domain && domain.name) {
    return `This is ${domain.name}!`;
  } else {
    return `My Website!`;
  }
}
</script>
<template>
  <div>
    <div class="flex flex-col items-center w-full max-w-lg">
    <CurrentSocialShareImage v-if="current" class="absolute top-7 z-10" />
    <div class="rounded-lg bg-white drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] max-w-lg font-social">
      <div class="pt-3 mx-4 mb-2">
        <div class="flex gap-2 mb-2 items-center">
          <img class="rounded-full size-10 text-[15px] font-semibold" src="https://i.pravatar.cc/40" alt="Social Media Profile Picture"/>
          Fernando
        </div>
        <p class="text-[15px]">
          {{generateThemeText(theme, domain)}}
        </p>
      </div>
      <span class="cursor-pointer">
        <template v-if="theme">
          <img :class="`w-full object-contain aspect-[40/21] ${!loadedImage ? 'hidden' : ''}`" :src="theme && theme.key ? `https://use.sharethumb.io/preview-image/${theme.key}/${domain.submittedUrl}` : ''" @load="imgLoad"/>
          <img :class="`w-full object-contain aspect-[40/21] ${loadedImage ? 'hidden' : ''}`" src="../assets/LoadingPreviewFrame.png" alt="Loading Preview" />
        </template>
        <img v-else-if="domain && domain.image" class="w-full object-contain aspect-[40/21]" :src="domain.image" alt="Your Original og:image" />
        <div class="bg-[#F0F2F5] border-b border-b-[#CED0D4] px-3 py-2">
          <div class="text-gray text-[13px]">{{domain?.domain ?? 'YOURWEBSITE.CO'}}</div>
          <div class="text-sm font-semibold">{{domain?.name ?? 'Your page title'}}</div>
          <div class="text-gray text-xs">{{domain?.description ?? 'Little bit of sub text as a convincer.'}}</div>
        </div>
      </span>
      <div class="mx-4 my-3 text-gray flex gap-2">
        <img src="../assets/fb-interact.png" class="h-7" alt="Facebook Like Button"/>
        <span>{{current ? '0' : '2,456,342'}}</span>
        <span class="flex-1 text-right">{{current ? '-10' : '34,509' }}</span>
        <svg class="size-6" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.23684 12.7726C0.426846 11.494 0.000183105 10.0227 0.000183105 8.5C0.000183105 4.08861 3.58875 0.5 8.00009 0.5C12.4114 0.5 16 4.08861 16 8.5C16 12.9114 12.4114 16.5 8.00009 16.5C6.70277 16.5 5.42084 16.1827 4.27687 15.5807L0.662873 16.484C0.620208 16.4947 0.576875 16.5 0.533543 16.5C0.381546 16.5 0.234214 16.4347 0.131542 16.3173C0.000210762 16.1667 -0.0364571 15.9547 0.038209 15.7687L1.23684 12.7726ZM4.22006 14.4953C4.35205 14.4627 4.49206 14.4813 4.61072 14.548C5.64139 15.1273 6.81401 15.4333 7.99996 15.4333C11.8232 15.4333 14.9332 12.3233 14.9332 8.50001C14.9332 4.67674 11.8232 1.56668 7.99996 1.56668C4.17672 1.56668 1.0667 4.67674 1.0667 8.50001C1.0667 9.90335 1.48469 11.2559 2.27535 12.4107C2.37601 12.5573 2.39668 12.7447 2.33068 12.91L1.41602 15.1961L4.22006 14.4953Z" fill="#6B6D71"/>
        </svg>
      </div>
      <hr class="mx-4 text-[#EDEDED]">
      <div class="mx-14 my-3 pb-2 text-gray flex gap-2">
        <img src="../assets/fb-actions.png" class="w-full" alt="Facebook Interaction Buttons" />
      </div>
    </div>
  </div>
</div>
</template>