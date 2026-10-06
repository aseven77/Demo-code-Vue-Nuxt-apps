<script setup lang="ts">
import AnalyticsFilterDates from '~/components/analytics/AnalyticsFilterDates.vue'
import type { TabsItem } from '#ui/components/Tabs.vue'
import type { AnalyticsPeriod } from '~/types/analytics.types'
import type { OutputDate } from '~/types/canendar.types'
import { useI18n } from '#imports'

interface Props {
  activeItem: string | undefined
  list: AnalyticsPeriod[]
  calendarLabel: Nullable<string>
}

interface Emits {
  chooseDate: [OutputDate]
  selectPeriod: [AnalyticsPeriod]
  clearRange: []
}

const emits = defineEmits<Emits>()
const props = defineProps<Props>()

const { calendarLabel } = toRefs(props)
const { t } = useI18n()
const toast = useToast()

const route = useRoute()
const router = useRouter()

const adminStore = useAdminStore()
const { interfaceState } = storeToRefs(adminStore)

const onClickButton = (): void => {
  toast.add({
    title: 'В разработке',
    color: 'info',
    description: 'Функционал экспортирования данных',
  })
}

const tabs: TabsItem[] = [
  {
    label: t('analytics.analytics'),
    value: 'graph',
  },
  {
    label: t('analytics.users'),
    value: 'users',
  },
  {
    label: t('analytics.models'),
    value: 'models',
  },
]

if (!route.query?.tab) {
  router.push({
    path: route.fullPath,
    query: { tab: 'graph' },
  })
}

const active = computed({
  get() {
    return (route.query.tab as string) || 'graph'
  },
  set(tab) {
    router.push({
      path: route.fullPath,
      query: { tab },
    })
  },
})

const rootClasses = computed(() => {
  if (active.value !== 'graph') {
    return `bg-light-200 pb-3 sm:pb-2 md:pb-6 lg:pb-2 xl:pb-4`
  }
  return 'bg-white pb-3 sm:pb-7 md:pb-6 xl:pb-8 border-b border-light-600 fixed top-0 left-0 right-0 z-10'
})

const isVisibleInput = computed(() => route.query?.tab === 'users' || route.query?.tab === 'models')

const onSelectPeriod = (item: AnalyticsPeriod) => emits('selectPeriod', item)
const onChooseDate = (date: OutputDate) => emits('chooseDate', date)
const onClearRange = () => emits('clearRange')
</script>

<template>
  <section
    :class="rootClasses"
    class="
      z-11
      pt-2
      px-4

      sm:pt-4
      sm:px-8

      md:pt-6

      lg:pl-6
      lg:pr-6
      lg:static

      xl:pt-8
      xl:pl-8
      xl:pr-8"
  >
    <div class="flex items-center justify-between mb-4 sm:mb-7 md:mb-5 lg:mb-6 h-10">
      <h2 class="text-(--ds-color-primitive-grey-900) font-[Manrope] font-bold text-xl 2xl:text-2xl">
        <slot name="heading" />
      </h2>

      <!--  Технически лучше всю логику поведения кнопки вывести в app.config
      но для обратной совместимости делаю тут     -->
      <UButton
        v-if="route.query?.tab === 'graph'"
        :ui="{
          base: 'gap-2 sm:px-6 sm:by-3',
          label: 'hidden sm:block font-semibold ',
        }"
        variant="primary"
        color="secondary"
        :label="t('analytics.export')"
        square
        size="md"
        icon="custom:export"
        @click="onClickButton"
      />
    </div>

    <div class="not-last:mb-5 not-last:2xl:mb-9 sm:flex sm:justify-between md:flex-col lg:flex-row">
      <UTabs
        v-model="active"
        :items="tabs"
        variant="link"
        :content="false"
        class="not-last:mb-5 not-last:sm:mb-0 not-last:md:mb-5 not-last:lg:mb-0"
      />

      <UInput
        v-if="isVisibleInput"
        v-model.trim="interfaceState.inputSearch"
        :placeholder="t('analytics.searchUsers')"
        name="search users"
        size="md"
        class="sm:w-66.25 md:w-full lg:w-74"
        :ui="{
          base: 'py-5 h-0 pl-10 pr-4',
          leadingIcon: 'size-4',
          leading: 'ps-3',
        }"
        leading-icon="custom:search"
      />
    </div>

    <AnalyticsFilterDates
      v-if="route.query?.tab === 'graph'"
      :calendar-label="calendarLabel"
      :list="list"
      :active-item="activeItem"
      @select-period="onSelectPeriod"
      @choose-date="onChooseDate"
      @clear-range="onClearRange"
    />
  </section>
</template>
