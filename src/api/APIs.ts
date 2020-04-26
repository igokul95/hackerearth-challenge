import { Observable } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { CORE_HOST } from "../constants";
import { APIUrls, ConstructURL } from "../constants/APIUrls";
import { getConfig } from "./ApiConfig";

export interface Dependencies {
  apis: Apis;
}

interface Apis {
  getGames: () => Observable<AjaxResponse>;
}

const apis: Apis = {
  getGames: () => ajax(getConfig(ConstructURL(CORE_HOST, APIUrls.getGames)))
};

export const dependencies: Dependencies = {
  apis: apis
};
