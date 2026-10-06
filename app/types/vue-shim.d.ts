// нужно для "обхода" ошибки "Cannot find module '.vue' or its corresponding type declarations"
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, unknown>
  export default component
}
