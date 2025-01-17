export function replaceText(message, data) {
  return message.replace(
    /\$\{(\s*[^}]+\s*)\}/g,
    (_, key) => data[key.trim()] || '',
  );
}
