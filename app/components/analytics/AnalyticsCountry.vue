<template>
  <section class="flex flex-col gap-5">
    <h5 class="text-black font-bold text-base">
      {{ $t('analytics.countries') }}
    </h5>
    <!-- Интерактивная карта мира -->
    <DottedWorldMap :countries="analyticsStore.countryBreakdown" />
    <!-- Список стран -->
    <ul
      v-if="isCountriesListVisible"
      class="space-y-3"
    >
      <li
        v-for="(country, index) in analyticsStore.countryBreakdown"
        :key="index"
        class="flex items-center justify-between py-2 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-gray-200"
      >
        <div class="flex items-center gap-3">
          <UIcon
            v-if="isUnknownCountryCode(country.countryCode)"
            name="i-heroicons-question-mark-circle"
            size="20"
          />
          <UIcon
            v-else
            :name="'circle-flags:' + country.countryCode.toLowerCase()"
            size="20"
          />
          <span class="text-sm font-medium">
            {{ getLocalizedCountryName(country.countryCode) }}
          </span>
        </div>
        <span class="text-sm font-medium">
          {{ country.percent.toFixed(1) }}%
        </span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import DottedWorldMap from '../charts/DottedWorldMap.vue'
import { type AvailibleLocales, type CountryCodes, getCountryName, isUnknownCountryCode } from '~/utils/getCountryName'
import { useI18n } from '#imports'

// Кастить типы плохо, но нам нужна валидация конкретных кодов стран на бэке + фронте тк есть баги из-за этого
// поэтому пока делаю костылик раз мы храним json с названиями на FE вместо BE
// + подумать про тулзу с i18n которая суммеет мэтчить коды с навзваниями в нужно локали
type CountryInfo = { countryCode: CountryCodes, percent: number }

const { locale } = useI18n()
interface Props {
  countries: CountryInfo[]
}

defineProps<Props>()

const analyticsStore = useAnalyticsStore()

const isCountriesListVisible = computed(() => !!analyticsStore.countryBreakdown.length)

const getLocalizedCountryName = (countryCode: CountryCodes) => {
  return getCountryName(countryCode, locale.value as AvailibleLocales)
}
</script>
