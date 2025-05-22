import { HttpClient } from '@angular/common/http';
import { MercadoLivreService } from 'src/app/layout/service/mercadolivre/mercadolivre.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/layout/service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/layout/service/user.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { SalvaOrcamento } from 'src/app/layout/service/salva_orcamento.service';
import { ListaProdutosService } from 'src/app/layout/service/lista-produtos.service';


interface EventItem {
  status?: string;
  data?: string;
  icon?: string;
  color?: string;
  image?: string;
}

@Component({
  selector: 'app-calculadoraml',
  templateUrl: './calculadoraml.component.html',
  styleUrls: ['./calculadoraml.component.scss'],
  providers: [MessageService]
})
export class CalculadoramlComponent implements OnInit {

  @ViewChild('tabela') tabela!: ElementRef;


  dadosProduto: any;
  selectedCategory: any = null;
  valorFrete: any;
  pis: any;
  cofins: any;
  percentualTotalNormal: any;
  margemContribuicao: any;
  data: any;
  options: any;
  dadosPreco: any;
  sku: any;

  tipoAnuncio: any[] = [
    { label: 'Premium 17%', value: 17 },
    { label: 'Clássico 11%', value: 11 },
    { label: 'Clássico 12%', value: 12 },
    { label: 'Shops 1,99%', value: 1.99 },
  ];

  piscofinsitem: any[] = [
    { label: 'Normal', value: 'Normal' },
    { label: 'Monofasico', value: 'Monofasico' },
    { label: 'Nenhum', value: 'Nenhum' },
  ];

  modelocredito: any[] = [
    { label: 'Sem crédito ( SIMPLES, MEI e PF )', value: 11, disabled: false },
    { label: 'Normal - ICMS 4%', value: 41, disabled: false },
    { label: 'Normal - ICMS 12%', value: 121, disabled: false },
    { label: 'Monofásico - ICMS 4%', value: 42, disabled: false },
    { label: 'Monofásico - ICMS 12%', value: 122, disabled: false }
  ];

  valoripientrada: any;
  valorcustonfeentrada: any;

  valorfreteentradaparcial: any;
  valorfreteentrada: any;
  valoritementrada: any;


  comissaoConsolidada: any;
  userForm: FormGroup;
  valorcustosistema: any;
  valoricmspiscofinscredito: any;
  valorprecoproposto: any;
  valordespesaVendaMl: any;
  valormodelocredito: any;
  custoFinalizado: any;
  sugeridoFinalizado: any;
  eventsData: EventItem[];
  events: EventItem[];
  /* envioml = [
    { label: 'Pelo comprador', value: 0 },
    { label: '21,45', value: 21.45 },
    { label: '22,95', value: 22.95 },
    { label: '45,90', value: 45.90 }
  ]; */

  envioml = [
    { label: 'Pelo comprador', value: 0 },
    { label: 'De 500 g a 1 kg\tR$ 22,45', value: 22.45 },
    { label: 'De 1 kg a 2 kg\tR$ 23,45', value: 23.45 },
    { label: 'De 2 kg a 3 kg\tR$ 24,95', value: 24.95 },
    { label: 'De 3 kg a 4 kg\tR$ 26,95', value: 26.95 },
    { label: 'De 4 kg a 5 kg\tR$ 28,45', value: 28.45 },
    { label: 'De 5 kg a 9 kg\tR$ 44,45', value: 44.45 },
    { label: 'De 9 kg a 13 kg\tR$ 65,95', value: 65.95 },
    { label: 'De 13 kg a 17 kg\tR$ 73,45', value: 73.45 },
    { label: 'De 17 kg a 23 kg\tR$ 85,95', value: 85.95 },
    { label: 'De 23 kg a 30 kg\tR$ 98,95', value: 98.95 }
  ];

  difal = [
    { label: 'Com DIFAL', value: 'ativo' },
    { label: 'Sem DIFAL', value: 'inativo' }
  ];


