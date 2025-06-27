import { ChapamComponent } from './chapam.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ChapamComponent }
    ])],
    exports: [RouterModule]
})
export class ChapamRoutingModule { }
