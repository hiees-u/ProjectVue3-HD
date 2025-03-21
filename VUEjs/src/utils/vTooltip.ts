import { Directive, DirectiveBinding } from "vue";

const vTooltip: Directive<HTMLElement, string> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    const tooltip = document.createElement("div");
    tooltip.textContent = binding.value;
    tooltip.className = "tooltip";

    el.style.position = "relative";
    tooltip.style.position = "absolute";
    tooltip.style.backgroundColor = "black";
    tooltip.style.color = "white";
    tooltip.style.padding = "5px 10px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.whiteSpace = "nowrap";
    tooltip.style.fontSize = "12px";
    tooltip.style.opacity = "0.9";
    tooltip.style.visibility = "hidden";

    el.appendChild(tooltip);

    el.addEventListener("mouseenter", () => {
      tooltip.style.visibility = "visible";
    });

    el.addEventListener("mouseleave", () => {
      tooltip.style.visibility = "hidden";
    });
  }
};

export default vTooltip;
