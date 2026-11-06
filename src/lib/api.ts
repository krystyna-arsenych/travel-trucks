import axios from "axios";
import type { CamperResponse, GetCampers } from "../types/camper";

const api = axios.create({ baseURL: "https://campers-api.goit.study" });

export const getCampers = (params: GetCampers) => {
  return api.get<CamperResponse>("/campers", { params });
};

export const getCamperById = () => {};
