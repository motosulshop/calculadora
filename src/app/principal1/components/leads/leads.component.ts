import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApileadService } from '../../service/apilead.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent {

  userForm: FormGroup;
  constructor(private fb: FormBuilder, private leadService: ApileadService) { }

  origemlead: any[] = [
    { label: 'Instagram', value: 1, disabled: false }
  ];
  destinolead: any[] = [
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
          origemlead: ['', Validators.required],
          destinolead: [{ value: '', disabled: false }],
          nomecliente: [{ value: '', disabled: false }],
          fonecliente: [{ value: '', disabled: false }],
          datacontato: [{ value: '', disabled: false }],
          itempesquisado: [{ value: '', disabled: false }]
         
        });
    
  };

  enviarFormulario() {
    console.log(this.userForm.value)
    const dadosLead = {
      origem_lead: this.userForm.value.origemlead,
      destino_lead: this.userForm.value.destinolead,
      nome_cliente: this.userForm.value.nomecliente,
      fone_cliente: this.userForm.value.fonecliente,
      data_contato: this.userForm.value.datacontato,
      item_pesquisado: this.userForm.value.itempesquisado,
      /* vendedor_ativo: 'Carlos',
      data_conclusao: null,
      resumo_final: 'Cliente interessado',
      valor_vendido: 450.50,
      data_nascimento_cliente: '1990-01-01',
      agendamento_contato_futuro: '2025-08-10',
      outras_observacoes: 'Prefere contato por WhatsApp à noite' */
    };

    /* this.leadService.inserirLead(dadosLead).subscribe({
      next: (res) => {
        console.log('Resposta do servidor:', res);
       
      },
      error: (err) => {
        console.error('Erro ao enviar lead:', err);
        
      }
    }); */
  }

}
