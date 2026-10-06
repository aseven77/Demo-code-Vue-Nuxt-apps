<template>
  <div class="max-h-screen md:h-screen md:bg-light-300 relative">
    <div
      class="lg:p-8 max-w-[1240px] mx-auto md:flex md:flex-col md:gap-6 md:items-start md:h-full"
    >
      <!-- Логотип -->
      <div class="hidden lg:block lg:static lg:bg-transparent lg:z-10">
        <NuxtLink
          to="/profile"
          class="max-w-[187px] lg:h-14 py-2 px-4 block"
        >
          <img
            class=""
            src="/images/logo.svg"
            alt="Link3"
          >
        </NuxtLink>
      </div>

      <!-- Навигация -->
      <SharedBottomNav class="lg:border-1 border-grey-100">
        <SharedNavigationLayout />
      </SharedBottomNav>

      <main class="lg:flex lg:gap-4 md:flex-1 md:w-full lg:overflow-hidden">
        <section
          class="w-full lg:bg-white md:border-light-600 md:border-1
          md:rounded-container-3xl h-full md:min-h-auto md:h-full
          relative pb-16 md:pb-0 md:pt-30 md:mt-6 lg:pb-0 lg:mb-0 lg:mt-0 lg:pt-0 lg:overflow-hidden"
        >
          <div class="flex flex-col w-full items-start md:h-full md:relative ">
            <div class="flex-1 flex flex-col w-full md:h-full">
              <div
                class="pt-3 pb-15 px-4 flex-auto relative md:pl-8 md:pr-4 md:pt-4 md:pb-25 lg:px-0 lg:flex lg:flex-col lg:mb-0 lg:pb-0 lg:overflow-hidden"
              >
                <slot />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import SharedNavigationLayout from '~/components/SharedNavigationLayout.vue'
</script>
