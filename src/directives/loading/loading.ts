
// 新建文件  src/directives/loading/index.ts

import { createApp, Directive } from 'vue';
import Loading from './index.vue';

const loading: Directive = {
  mounted(el, binding) {
    const app = createApp(Loading);
    const instance = app.mount(document.createElement('div'));
    el.instance = instance;
    el.style.position = 'relative';
    if (binding.value) {
      console.log('el', app, instance);
      setTimeout(() => {
        console.log(instance);

      }, 300);

      appendEl(el);
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? appendEl(el) : removeEl(el);
    }
  },
};
interface elType {
  appendChild(arg0: any): void
  removeChild(arg0: any): void
  instance: { $el: any; }
}
const appendEl = (el: { appendChild: (arg0: any) => void; instance: { $el: any; }; }) => {
  el.appendChild(el.instance.$el);
};

const removeEl = (el: { removeChild: (arg0: any) => void; instance: { $el: any; }; }) => {
  el.removeChild(el.instance.$el);
};

export default loading;
