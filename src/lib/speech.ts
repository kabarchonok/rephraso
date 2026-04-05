function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const en = voices.filter(v => v.lang.startsWith('en'))
  if (!en.length)
    return undefined

  const premium = en.find(v =>
    /premium|enhanced|natural/i.test(v.name),
  )
  if (premium)
    return premium

  const google = en.find(v => /^google/i.test(v.name))
  if (google)
    return google

  return en.find(v => v.default) ?? en[0]
}

export function speak(
  text: string,
  callbacks?: {
    onStart?: () => void
    onEnd?: () => void
    onError?: () => void
  },
): void {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.9

  const voices = speechSynthesis.getVoices()
  const voice = pickVoice(voices)
  if (voice)
    utterance.voice = voice

  if (callbacks?.onStart) utterance.onstart = callbacks.onStart
  if (callbacks?.onEnd) utterance.onend = callbacks.onEnd
  if (callbacks?.onError) utterance.onerror = callbacks.onError

  speechSynthesis.speak(utterance)
}

export function cancel(): void {
  speechSynthesis.cancel()
}

export function isSpeaking(): boolean {
  return speechSynthesis.speaking
}
