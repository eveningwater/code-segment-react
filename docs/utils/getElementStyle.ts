/**
 *  驼峰大小写
 * @param name
 * @returns
 */
export function camelCase(name: string) {
  return name
    .replace(
      /([\:\_\-]+(.))/g,
      (_: any, separator: any, letter: string, offset: any) =>
        offset ? letter.toUpperCase() : letter,
    )
    .replace(/^moz([A-Z])/, 'Moz$1');
}
// IE version more than 9
/**
 *  获取样式
 * @param element
 * @param styleName
 * @returns
 */
export function getElementStyle(element: HTMLElement, styleName: string) {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    const computed = document.defaultView?.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed?.[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
}
