import { LOCALES } from './environment'
import { TextTranslate } from './helpers/TextTranslate'

export interface TagDTO {
  id: number
  name: string
  icon?: string
  color?: string
  en: string
  ru: string
}

export class Tag {
  public id: number
  public name: TextTranslate
  public icon?: string
  public color?: string

  constructor(data: Partial<TagDTO>) {
    this.id = data.id ?? 0
    this.name = new TextTranslate({ ru: data.ru, en: data.en })
    this.icon = data?.icon
    this.color = data?.color
  }

  public merge(data: Partial<TagDTO>) {
    this.id = data.id ?? this.id
    if (typeof data.name === 'string') {
      this.name = TextTranslate.FromString(data.name)
    }
    else if (typeof data.en === 'string' || typeof data.ru === 'string') {
      this.name = new TextTranslate({
        en: data.en ?? this.name.en,
        ru: data.ru ?? this.name.ru,
      })
    }
    this.icon = data.icon ?? this.icon
    this.color = data.color ?? this.color
  }

  public toDTO() {
    return {
      id: this.id,
      ru: this.name[LOCALES.ru],
      en: this.name[LOCALES.en],
      icon: this.icon,
      color: this.color,
    }
  }
}
