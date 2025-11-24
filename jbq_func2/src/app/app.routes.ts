import { Routes } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component'; //Isso é pela ausência de module

export const routes: Routes = [
    { path: 'produtos', component: ProdutosComponent },
    { path: '', redirectTo: 'produtos', pathMatch: 'full' },
    //{ path: '**', redirectTo: 'home' }
];