  constructor(private fb: FormBuilder, private userService: UserService, private http: HttpClient,
    private confirmationService: ConfirmationService, private messageService: MessageService, private salvaOrcamento: SalvaOrcamento, private listaProdutosService: ListaProdutosService) {

  }
  ngOnInit() {

    this.userForm = this.fb.group({
      piscofinsitem: ['', Validators.required],
      tipoAnuncio: [{ value: '', disabled: true }],
      modelocredito: [{ value: '', disabled: true }],
      ipientrada: [{ value: 0, disabled: true }],
      custonfeentrada: [{ value: '', disabled: true }],
      custosistema: [{ value: '', disabled: true }],
      freteentrada: [{ value: 0, disabled: true }],
      itementrada: [{ value: '', disabled: true }],
      precoproposto: [{ value: '', disabled: true }],
      descProduto: [{ value: '', disabled: true }],
      ncm: [{ value: '', disabled: true }],
      piscofins: [{ value: '', disabled: true }],
      pis: [{ value: '', disabled: true }],
      cofins: [{ value: '', disabled: true }],
      icms: [{ value: '', disabled: true }],
      despesaVendaMl: [{ value: '', disabled: true }],
      somaVendaMl: [{ value: '', disabled: true }],
      comissaovendedor: [{ value: '', disabled: true }],
      comissaovendedorperc: [{ value: 0, disabled: true }],
      envioml: [{ value: '', disabled: true }],
      freteaplicado: [{ value: '', disabled: true }],
      difal: [{ value: 0, disabled: true }],
      percentualdifal: [{ value: '', disabled: true }],
      temp: [{ value: '', disabled: true }],
    });

    this.initChart(); 

    this.userForm.get('piscofinsitem').valueChanges.subscribe(value => {
      if (value) {
        this.userForm.get('modelocredito').enable();
      } else {
        this.userForm.get('tipoAnuncio').disable();
        this.userForm.get('custosistema').disable();
        this.resetAllFields();
      }
    });

    this.userForm.get('custosistema').valueChanges.subscribe(value => {
      if (value) {
        console.log(value)
        this.valorcustosistema = value;
        this.userForm.patchValue({
          somaVendaMl: this.valorcustosistema
        });
      } else {
      }
    });


    this.userForm.get('custonfeentrada').valueChanges.subscribe(value => {
      if (value) {
        this.valorcustonfeentrada = value;
        this.userForm.get('freteentrada').enable();
      } else {
      }
    });

    /* this.userForm.get('freteentrada').valueChanges.subscribe(value => {
      alert('teste ' + value)
      if (value) {
        this.valorfreteentradaparcial = value;
        this.userForm.get('itementrada').enable();
      } else {
      }
    }); */
    this.userForm.get('freteentrada').valueChanges.subscribe(value => {
      if (value !== null && value !== undefined) {  // Verifica se o valor não é null ou undefined
        this.valorfreteentradaparcial = value;
        this.userForm.get('itementrada').enable();
      }
    });

    this.userForm.get('itementrada').valueChanges.subscribe(value => {
      if (value) {
        this.valorfreteentrada = (this.valorfreteentradaparcial / this.valorcustonfeentrada) * value;
        if (this.valormodelocredito == 41) {
          const pis = (value / 100) * 1.65;
          const cofins = (value / 100) * 7.6;
          const icms = (value / 100) * 4;
          this.valoricmspiscofinscredito = pis + cofins + icms;
          this.valoritementrada = value;
          this.userForm.get('ipientrada').enable();
        } else if (this.valormodelocredito == 121) {
          const pis = (value / 100) * 1.65;
          const cofins = (value / 100) * 7.6;
          const icms = (value / 100) * 12;
          this.valoricmspiscofinscredito = pis + cofins + icms;
          this.valoritementrada = value;
          this.userForm.get('ipientrada').enable();
        } else if (this.valormodelocredito == 42) {
          const pis = 0;
          const cofins = 0;
          const icms = (value / 100) * 4;
          this.valoricmspiscofinscredito = pis + cofins + icms;
          this.valoritementrada = value;
          this.userForm.get('ipientrada').enable();
        } else if (this.valormodelocredito == 122) {
          const pis = 0;
          const cofins = 0;
          const icms = (value / 100) * 12;
          this.valoricmspiscofinscredito = pis + cofins + icms;
          this.valoritementrada = value;
          this.userForm.get('ipientrada').enable();
        } else if (this.valormodelocredito == 11) {
          const pis = 0;
          const cofins = 0;
          const icms = 0;
          this.valoricmspiscofinscredito = pis + cofins + icms;
          this.valoritementrada = value;
          this.userForm.get('ipientrada').enable();
        } else {
          alert('erro na seleção do modelo de crédito tributário!')
        }
        this.userForm.get('precoproposto').enable();
      } else {
        /* console.log('nada') */
      }
    });

    this.userForm.get('ipientrada').valueChanges.subscribe(value => {

      this.valoripientrada = (this.valoritementrada / 100) * value;
      /*  this.valorcustosistema = (this.valoritementrada + this.valoripientrada + this.valorfreteentrada) - this.valoricmspiscofinscredito;
       this.userForm.patchValue({
         custosistema: this.valorcustosistema,
       }); */

    });

    this.userForm.get('precoproposto').valueChanges.subscribe(value => {      
      if (value) {
        this.valorprecoproposto = value;
        this.userForm.get('tipoAnuncio').enable();
        if (this.dadosProduto.value == 'Normal') {          
          this.userForm.patchValue({
            pis: (this.valorprecoproposto / 100) * 1.65,
            cofins: this.valorprecoproposto * 0.076,
            icms: this.valorprecoproposto * 0.12
          });
          this.pis = (this.valorprecoproposto / 100) * 1.65;
          this.cofins = this.valorprecoproposto * 0.076;
        } else if (this.dadosProduto.value == 'Nenhum') {          
          this.userForm.patchValue({
            pis: 0,
            cofins: 0,
            icms: 0
          });
          this.pis = 0;
          this.cofins = 0;
        } else {
          this.userForm.patchValue({
            pis: 0,
            cofins: 0,
            icms: this.valorprecoproposto * 0.082
          });
          this.pis = 0;
          this.cofins = 0;
        };

        if (value > 79) {
          this.userForm.get('envioml').enable();
        } else {
          this.userForm.get('envioml').disable();
          this.valorFrete = 0;
          this.userForm.patchValue({
            freteaplicado: this.valorFrete,
            envioml: 'Pelo comprador'
          });
        }
        //this.updateChart();
      } else {
        this.valorFrete = 0;
        this.userForm.get('envioml').disable();
      }
    });

    this.userForm.get('comissaovendedorperc').valueChanges.subscribe(value => {
      if (this.valorprecoproposto) {
        if (value) {
          this.comissaoConsolidada = (this.valorprecoproposto / 100) * value;
          this.userForm.patchValue({
            comissaovendedor: this.comissaoConsolidada,
          });
        } else {
          this.comissaoConsolidada = 0;
          this.userForm.patchValue({
            comissaovendedor: this.comissaoConsolidada,
          });
        }
      } else {
        this.comissaoConsolidada = 0;
        this.userForm.patchValue({
          comissaovendedor: this.comissaoConsolidada,
        });
      }
    })
  }

