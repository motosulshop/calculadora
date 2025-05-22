import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './layout/service/auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./principal1/components/calculadoraml/calculadoraml.module').then(m => m.CalculadoramlModule) },
                    { path: 'calculadoraml', loadChildren: () => import('./principal1/components/calculadoraml/calculadoraml.module').then(m => m.CalculadoramlModule) },
                    ]
            },
          /*   { path: 'auth', loadChildren: () => import('./principal1/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./principal1/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' }, */
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', useHash: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
