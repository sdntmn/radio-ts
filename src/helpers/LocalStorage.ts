import { EProperty } from "../constants"

export class LocalStorage {
  readonly LIST_SAVE = "list_Save"

  static getLocal<T>( key: EProperty ): T | null {
    const raw = localStorage.getItem(key)

    if (raw) {
      return JSON.parse(raw) as T
    }
    return null
  }

  static setLocal<T>(key: EProperty, value: T): T {
    localStorage.setItem(key, JSON.stringify(value))

    return value
  }

  static delLocal(key: EProperty): void {
    return localStorage.removeItem(key)
  }
}
