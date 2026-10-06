import { z } from 'zod/v4'
import { useValidation } from '~/composables/useValidation'
import { useFormErrors } from '~/composables/useFormErrors'
import { LINK_NAME } from '~/constants/validation'

export const useAddLink = () => {
  const { createUrlSchema, createRequiredStringSchema } = useValidation()
  const { validate: validateForm, getErrorMessage, resetErrors } = useFormErrors()

  enum ErrorsEnum {
    NAME = 'name',
    URL = 'url',
  }

  // State
  const name = ref('')
  const url = ref('')
  const isLoading = ref(false)
  const isDisabledSubmitButton = computed(() => !(name.value.length && url.value.length))

  // Validation
  const schema = computed(() => z.object({
    [ErrorsEnum.NAME]: createRequiredStringSchema(LINK_NAME.MIN_LENGTH, LINK_NAME.MAX_LENGTH),
    [ErrorsEnum.URL]: createUrlSchema(),
  }))

  const validate = (): boolean =>
    validateForm(schema.value, { name: name.value, url: url.value })

  const resetAddLinkState = () => {
    resetErrors()
    name.value = ''
    url.value = ''
    isLoading.value = false
  }

  return {
    ErrorsEnum,
    name,
    url,
    schema,
    isDisabledSubmitButton,
    isLoading,
    validate,
    getErrorMessage,
    resetErrors,
    resetAddLinkState,
  }
}
