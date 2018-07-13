const TRANSLATIONS = {
  ru: {
    date: 'Дата',
    time: 'Время',
    week: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    save: 'Готово',
    hours: 'Часы',
    minutes: 'Минуты'
  },
  en: {
    date: 'Date',
    time: 'Time',
    week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    save: 'Save',
    hours: 'Hours',
    minutes: 'Minutes'
  }
}

export const translate = locale => {
  return (key) => TRANSLATIONS[locale][key]
}
