import es from './es';
import en from './en';

const availableLanguages = {
  es,
  en,
};

let language = 'es';

/**
 * 
 * @param {string} translation
 * @param {object} attributes
 * @returns {string} 
 */
export function trans(translation, attributes = {}) {
  let path = translation.split('.');

  let message = availableLanguages[language];

  for (let index = 0; index < path.length; index++) {
    message = message[path[index]];
    if (!message) return translation;
  }

  if (!message) return translation;

  Object.keys(attributes).forEach((attr) => {
    message = message.replace(`:${attr}`, attributes[attr]);
  });

  return message;
}

export default function setLanguage(lang) {
  language = lang;
}
