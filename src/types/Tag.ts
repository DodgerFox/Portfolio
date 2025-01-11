import { LOCALES } from './Environment'
import { TextTranslate } from './helpers/TextTranslate'

export interface TagDTO {
  id: number
  name: string
  icon?: string
  en: string
  ru: string
}

export class Tag {
  public id: number
  public name: TextTranslate
  public icon?: string

  constructor(data: Partial<TagDTO>) {
    this.id = data.id ?? 0
    this.name = new TextTranslate({ ru: data.ru, en: data.en })
    this.icon = data?.icon
  }

  public merge(data: Partial<TagDTO>) {
    this.id = data.id ?? this.id
    this.name = data.name ?? this.name
    this.icon = data.icon ?? this.icon
  }

  public toDTO() {
    return {
      id: this.id,
      ru: this.name[LOCALES.ru],
      en: this.name[LOCALES.en],
      icon: this.icon,
    }
  }
}
