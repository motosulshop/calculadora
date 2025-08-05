import { LeedsComponent } from './leeds.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LeedsComponent }
    ])],
    exports: [RouterModule]
})
export class LeedsRoutingModule { }
