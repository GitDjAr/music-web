/// <reference types="vite/client" />

import type { DefineComponent } from "vue";
import * as CSS from 'csstype'
declare module "*.vue" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface myStyle {
  '--stagger'?: number
  '--delay'?: string
  '--start'?: string
}
declare interface CSSProperties extends CSS.Properties<string | number>,
  CSS.PropertiesHyphen<string | number>, myStyle {
}

declare type RT<T extends () => any> = T extends Promise<infer U>
  ? U
  : T extends (arg: any) => infer R
  ? R
  : never;