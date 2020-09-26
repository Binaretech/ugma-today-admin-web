import es from './es';
import en from './en';

const availableLanguages = {
  es,
  en,
};

let language = 'es';

export function trans(translation) {
  let path = translation.split('.');

  let message = availableLanguages[language];

  for (let index = 0; index < path.length; index++) {
    message = message[path[index]];
    if (!message) return translation;
  }

  if (!message) return translation;
  return message;
}

export default function setLanguage(lang) {
  language = lang;
}
