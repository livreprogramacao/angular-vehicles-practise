
import { Pipe, PipeTransform} from '@angular/core';

/*
 * Changes the case of the first letter of a given number of words in a string.
 * Author: Andrew Kostka.
 * https://gist.github.com/apkostka/a42b2f23df033872ae406549ab1a1c2e
*/

@Pipe({
    name: 'titleCase',
    pure: false
})
export class TitleCase implements PipeTransform {
    transform(input: string, length: number): string {
        // Exemplo: Expressão regular e Unicode caracteres
        // Regexp-unicode-block ->  http://kourge.net/projects/regexp-unicode-block
        return input.length > 0 ? input.replace(/[\u0000-\u007F\u0080-\u00FF\u0100-\u017F\u0180-\u024F]\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase())) : '';
    }
}