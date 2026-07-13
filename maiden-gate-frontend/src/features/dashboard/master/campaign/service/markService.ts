import api from "../../../../../services/api";

export type MarkOption = {
  id: number;
  name: string;
};

export async function getMarks() {
  const response = await api.get("/marcas");
  return response.data as MarkOption[];
}
