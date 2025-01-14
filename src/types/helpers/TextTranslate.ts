import { LOCALES } from '~/types/environment'

const locales = Object.values(LOCALES)

export class TextTranslate implements Record<LOCALES, string> {
  [LOCALES.en]!: LOCALES.en;
  [LOCALES.ru]!: LOCALES.ru

  constructor(model?: Partial<TextTranslate>) {
    model ||= {}

    locales.forEach((locale) => {
      this[locale] = model[locale] ?? ''
    })
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
    return new TextTranslate(Object.fromEntries(locales.map((locale) => [locale, text])))
  }

  static is(value: unknown): value is TextTranslate {
    if (!value || typeof value !== 'object') return false

    return locales.some((locale) => locale in value)
  }

  static getValue(data: TextTranslate | string, locale: LOCALES): string {
    if (typeof data === 'string') return data

    if (TextTranslate.is(data) && data[locale]) return data[locale]

    return Object.values(data).filter((v) => v)[0]
  }

  static getValues(data: unknown) {
    if (!TextTranslate.is(data)) return

    return locales.map((locale) => data[locale])
  }
}
