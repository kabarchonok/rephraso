import type { ReadableAtom } from 'nanostores'
import { persistentMap } from '@nanostores/persistent'
import { atom } from 'nanostores'
import { categoriesMocks } from './categories-mocks'
import { router } from './router'

interface Phrase {
  text: string
  context?: string
}

export interface Category {
  id: string
  name: string
  label: string

  phrases: Phrase[]
}

export type State = {
  categories: Category[]
}

export type RandomPhrase = {
  categoryId: string
  categoryName: string
  phraseIndex: number

  text: string
  context?: string
}

// Weights per category, keyed by "categoryId". Value is a JSON array of numbers.
const $weights = persistentMap<Record<string, number[]>>('weights:', {}, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

const HISTORY_SIZE = 3

// History of recently shown phrase indices per category (oldest first, newest last).
const $history = persistentMap<Record<string, number[]>>('history:', {}, {
  encode: JSON.stringify,
  decode: JSON.parse,
})

function getHistory(categoryId: string, phraseCount: number): number[] {
  const history = $history.get()[categoryId]
  if (!history) {
    return []
  }
  return history.filter(i => i < phraseCount)
}

function pushHistory(categoryId: string, phraseIndex: number): void {
  const history = $history.get()[categoryId] ?? []
  const updated = [...history, phraseIndex].slice(-HISTORY_SIZE)
  $history.setKey(categoryId, updated)
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

export function fillState(categories?: Category[]) {
  $state.setKey('categories', categories ?? categoriesMocks)
}

function getCategory(categoryId: string) {
  return $state.get().categories.find(({ id }) => id === categoryId)
}

function getWeights(categoryId: string, phraseCount: number): number[] {
  const weights = $weights.get()[categoryId]
  if (weights && weights.length === phraseCount) {
    return [...weights]
  }
  return Array.from({ length: phraseCount }).fill(1) as number[]
}

function weightedRandomIndex(weights: number[]): number {
  const total = weights.reduce((sum, w) => sum + w, 0)
  let random = Math.random() * total
  for (let i = 0; i < weights.length; i++) {
    random -= weights[i]
    if (random <= 0) {
      return i
    }
  }
  return weights.length - 1
}

export function getRandomPhrase(categoryId: string, skipIndex?: number): RandomPhrase {
  const category = $state.get().categories.find(({ id }) => id === categoryId)

  if (!category) {
    throw new Error(`Category ${categoryId} not found`)
  }

  if (!category.phrases.length) {
    throw new Error(`There is no phrases in ${categoryId} category`)
  }

  const phraseCount = category.phrases.length
  const baseWeights = getWeights(categoryId, phraseCount)
  const history = getHistory(categoryId, phraseCount)

  const excluded = new Set([...history, ...(skipIndex !== undefined ? [skipIndex] : [])])

  const effectiveWeights = baseWeights.map((w, i) => excluded.has(i) ? 0 : w)
  const hasCandidate = effectiveWeights.some(w => w > 0)

  let weights: number[]
  if (hasCandidate) {
    weights = effectiveWeights
  }
  else if (skipIndex !== undefined && phraseCount > 1) {
    weights = baseWeights.map((w, i) => i === skipIndex ? 0 : w)
  }
  else {
    weights = baseWeights
  }

  const index = weightedRandomIndex(weights)
  pushHistory(categoryId, index)

  return {
    categoryId: category.id,
    categoryName: category.name,
    phraseIndex: index,

    text: category.phrases[index].text,
    context: category.phrases[index].context,
  }
}

function clearCategory() {
  $category.set(undefined)
}
