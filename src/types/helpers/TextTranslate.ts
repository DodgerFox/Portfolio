import { LOCALES } from '@/types/environment'

const locales = Object.values(LOCALES) as LOCALES[]

export interface TextTranslate extends Record<LOCALES, string> {}

type TextTranslateModel = Partial<Record<LOCALES, string>>

export class TextTranslate {
  [LOCALES.en]: string
  [LOCALES.ru]: string

  constructor(model: TextTranslateModel = {}) {
    this[LOCALES.en] = model[LOCALES.en] ?? ''
    this[LOCALES.ru] = model[LOCALES.ru] ?? ''
  }

  static Concat(...args: TextTranslate[]) {
    const model = new TextTranslate()

    args.forEach((arg) => {
      locales.forEach((locale) => {
        model[locale] ||= arg[locale]
      })
    })

    return model
  }

  static FromString(text: string) {
    const model: Record<LOCALES, string> = {
      [LOCALES.en]: text,
      [LOCALES.ru]: text,
    }

    return new TextTranslate(model)
  }

  static is(value: unknown): value is TextTranslate {
    if (!value || typeof value !== 'object') return false

    const data = value as Partial<Record<LOCALES, unknown>>

    return locales.some((locale) => typeof data[locale] === 'string')
  }

  static getValue(data: TextTranslate | string, locale: LOCALES): string {
    if (typeof data === 'string') return data

    if (TextTranslate.is(data) && data[locale]) return data[locale]

    return Object.values(data).find((v) => !!v) ?? ''
  }

  static getValues(data: unknown) {
    if (!TextTranslate.is(data)) return

    return locales.map((locale) => data[locale])
  }
}
