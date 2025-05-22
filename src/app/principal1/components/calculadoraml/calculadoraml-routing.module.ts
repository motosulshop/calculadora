import { CalculadoramlComponent } from './calculadoraml.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CalculadoramlComponent }
    ])],
    exports: [RouterModule]
})
export class CalculadoramlRoutingModule { }
