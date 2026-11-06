import { Routes } from '@angular/router';
import { Catalogo } from './components/catalogo/catalogo';
import { Formulario } from './components/formulario/formulario';
import { Detalle } from './components/detalle/detalle';

export const routes: Routes = [
    {path : '' , redirectTo : 'catalogo' , pathMatch : 'full'},
    {path : 'catalogo'  ,component : Catalogo},
    {path : 'agregar' , component : Formulario},
    {path : 'detalle/:id' , component : Detalle},
    {path : '**' , redirectTo : 'catalogo'}
];
