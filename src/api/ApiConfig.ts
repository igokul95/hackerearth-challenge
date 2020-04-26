import { AjaxRequestBuilder } from "./AjaxBuilder";

const getConfigurationBuilder: (url: string) => AjaxRequestBuilder = (
  url: string
) =>
  new AjaxRequestBuilder()
    .headers({
      "Content-Type": "application/json"
    })
    .method("GET")
    .url(url);

export const getConfigWithoutToken = (url: string) => {
  return getConfigurationBuilder(url).build();
};

export const getConfig = (url: string) => getConfigurationBuilder(url).build();
