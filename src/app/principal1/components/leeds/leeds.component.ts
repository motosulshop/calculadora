import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-leeds',
  templateUrl: './leeds.component.html',
  styleUrls: ['./leeds.component.scss']
})
export class LeedsComponent {

  userForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  origemleed: any[] = [
    { label: 'Instagram', value: 1, disabled: false }   
  ];
  destinoleed: any[] = [
    { label: 'Livre', value: 0, disabled: false },   
    { label: 'Arlei', value: 1, disabled: false },   
    { label: 'Fabiane', value: 2, disabled: false },   
    { label: 'Denis', value: 3, disabled: false },   
    { label: 'Daniela', value: 4, disabled: false },   
    { label: 'Rafael', value: 5, disabled: false },   
    { label: 'Fabiano', value: 6, disabled: false }   
  ];
  ngOnInit() {

    this.userForm = this.fb.group({

    });
  }

}
