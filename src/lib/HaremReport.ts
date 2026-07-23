// types/harem.types.ts

export interface HaremEntry {
  user_id: number;
  first_name: string;
  date: string | Date;  // ISO 8601 string que puede parsearse a Date
  avatar?: string | null;  // opcional, puede ser null si no se encuentra
}

export interface HaremReportMongo {
  _id: string;           // así viene de MongoDB
  fecha: string | Date;
  husbandos: HaremEntry[];
  husbandos_count: number;
  waifus: HaremEntry[];
  waifus_count: number;
}

// Interfaz "limpia" para usar en la app (renombra _id a id)
export interface HaremReport {
  id: string;            // alias de _id
  fecha: string | Date;
  husbandos: HaremEntry[];
  husbandos_count: number;
  waifus: HaremEntry[];
  waifus_count: number;
}

// Respuesta de la API
export interface HaremReportResponse {
  success: boolean;
  data: HaremReport | null;
  error?: string;
}