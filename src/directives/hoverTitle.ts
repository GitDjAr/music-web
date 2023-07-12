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
            style: {
              top: `${y.value + 10}px`,
              left: `${x.value + 10}px`,
              position: "absolute",
              zIndex: "10",
              padding: "0.375rem",
              backgroundColor: "#6B7280",
              transitionProperty: "all",
              transitionDuration: "200ms",
              color: "#ffffff",
              fontSize: "0.875rem",
              fontWeight: "300",
              lineHeight: ".75rem",
              borderRadius: "0.125rem",
            },
          },
          binding.value
        );
        render($dom, document.body);
      }, +(binding?.arg || 0) || 500);
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
