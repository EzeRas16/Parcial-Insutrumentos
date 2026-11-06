import { Component, computed, inject, signal } from '@angular/core';
import { Servicio } from '../../services/servicio';
import { FABRICANTES, FAMILIAS } from '../../modelo';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo {
  private readonly servicio = inject(Servicio);
  protected readonly familias = FAMILIAS;
  protected readonly fabricantes = FABRICANTES;
  protected readonly router = inject(Router);

  protected readonly lista = toSignal(this.servicio.obtenerTodos(), { initialValue: [] });
  readonly precioMin = signal(Number.NaN);
  readonly precioMax = signal(Number.NaN);
  protected readonly instrumentosFiltrados = computed(() => {
    const min = this.precioMin();
    const max = this.precioMax();
    return this.lista()
      .filter(
        (i) =>
          (Number.isNaN(min) || i.salePrice >= min) && (Number.isNaN(max) || i.salePrice <= max),
      )
      .sort((a, b) => a.family.localeCompare(b.family) || b.family.localeCompare(a.family));
  });

  limpiarFiltros(){
    this.precioMax.set(Number.NaN);
    this.precioMin.set(Number.NaN);
  }
}
