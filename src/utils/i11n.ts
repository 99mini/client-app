import { romanize } from 'es-hangul';

/**
 *
 * @param address
 * @example
 * ```
 * 망우로 -> manguro -> Mangu-ro
 * 동대문구 -> dongdaemungu -> Dongdaemun-gu
 * ```
 *
 */
export function romanizeAddress(address: string): string {
  const roma = romanize(address);
  const ret = `${roma[0].toUpperCase()}${roma.slice(1, roma.length - 2)}-${roma.slice(roma.length - 2)}`;
  return ret;
}

export function koreanToEnglishCategory(category: string): string {
  switch (category) {
    case '쇼핑':
      return 'Shopping';
    case '문화관광':
      return 'Culture';
    case '레저스포츠':
      return 'Leisure Sports';
    case '역사관광':
      return 'Historical Tourism';
    case '자연관광':
      return 'Nature Tourism';
    case '체험관광':
      return 'Experience Tourism';
    case '음식':
      return 'Food';
    case '기타관광':
      return 'Other Tourism';
    default:
      return category;
  }
}
