/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare interface Window {
  rendomImgUrl: string;
  $store: any;
}

declare type RT<T extends () => any> = ReturnType<T>;

declare module "howler";
declare module "vite";
declare module "md5";
declare module "vue-plyr";
