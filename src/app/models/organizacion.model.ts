import { Usuario } from './usuario.model';

export interface Organizacion {
  _id: string;
  name: string;
  usuarios?: Usuario[]; // Añadido para mapear el array de objetos User devuelto por el backend
}