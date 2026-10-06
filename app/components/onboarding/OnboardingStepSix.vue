<script setup lang="ts">
import { profileFirstLinks } from '~/constants/links'
import SharedCard from '~/components/shared/SharedCard.vue'
import SharedInputTextLinkIcon from '~/components/shared/inputs/SharedInputTextLinkIcon.vue'
import { useI18n } from '#imports'
import { getValidLinkUrl, replaceTelegramLink, getClearLink, isFullUrl } from '~/helpers/get-valid-link-url'
import type { Link } from '~/generatedApi'

interface OnboardingCookieState {
  links?: Link[]
}

const { t } = useI18n()
const { ErrorsEnum, getErrorMessage } = useAddLink()
const urlMaxLength = 30

const { activeLink, username: url, initFromUrl } = useLinkEditor()

const emit = defineEmits<{
  (event: 'update', link: ProfileFirstLink | null): void
}>()

// Получаем доступ к объекту user из cookie
const _user = useCookie<OnboardingCookieState | null>('onboarding-state')

const createLinkFromSelection = (link: ProfileFirstLink | null, username: string) => {
  if (!_user.value) return

  let linkUrl: string

  if (link) {
    const cleanUsername = getClearLink(username)
    linkUrl = `${link.link}/${cleanUsername}`
  }
  else {
    linkUrl = url.value
  }

  // Создаем объект ссылки
  const newLink: Link = {
    url: getValidLinkUrl(replaceTelegramLink(linkUrl)),
    image: link?.icon ?? null,
    is_archive: false,
    sort_order: 0,
  }

  // В онбординге должна быть только одна ссылка
  // Заменяем все существующие ссылки на новую
  if (_user.value) {
    _user.value.links = [newLink]
  }
}

const handleSelectLink = (link: ProfileFirstLink) => {
  // Если нажали на уже выбранную кнопку, отменяем выбор
  if (activeLink.value?.key === link.key) {
    activeLink.value = null

    // Удаляем все ссылки из preview (в онбординге должна быть только одна)
    if (_user.value) {
      _user.value.links = []
    }

    emit('update', null)
    return
  }

  activeLink.value = link

  // Если это первый выбор или URL содержит полную ссылку, очищаем его
  if (!url.value || isFullUrl(url.value)) {
    // Очищаем URL от протокола и домена, оставляем только username
    const clean = getClearLink(url.value)
    url.value = clean ? `@${clean}` : ''
  }
  // Если URL уже содержит только username (начинается с @), оставляем как есть

  // Создаем ссылку для preview
  if (url.value) {
    createLinkFromSelection(link, url.value)
  }

  emit('update', link)
}

// Инициализация при загрузке компонента
onMounted(() => {
  const existingLink = _user.value?.links?.[0]
  if (existingLink?.url) {
    initFromUrl(existingLink.url, existingLink.image || undefined)
  }
})

// Отслеживаем изменения URL для обновления preview
watch(url, (newUrl) => {
  if (newUrl) {
    createLinkFromSelection(activeLink.value, newUrl)
  }
})
</script>

<template>
  <div>
    <div class="mb-8">
      <div class="onboarding-title font-bold text-[42px] tracking-[-2px] text-(--ds-color-fg-primary) font-manrope leading-[42px] mb-3">
        {{ $t('onboarding.firstLink') }}
      </div>
      <p class="font-medium text-base leading-5 text-[#6F7386]">
        {{ $t('onboarding.linkHint') }}
      </p>
    </div>

    <div class="mb-4">
      <div class="relative">
        <SharedInputTextLinkIcon
          v-model="url"
          name="link"
          :placeholder="t('onboarding.link')"
          input-type="text"
          input-name="link"
          :maxlength="urlMaxLength"
          :error="getErrorMessage(ErrorsEnum.URL)"
        >
          <template #leading>
            <UIcon
              :name="activeLink?.inputIcon ? activeLink.inputIcon : 'custom:web'"
              size="24"
            />
          </template>
        </SharedInputTextLinkIcon>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <button
        v-for="profileLink in Object.values(profileFirstLinks)"
        :key="profileLink.key"
        class="cursor-pointer"
        @click="handleSelectLink(profileLink)"
      >
        <SharedCard :class="{ '!border-(--ds-color-primitive-brand-500)': activeLink?.key === profileLink.key }">
          <div class="flex flex-col items-center justify-center gap-2">
            <h6 class="text-(--ds-color-fg-primary) text-sm font-bold capitalize">
              {{ profileLink.label }}
            </h6>
            <Icon
              :name="profileLink.inputIcon"
              size="32"
            />
          </div>
        </SharedCard>
      </button>
    </div>
  </div>
</template>
