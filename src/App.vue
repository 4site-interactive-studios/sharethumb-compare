<script setup>
/**
 * @author npgiano
 */
import SocialMediaPost from './components/SocialMediaPost.vue'
import SocialMediaPostFrame from './components/SocialMediaPostFrame.vue'
import {ref,watch} from 'vue';
const inputDomain = ref('');
const domain = ref(null);
const error = ref(false);
const active = ref(false);
const loading = ref(false);
// After active changes, wait .5 seconds, and change to active. Silly, but it makes the animations smoother
watch(domain, (newVal) => {
  if(newVal) {
    setTimeout(() => {
      active.value = true;
    }, 500);
  } else {
    active.value = false;
  }
});
const themes = ref([]);
// GET all the sharethumb themes
fetch('https://api.sharethumb.app/themes')
    .then(response => response.json())
    .then(data => themes.value = data);
// Get domain information
function submitDomain() {
  loading.value = true;
  error.value = false;
  // Clear protocols
  let domainWork = inputDomain.value.replace('http://','').replace('https://','');
  fetch('https://use.sharethumb.io/og-info/'+domainWork)
    .then(response => response.json())
    .then(data => {
      // If message was sent back, something wrong happened
      if(data.message) {
        error.value = true;
        domain.value = false;
        loading.value = false;
        return;
      }
      // Sometimes the url returned is empty or does not match, use the address submitted as a fallback
      domain.value = {...data, submittedUrl: domainWork};
      console.log(domain.value);
      loading.value = false;
    })
    .catch(() => {
      domain.value = null;
      error.value = true;
      loading.value = false;
    })
}
</script>
<style scoped>
/* Transition animations! */

.fade-move-enter-active, .fade-move-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-move-enter, .fade-move-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-move-enter-to, .fade-move-leave {
  opacity: 1;
  transform: translateY(0);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: translate 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  translate: 0px 120px;
}
</style>
<template>
  <main :class="`max-w-6xl mx-auto flex flex-col lg:flex-row ${active ? 'lg:divide-x-2 divide-purple' : ''}`">
    <div class="lg:pr-12 mt-2">
      <div :class="`max-w-lg flex flex-col md:mx-36 ${domain ? 'lg:mx-0' : 'lg:text-center lg:mx-72'} transition-all`">
        <div :class="`relative w-[343px] h-[3.25rem] ${domain ? 'mx-0' : 'text-center lg:mx-[5.35rem]'} transition-all`">
          <h1 class="headline">
            Preview your og:image
          </h1>
          <div class="headline-shadow" aria-hidden="true">
            Preview your og:image
          </div>
        </div>
        <p class="my-1 text-purple text-md">
          See how your page looks when it's shared on social media.
        </p>
        <div class="text-left w-full">
          <label for="url" :class="`mt-2 text-purple uppercase text-sm ${error ? 'text-red' : ''}`">{{error ? 'Error occured! Try another URL.' : 'Enter URL'}}</label>
          <input v-model="inputDomain" class="w-full mb-2 purple-box-shadow text-purple border-4 border-purple invalid:border-red invalid:text-red invalid:red-box-shadow p-3 text-md" type="text" name="url" placeholder="E.g. Sharethumb.io" />
        </div>
        <button :disabled="loading" @click="submitDomain" class="w-full my-2 purple-box-shadow text-white rounded-tl-[10px] rounded-tr-[13px] rounded-bl-[14px] rounded-br-[15px] bg-purple disabled:bg-gray font-headline uppercase p-4 text-md flex gap-3 hover:gap-4 transition-all items-center justify-center">
          {{loading ? 'Loading' : 'Generate My Thumbnail'}}
          <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 animate-spin">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <svg v-else class="size-4" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M1.72141 18.0792L0.756342 0.11069L14.2017 6.88872L1.72141 18.0792Z" fill="white"/>
          </svg>
        </button>
      </div>
        <transition-group
          name="fade-move"
          tag="div"
          :class="`flex flex-col lg:flex-row lg:items-end lg:w-full md:mx-36 lg:mx-0 gap-8 lg:gap-16`"
        >
          <SocialMediaPost key="1" :current="true" :domain="domain"/>
          <SocialMediaPostFrame key="2" v-if="!domain" />
        </transition-group>
    </div>
    <Transition>
      <div v-if="active" class="lg:pl-12 lg:px-5 lg:pt-8 md:px-36 min-h-[500px] h-[100vh] overflow-y-auto">
        <h1 v-if="domain?.status && domain.status == 'VERIFIED'">You're already using Sharethumb! Here's some other theme previews</h1>
        <div v-if="!current"  class="relative h-[90px] w-full z-20">
          <img src="./assets/your-page-with.svg" class="absolute top-0 -right-2 no-select"/>
          <img src="./assets/tada.png" class="absolute top-4 -left-3 h-24 no-select"/>
        </div>
        <div class="flex flex-col gap-5">
          <template v-for="(theme, index) in themes" :key="theme.key">
            <SocialMediaPost :theme="theme" :domain="domain" />
            <h2 v-if="index == 0" class="text-lg font-headline text-center">More themes...</h2>
          </template>
        </div>
      </div>
    </Transition>
  </main>
  <Transition name="slide-up">
    <div v-if="active" class="fixed bottom-4 w-full">
      <button class="max-w-lg w-full mx-auto my-2 black-box-shadow text-white rounded-tl-[10px] rounded-tr-[13px] rounded-bl-[14px] rounded-br-[15px] bg-black font-headline uppercase p-4 text-md flex gap-3 hover:gap-4 transition-all items-center justify-center">
          Get Sharethumb
          <svg class="size-4" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M1.72141 18.0792L0.756342 0.11069L14.2017 6.88872L1.72141 18.0792Z" fill="white"/>
          </svg>
        </button>
    </div>
  </Transition>
</template>
