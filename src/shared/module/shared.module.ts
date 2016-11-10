import { NgModule }                                         from '@angular/core';
import { CommonModule }                                     from '@angular/common';
import { FormsModule }                                      from '@angular/forms';

import { TableSort, TablePagination, TableElementsCount }   from '../components/table/table'
import { TitleCase }                                        from '../pipe/title-case/title-case.pipe';

@NgModule({
    imports:        [ CommonModule ],
    declarations:   [ TableSort, TablePagination, TableElementsCount, TitleCase ],
    exports:        [ TableSort, TablePagination, TableElementsCount, TitleCase, 
                      FormsModule, CommonModule ],
    providers:      [ ]
})
export class SharedModule {}


