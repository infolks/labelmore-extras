/**
 * remove extension from a file name
 * @param str string file name
 */
export function removeExtension(str: string) {

    return str.split('.').slice(0,-1).join('.')
    
}