  consolidaCustoCalculado() {
    this.valorcustosistema = (this.valoritementrada + this.valoripientrada + this.valorfreteentrada) - this.valoricmspiscofinscredito;
    this.userForm.patchValue({
      custosistema: this.valorcustosistema,
    });
  }

  calculaCustos() {
    this.eventsData = [
      { status: 'Preço Proposto', data: this.valorprecoproposto },
      { status: 'ICMS', data: this.valorprecoproposto * 0.082 },
      { status: 'PIS', data: this.pis },
      { status: 'COFINS', data: this.cofins },
      { status: 'Despesa de venda do Mercado Livre', data: this.valordespesaVendaMl },
      { status: 'Frete', data: this.valorFrete },
      { status: 'Comissão', data: this.comissaoConsolidada },
      { status: 'difal', data: this.valorprecoproposto * (this.userForm.value.difal / 100) },
      { status: 'Custo do Produto', data: this.valorcustosistema }
    ];
    const custoVenda: any = (this.eventsData[1].data + this.eventsData[2].data + this.eventsData[3].data +
      this.eventsData[4].data + this.eventsData[5].data + this.eventsData[6].data + this.eventsData[7].data +
      this.eventsData[8].data);
    if (custoVenda) {
      const precovendafinal: any = (this.valorprecoproposto - custoVenda);

      this.events = [
        { status: 'Preço Proposto', data: this.valorprecoproposto },
        { status: 'Total créditos tributários', data: this.valoricmspiscofinscredito },
        { status: 'IPI entrada', data: this.valoripientrada },
        { status: 'FRETE entrada', data: this.valorfreteentrada },
        { status: 'ICMS', data: this.valorprecoproposto * 0.082 },
        { status: 'PIS', data: this.pis },
        { status: 'COFINS', data: this.cofins },
        { status: 'Despesa de venda do Mercado Livre', data: this.valordespesaVendaMl },
        { status: 'Frete', data: this.valorFrete },
        { status: 'Comissão', data: this.comissaoConsolidada },
        { status: 'difal', data: this.valorprecoproposto * (this.userForm.value.difal / 100) },
        { status: 'Custo do Produto', data: this.valorcustosistema },
        { status: 'CUSTO VENDA', data: custoVenda },
        { status: 'Margem Final', data: precovendafinal }
      ];

     // const precificador = localStorage.getItem('user')
     // const precificadorName = JSON.parse(precificador)
      this.dadosPreco = [{
        'sku': this.sku,
        'descricao': this.dadosProduto.descricao,
        'preco_venda': this.valorprecoproposto,
        //'precificador': precificadorName.firstname + '|Tabela ML|' + this.userForm.value.tipoAnuncio.label,
        'status': 'inativa'
      }]
    }
    this.updateChart(custoVenda);
    this.tabela.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['Custo/Venda'],
      datasets: [
        {
          label: 'Custo',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: []
        },
        {
          label: 'Venda',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: []
        }
      ]
    };

    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 2.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  updateChart(custoV) {
    this.data.datasets[0].data[0] = custoV;
    this.data.datasets[1].data[0] = this.valorprecoproposto;
    this.data = { ...this.data };
  }

