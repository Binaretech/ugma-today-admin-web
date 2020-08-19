import es from './es';
import en from './en';

const availableLanguages = {
  es,
  en,
};

let language = '';

export function trans(translation) {
  let path = translation.split('.');

  let message = availableLanguages[language];

  // eslint-disable-next-line
  path.map((key) => {
    message = message[key];
  });

  if (!message) return translation;
  return message;
}

export default function setLanguage(lang) {
  language = lang || 'es';
}
