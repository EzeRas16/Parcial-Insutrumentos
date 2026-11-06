import { Component, inject, OnInit, signal } from '@angular/core';
import { Servicio } from '../../services/servicio';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Formulario } from '../formulario/formulario';
import { Instrumento } from '../../modelo';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [Formulario, RouterLink],
  selector: 'app-detalle',
  styleUrl: './detalle.css',
  templateUrl: './detalle.html',
})
export class Detalle implements OnInit {
  private readonly servicio = inject(Servicio);
  private readonly router = inject(Router);
  private readonly ruta = inject(ActivatedRoute);

  protected readonly editando = signal(false);
  protected readonly instrumento = signal<Instrumento | null>(null);
  protected readonly id = this.ruta.snapshot.paramMap.get('id')!;

  async ngOnInit() {
    if (this.id) {
      const i = await firstValueFrom(this.servicio.obtenerPorId(this.id));
      this.instrumento.set(i);
    } else {
      alert('No encontrado');
      this.router.navigate(['catalogo']);
    }
  }

  async eliminar() {
    if (!confirm('Esta seguro que desea eliminar este instrumento?')) return;
    await firstValueFrom(this.servicio.borrar(this.id));
    this.router.navigate(['catalogo']);
  }

  editar(i: Instrumento) {
    this.instrumento.set(i);
    this.editando.set(false);
  }
}
