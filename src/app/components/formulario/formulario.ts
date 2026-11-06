import { Component, inject, input, model, OnInit, output, signal } from '@angular/core';
import { form, FormField, FormRoot, min, required } from '@angular/forms/signals';
import { Servicio } from '../../services/servicio';
import { FABRICANTES, FAMILIAS, Instrumento, InstrumentoFormulario } from '../../modelo';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-formulario',
  styleUrl: './formulario.css',
  templateUrl: './formulario.html',
})
export class Formulario implements OnInit {
  private readonly servicio = inject(Servicio);
  protected readonly familias = FAMILIAS;
  protected readonly fabricantes = FABRICANTES;

  readonly aEditar = input<Instrumento>();
  readonly aCargar = output<Instrumento>();

  protected readonly formVacio: InstrumentoFormulario = {
    modelName: '',
    maker: '',
    family: '',
    salePrice: Number.NaN,
    isInStore: false,
    constructionDetails: '',
  };

  protected readonly modelo = signal<InstrumentoFormulario>({ ...this.formVacio });
  ngOnInit() {
    const p = this.aEditar();
    if (p) this.modelo.set(p);
  }

  readonly formu = form(
    this.modelo,
    (p) => {
      required(p.modelName, { message: 'Requerido' });
      required(p.maker, { message: 'Requerido' });
      required(p.family, { message: 'Requerido' });
      required(p.salePrice, { message: 'Requerido' });
      required(p.constructionDetails, { message: 'Requerido' });
      min(p.salePrice, 0, { message: 'No puede ser negativo' });
    },
    {
      submission: {
        action: async (campo) => {
          const valores = campo().value();
          const actual = this.aEditar();

          if (actual) {
            if (!confirm('Seguro desea editar el producto?')) return;
            const resultado = await firstValueFrom(this.servicio.editar(actual.id, valores));
            alert('Producto editado');
            this.aCargar.emit(resultado);
          } else {
            await firstValueFrom(this.servicio.agregar(valores));
            alert('Producto agregado');
            this.limpiarFormulario();
          }
        },
        onInvalid: () => {
          alert('Revise el formulario');
        },
      },
    },
  );

  limpiarFormulario() {
    this.formu().reset({ ...this.formVacio });
  }
}
