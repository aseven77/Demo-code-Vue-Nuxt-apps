<script setup lang="ts">
const { notifyError, notifySuccess } = useNotify()
const { t } = useI18n()

const {
  feedbackFields,
  validateFeedbackForm,
  getFeedbackErrorMessage,
  isFormValid,
  isFeedbackLoading,
  feedbackErrors,
} = useFeedback()

const globalStore = useGlobalStore()

const isEmailFilled = computed(() => !!feedbackFields.value.email)
const isTopicFilled = computed(() => !!feedbackFields.value.topic)
const isMessageFilled = computed(() => !!feedbackFields.value.message)

const sendFeedback = async () => {
  if (!validateFeedbackForm()) return

  isFeedbackLoading.value = true
  feedbackErrors.value = {}

  try {
    const { data, error } = await useAsyncData('send-feedback', () =>
      globalStore.sendFeedback(feedbackFields.value),
    )

    if (error.value || !data.value || !('id' in data.value)) {
      throw new Error(error.value?.message || 'Invalid response')
    }

    feedbackFields.value = { email: '', topic: '', message: '' }
    notifySuccess('Сообщение успешно отправлено')
  }
  catch (err) {
    console.error('Feedback submission error:', err)
    notifyError('Ошибка при отправке сообщения')
  }
  finally {
    isFeedbackLoading.value = false
  }
}

const sectionEl = ref<HTMLElement>()
defineExpose({ sectionEl })
</script>

