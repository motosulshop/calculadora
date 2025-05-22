import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from './service/auth/auth.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService, public layoutService: LayoutService, private authService: AuthService, private router: Router) { }


    logout(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Deseja finalizar o sistema?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim', 
            rejectLabel: 'Não',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Fim da sessão', detail: 'Você encerrou a sessão' });
                
                setTimeout(() => {
                    this.authService.logout(); // Não precisa de .subscribe()
                    console.log('Logout bem-sucedido');
                }, 1000); // 1000 milissegundos = 1 segundo
            },
            
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Conectado', detail: 'Você permanece conectado!' });
            }
        });
    }
    
}
