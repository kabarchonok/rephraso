import type { ReadableAtom } from 'nanostores'
import { persistentMap } from '@nanostores/persistent'
import { atom } from 'nanostores'
import { categoriesMocks } from './categories-mocks'
import { router } from './router'

interface Phrase {
  text: string
}

export interface Category {
  id: string
  name: string

  phrases: Phrase[]
}

export type State = {
  categories: Category[]
}

export type RandomPhrase = {
  categoryId: string
  categoryName: string

  text: string
}

export function readonlyExport<Value>(
  store: ReadableAtom<Value>,
): ReadableAtom<Value> {
  return store
}

export const $state = persistentMap<State>('state:', { categories: [] }, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export const state = readonlyExport($state)

const $category = atom<Category | undefined>(undefined)

export const category = readonlyExport($category)

router.subscribe((route) => {
  if (!route) {
    return
  }

  if (route.route === 'phrase' && route.params.categoryId) {
    $category.set(getCategory(route.params.categoryId))
  }
  else if (route.route !== 'phrase') {
    clearCategory()
  }
})

export function fillState() {
  $state.setKey('categories', categoriesMocks)
}

function getCategory(categoryId: string) {
  return $state.get().categories.find(({ id }) => id === categoryId)
}

export function getRandomPhrase(categoryId: string): RandomPhrase {
  const category = $state.get().categories.find(({ id }) => id === categoryId)

  if (!category) {
    throw new Error(`Category ${categoryId} not found`)
  }

  if (!category.phrases.length) {
    throw new Error(`There is no phrases in ${categoryId} category`)
  }

  return {
    categoryId: category.id,
    categoryName: category.name,

    text: category.phrases[Math.floor(Math.random() * category.phrases.length)].text,
  }
}

function clearCategory() {
  $category.set(undefined)
}