<template>
  <section
    id="contacts"
    ref="sectionEl"
    class="contacts"
  >
    <div class="container-fluid">
      <div class="contacts-main">
        <div class="contacts-preview">
          <div class="subs">
            <img
              src="/images/subs.png"
              alt=""
              class="subs__picture"
            >
            <span class="subs__text"> {{ $t('landing.plus500Subscribers') }}</span>
          </div>
          <picture class="contacts-preview__img mx-auto">
            <source
              srcset="/images/contacts-img__mobile.webp"
              media="(max-width: 992px)"
            >
            <img
              src="/images/contacts-img.webp"
              alt=""
            >
          </picture>
        </div>
        <div class="contacts-form">
          <div id="Registration" />
          <h2 class="contacts__title">
            {{ $t('landing.haveQuestions') }}
          </h2>
          <div class="mb-2 mb-xl-4">
            <p class="contacts__desc">
              {{ $t('landing.here247') }}
            </p>
          </div>
          <form @submit.prevent="sendFeedback">
            <div class="mb-4">
              <label
                class="input"
                :class="{
                  'input--filled': isEmailFilled,
                  'input--error': getFeedbackErrorMessage('email'),
                }"
              >
                <input
                  v-model="feedbackFields.email"
                  type="email"
                >
                <span class="input__label">{{ $t('landing.email') }}</span>
              </label>
              <div
                v-if="getFeedbackErrorMessage('email')"
                class="mt-1 text-red-500 text-sm"
              >
                {{ getFeedbackErrorMessage("email") }}
              </div>
            </div>
            <div class="mb-4">
              <label
                class="input"
                :class="{
                  'input--filled': isTopicFilled,
                  'input--error': getFeedbackErrorMessage('topic'),
                }"
              >
                <input
                  v-model="feedbackFields.topic"
                  type="text"
                >
                <span class="input__label">{{ $t('landing.topic') }}</span>
              </label>
              <div
                v-if="getFeedbackErrorMessage('topic')"
                class="mt-1 text-red-500 text-sm"
              >
                {{ getFeedbackErrorMessage("topic") }}
              </div>
            </div>
            <div class="mb-4">
              <label
                class="textarea"
                :class="{
                  'textarea--filled': isMessageFilled,
                  'textarea--error': getFeedbackErrorMessage('message'),
                }"
              >
                <textarea
                  v-model="feedbackFields.message"
                />
                <span class="textarea__label">{{ $t('landing.message') }}</span>
              </label>
              <div
                v-if="getFeedbackErrorMessage('message')"
                class="mt-1 text-red-500 text-sm"
              >
                {{ getFeedbackErrorMessage("message") }}
              </div>
            </div>

            <div
              v-if="getFeedbackErrorMessage('general')"
              class="mb-4 text-red-500 text-sm"
            >
              {{ getFeedbackErrorMessage("general") }}
            </div>

            <button
              class="button disabled: w-100"
              type="submit"
              :class="
                isFormValid && !isFeedbackLoading
                  ? 'button--primary'
                  : 'button--disabled'
              "
            >
              {{ isFeedbackLoading ? "Sending..." : t('landing.send') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contacts {
  margin-bottom: 50px;
}

.contacts :deep(.container-fluid) {
  padding: 0 8px;
}

.contacts-main {
  display: grid;
  width: 100%;
  max-width: 1376px;
  padding-bottom: 15px;
  margin: 0 auto;
  border-radius: 60px;
  background-image: linear-gradient(189deg,
      #915EFF 25.9%,
      #A67DFF 51.16%,
      #BD9EFF 67.65%,
      #D5C1FF 74.93%,
      #FFF 90.08%);
  grid-template-columns: 55% 1fr;
  gap: 5px;
}

.contacts-preview {
  position: relative;
  top: 0;
  left: 0;
  max-width: 761px;
  align-self: flex-end;
}

.subs {
  position: absolute;
  z-index: 5;
  top: 166px;
  left: 91px;
  width: 105px;
  height: 84px;
  text-align: center;
  border-radius: 24px;
  background-color: #fff;
}

.subs__picture {
  max-width: 82px;
  margin: -32px auto -14px auto;
}

.subs__text {
  font-size: 14px;
  font-weight: 600;
  display: block;
  color: #2b2b2b;
}

.contacts-form {
  padding-top: 95px;
  padding-right: 80px;
  color: #e1e2e7;
}

.contacts__title {
  font-family: "Roobert", sans-serif;
  font-size: 44px;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 10px;
  letter-spacing: -0.04em;
  color: #fff;
}

.contacts__desc {
  max-width: 484px;
  letter-spacing: -0.12px;
}

.input {
  position: relative;
  display: block;
}

.input input {
  font-size: 14px;
  width: 100%;
  height: 44px;
  padding: 0 16px;
  color: #f0f2f5;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.22);
}

.input__label {
  position: absolute;
  top: 0;
  left: 16px;
  transition: 0.3s;
  transform: translateY(10px);
  pointer-events: none;
}

.input--filled input {
  border-color: rgba(255, 255, 255, 0.68);
}

.input--filled .input__label {
  font-size: 10px;
  transform: translateY(2px);
}

.input:not(:last-child) {
  margin-bottom: 8px;
}

.textarea {
  position: relative;
  display: block;
}

.textarea textarea {
  font-size: 14px;
  width: 100%;
  height: 128px;
  padding: 12px 16px;
  resize: none;
  color: #f0f2f5;
  border: 1px solid transparent;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.22);
}

.textarea__label {
  position: absolute;
  top: 0;
  left: 16px;
  transition: 0.3s;
  transform: translateY(10px);
  pointer-events: none;
}

.textarea--filled textarea {
  border-color: rgba(255, 255, 255, 0.68);
}

.textarea--filled .textarea__label {
  font-size: 10px;
  transform: translateY(2px);
}

.textarea:not(:last-child) {
  margin-bottom: 8px;
}

@media (max-width: 1024px) {
  .contacts {
    margin-bottom: 22px;
  }

  .contacts-main {
    width: calc(100% - 20px);
    height: 520px;
    margin: 0 10px;
    background-image: linear-gradient(189deg,
        #915EFF 25.9%,
        #A67DFF 51.16%,
        #BD9EFF 67.65%,
        #D5C1FF 74.93%,
        #FFF 90.08%);
    grid-template-columns: 498px 1fr;
  }

  .contacts-preview {
    align-self: flex-start;
  }

  .subs {
    top: 169px;
    left: 60px;
    zoom: 0.75;
  }

  .contacts-preview__img {
    position: absolute;
    top: 0;
    left: -24px;
    width: 581px;
    max-width: none;
  }

  .contacts-form {
    padding-top: 34px;
    padding-right: 31px;
  }

  .contacts__title {
    font-size: 36px;
  }
}

@media (max-width: 992px) {
  .contacts-main {
    width: 100%;
    height: auto;
    margin: 0;
    grid-template-columns: 1fr;
  }

  .contacts-preview {
    margin: 0 auto;
  }

  .subs {
    top: 213px;
    left: 30px;
    zoom: 1;
    width: 100px;
    height: 71px;
    border-radius: 19px;
  }

  .subs__picture {
    margin-top: -37px;
    margin-bottom: -16px;
  }

  .contacts-preview__img {
    left: 0;
    display: block;
    position: relative;
    width: 100%;
    max-width: 426px;
    margin-top: -50px;
  }

  .contacts-form {
    width: 100%;
    padding: 0 81px;
  }
}

@media (max-width: 767px) {
  .contacts-main {
    gap: 52px;
    border-radius: 40px 40px 0 0;
    background-image:  linear-gradient(180deg,
        #915EFF 55.26%,
        #CFB9FF 83.24%,
        #FFF 100%);
  }

  .subs {
    top: 255px;
    zoom: 0.8;
  }

  .contacts-preview__img {
    margin-top: -24px;
  }

  .contacts-form {
    padding: 0 24px;
  }

  .contacts__title {
    font-size: 32px;
  }
}
</style>
