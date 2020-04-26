import { AjaxRequest } from "rxjs/ajax";

type HTTPVerbs = "GET" | "POST" | "PATCH" | "DELETE";

export class AjaxRequestBuilder {
  private request: AjaxRequest = {};
  public async = (value: boolean) => {
    this.request.async = value;
    return this;
  };
  public url = (value: string) => {
    this.request.url = value;
    return this;
  };
  public body = (value: any) => {
    this.request.body = value;
    return this;
  };
  // tslint:disable-next-line:ban-types
  public headers = (value: Object) => {    
    this.request.headers = value;
    return this;
  };
  public appendCSRF = (csrfToken: string) => {
    this.request.headers = {...this.request.headers, 'X-CSRFToken': csrfToken,}
    return this;
  }
  public appendAuthToken = (token: string) => {
    this.request.headers = {...this.request.headers, Authorization: 'Token ' + token,}
    return this;
  }
  public method = (value: HTTPVerbs) => {
    this.request.method = value;
    return this;
  };
  public build = () => {
    return this.request};
}
