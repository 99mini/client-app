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
