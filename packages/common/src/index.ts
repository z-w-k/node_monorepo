/**
 * monorepo 的通用工具函数
 */

/**
 * 将日期格式化为字符串
 * @param date 要格式化的日期
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * 将字符串的首字母大写
 * @param str 要大写的字符串
 * @returns 首字母大写的字符串
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 生成随机 ID
 * @param length ID 的长度
 * @returns 随机 ID 字符串
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
} 