// 延迟hover title
import { h, render, Directive } from "vue";
import { useMouseInElement } from "@vueuse/core";

const hoverTitle: Directive = {
  mounted(el, binding) {
    const { x, y } = useMouseInElement(el);
    let timer: NodeJS.Timeout | null = null;
    let $dom: any = null;
    function renderDom() {
      timer = setTimeout(() => {
        $dom = h(
          "div",
          {
            id: "test",
            class: `p-1 rounded-sm text-sm text-white leading-3 bg-gray-500 font-light absolute transition-all duration-200 z-10`,
            style: {
              top: `${y.value + 15}px`,
              left: `${x.value + 15}px`,
            },
          },
          binding.value
        );
        render($dom, document.body);
      }, +(binding?.arg || 0) || 1000);
    }
    el.addEventListener("mouseover", renderDom);
    el.addEventListener("mouseout", () => {
      if (timer) {
        clearTimeout(timer);
      }
      //当第一个参数为 null 时，render 函数会将容器中的 vnode 节点移除，并销毁其对应的实例
      $dom = null;
      render($dom, document.body);

    });
  },
};

export default hoverTitle;
