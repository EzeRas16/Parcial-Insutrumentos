export interface Instrumento {
      id: string | number;
      modelName: string ;
      maker: string ;
      family: string;
      salePrice : number;
      isInStore: boolean;
      constructionDetails: string;
}

export interface InstrumentoFormulario {
      modelName: string ;
      maker: string ;
      family: string;
      salePrice : number;
      isInStore: boolean;
      constructionDetails: string;
}

export const FAMILIAS = ['Batería', 'Cuerda frotada',
'Cuerda pulsada', 'Teclado', 'Viento'] as const;

export const FABRICANTES = ['Fender', 'Stentor', 'Pearl', 'Yamaha'] as const;

