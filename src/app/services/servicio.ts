import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Instrumento, InstrumentoFormulario } from '../modelo';

@Service()
export class Servicio {
    protected readonly http = inject (HttpClient);
    protected readonly url = 'http://localhost:3000/instruments'

    obtenerTodos (){
        return this.http.get<Instrumento[]>(this.url);
    }

    obtenerPorId(id : string | number){
        return this.http.get<Instrumento>(this.url +'/'+ id);
    }

    agregar(i : InstrumentoFormulario){
        return this.http.post<Instrumento>(this.url, i);
    }

    borrar (id : string | number){
        return this.http.delete<Instrumento>(this.url +'/'+ id);
    }
    editar (id : string | number , i : InstrumentoFormulario){
        return this.http.put<Instrumento>(this.url +'/'+id , i);
    }

    
}
