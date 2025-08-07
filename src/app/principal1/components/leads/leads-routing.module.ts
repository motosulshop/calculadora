import { LeadsComponent } from './leads.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LeadsComponent }
    ])],
    exports: [RouterModule]
})
export class LeadsRoutingModule { }