  modelocreditoMl(event: any) {
    console.log(event)
    this.valormodelocredito = event.value.value;
    this.enableAllFields();
  }

  tipoAnuncioMl(event: any) {
    const precoproposto = this.userForm.value.precoproposto;
    const tipoan = event.value.value;

    if (tipoan < 2 && precoproposto > 79.9){
      this.userForm.patchValue({
        despesaVendaMl: (precoproposto * (tipoan / 100)) + 6,
      });
      this.valordespesaVendaMl = (precoproposto * (tipoan / 100)) + 6;
    } else if (precoproposto < 79.9) {
      this.userForm.patchValue({
        despesaVendaMl: (precoproposto * (tipoan / 100)) + 6,
      });
      this.valordespesaVendaMl = (precoproposto * (tipoan / 100)) + 6;
    } else {
      this.userForm.patchValue({
        despesaVendaMl: (precoproposto * (tipoan / 100)),
      });
      this.valordespesaVendaMl = (precoproposto * (tipoan / 100));
    }
  }

  calculaFreteMl(event: any) {
    this.valorFrete = event.value.value;
    this.userForm.patchValue({
      freteaplicado: this.valorFrete,
      somaVendaMl: this.valorFrete + this.valordespesaVendaMl + this.valorcustosistema
    });
  }

  /*  tipoDifal(event: any) {
     event.value.value == 'ativo' ? this.userForm.get('percentualdifal').enable() : this.userForm.get('percentualdifal').disable();
   } */

  selecionaDestino(event: any) {
    this.userForm.patchValue({
      difal: 'inativo',
      percentualdifal: 0,
    });
  }


