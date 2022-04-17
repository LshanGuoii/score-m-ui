/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'T', 'S']
  const firstValue = str.split('')

  if (firstValue[0] === 'T' || firstValue[0] === 'S' || str === 'admin') return true
  // return valid_map.indexOf(str.trim()) >= 0
  // return valid_map.includes(str)



}
