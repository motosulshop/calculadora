import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculadoramlRoutingModule } from './calculadoraml-routing.module';
import { CalculadoramlComponent } from './calculadoraml.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { TimelineModule } from 'primeng/timeline';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';


@NgModule({
    imports: [
        CommonModule,
        CalculadoramlRoutingModule,
        AutoCompleteModule,
        CalendarModule,        
        FormsModule,
        ChipsModule,
        DropdownModule,
        InputMaskModule,
        InputNumberModule,
        CascadeSelectModule,
        MultiSelectModule,
        InputTextareaModule,
        InputTextModule,        
        ReactiveFormsModule,
        RadioButtonModule,
        CheckboxModule,
        ButtonModule,
        ChartModule,
        TimelineModule,
        TableModule,
        ToastModule
    ],
    declarations: [CalculadoramlComponent]
})
export class CalculadoramlModule { }