  buscaDadosProduto() {
    const skuValue = this.userForm.get('piscofinsitem').value;
    console.log(skuValue);
    if (skuValue) {
      this.dadosProduto = skuValue;
      const selectedValue = this.dadosProduto.value;
      if (selectedValue === 'Normal') {
        this.modelocredito.forEach(option => {
          if (option.value === 42 || option.value === 122 || option.value === 11) {
            option.disabled = true;
          } else {
            option.disabled = false;
          }
        });
      } else if (selectedValue === 'Monofasico') {
        this.modelocredito.forEach(option => {
          if (option.value === 41 || option.value === 121 || option.value === 11) {
            option.disabled = true;
          } else {
            option.disabled = false;
          }
        });
      } else if (selectedValue === 'Nenhum') {
        this.modelocredito.forEach(option => {
          if (option.value === 11) {
            option.disabled = false;
          } else {
            option.disabled = true;
          }
        });
      } else {
        // Caso contrário, habilitar todas as opções
        this.modelocredito.forEach(option => {
          option.disabled = false;
        });
      }
      this.userForm.patchValue({
        descProduto: this.dadosProduto.descricao,
        ncm: this.dadosProduto.cod,
        piscofins: this.dadosProduto.value
      });
    } else {
      alert('Produto não encontrado com o SKU fornecido');
    }
  }

  onReset() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Esta ação vai reiniciar a precificação!',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.events = [];
        this.userForm.reset();
        this.valorprecoproposto = 0;
        this.updateChart(0);
        this.showResetPrec();
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'OK', detail: 'Precificação mantida' });
      }
    });
  }
  showResetPrec() {
    this.messageService.add({ key: 'precificacaoReiniciada', severity: 'warn', summary: 'OK!', detail: 'Precificação reiniciada!' });
  }

  onInputFocus(event: Event) {
    (event.target as HTMLInputElement).select();
  }

  salvarPrecificacao() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja salvar a precificação!',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
      //  const precificador = localStorage.getItem('user')
        //const precificadorName = JSON.parse(precificador)
        const dadosPreco2 = {
          'sku': this.sku,
          'descricao': this.dadosProduto.descricao,
          'preco_venda': this.valorprecoproposto,
         // 'precificador': precificadorName.firstname + '|Tabela ML|' + this.userForm.value.tipoAnuncio.label,
          'status': 'inativa'
        }

        if (dadosPreco2) {
          this.salvaOrcamento.salvarPreco(dadosPreco2).subscribe({
            next: (response) => {
              response.success == true ? this.showSavePrec() : alert('erro!')
              this.events = [];
              this.userForm.reset();
              this.valorprecoproposto = 0;
              this.updateChart(0);
              this.resetAllFields()

            },
            error: (error) => {
              console.error('Erro ao salvar produto', error);
            }
          });
        }
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'OK', detail: 'Precificação mantida' });
      }
    });
  }
  showSavePrec() {
    this.messageService.add({ key: 'precificacaoSalva', severity: 'success', summary: 'OK!', detail: 'Precificação SALVA!' });
  }

  enableAllFields() {
    //this.userForm.get('descProduto').enable();
    //this.userForm.get('ncm').enable();
    //this.userForm.get('piscofins').enable();
    this.userForm.get('difal').enable();
    this.userForm.get('custonfeentrada').enable();
    this.userForm.get('tipoAnuncio').enable();
    // this.userForm.get('comissaovendedor').enable();
    this.userForm.get('comissaovendedorperc').enable();
    //this.userForm.get('despesaVendaMl').enable();
    // this.userForm.get('envioml').enable();
    this.userForm.get('temp').enable();
  }

  resetAllFields() {
    this.userForm.get('descProduto').disable();
    this.userForm.get('somaVendaMl').disable();
    this.userForm.get('ncm').disable();
    this.userForm.get('piscofins').disable();
    this.userForm.get('ipientrada').disable();
    this.userForm.get('difal').disable();
    this.userForm.get('precoproposto').disable();
    this.userForm.get('envioml').disable();
    //  this.userForm.get('comissaovendedor').disable();
    this.userForm.get('comissaovendedorperc').disable();
    this.userForm.get('temp').disable();
  }

}














