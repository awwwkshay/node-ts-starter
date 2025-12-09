
import { Field } from '@/components'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

const { fieldContext, formContext } = createFormHookContexts()

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
export const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldComponents: {
    Field,
  },
  formComponents: {
  },
  fieldContext,
  formContext,
})