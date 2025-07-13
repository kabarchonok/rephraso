import { createRouter, getPagePath } from '@nanostores/router'

type Routes = {
  home: {}
  edit: {}
  phrase: { categoryId: string }
}

type RouteName = keyof Routes

type EmptyObject = Record<string, never>

// "Oh, God" Mod Start
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

type WithoutOptional<T> = Pick<T, RequiredKeys<T>>

export type ParamlessRouteName = {
  [K in RouteName]: WithoutOptional<Routes[K]> extends EmptyObject ? K : never
}[RouteName]

type Route<Name extends RouteName = RouteName> = Name extends string ? {
  route: Name
  params: Routes[Name]
} : never
// "Oh, God" Mod End

export const $router = createRouter({
  home: '/',
  edit: '/edit/categories',
  phrase: '/phrase/:categoryId',
})

export const router = $router // FIXME:

export function getUrl(route: Route | ParamlessRouteName): string {
  let to: Route

  if (typeof route === 'string') {
    to = { route, params: {} }
  }
  else {
    to = route
  }

  return getPagePath($router, to)
}
