export interface UsuarioRegister {
  nome: string;
  email: string;
  senha: string;
}

export interface Transacao {
  descricao: string;
  tipo: TipoTransacao; // 'entrada' | 'saida'
  valor: number;
  data: Date;
  createdAt: Date;
  updatedAt: Date;
  categoria_id: number;
  usuario_id: number;
  mesAno_id?: number;
  parcelamento_id?: number;
  Parcelamento?: Parcelamento;
  usuario: Usuario;
  Categoria: Categoria;
  MesAno?: MesAno;
}

type TipoTransacao = "entrada" | "saida";

export interface Parcelamento {
  id: number;
  // Add other fields as per your model
}

export interface Usuario {
  id: number;
  // Add other fields as per your model
}

export interface Categoria {
  id: number;
  nome: string;
  // Add other fields as per your model
}

export interface MesAno {
  id: number;
  // Add other fields as per your model
}
