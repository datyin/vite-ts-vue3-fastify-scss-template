import { fileURLToPath } from "url";
import { dirname } from "path";

/**
 * Alternative for __dirname in ESModule
 *
 * @param import.meta.url
 * @returns string
 */
export function getScriptDirectory(url: string) {
  return dirname(fileURLToPath(url));
}
