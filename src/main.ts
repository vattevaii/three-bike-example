import "./style.css";
import { setupScene } from "./scene";
import { renderBikes } from "./bike/index";

const defaultExtrusion = 1;
const container = document.querySelector("#app");
const extrusionInput: HTMLInputElement | null =
  document.querySelector("#input");
if (container && extrusionInput) {
  const scene = setupScene(container);
  const updates: any[] = [];
  extrusionInput.value = defaultExtrusion.toString();
  // const { object, update } = renderSVG(defaultExtrusion, svg);
  // updates.push(() => update(Number(extrusionInput.value)));
  renderBikes().then(({ object, update }) => {
    scene.add(object);
    updates.push(update);
  });
  // scene.add(object);
  extrusionInput.addEventListener("input", () => {
    updates.forEach((update) => update());
  });
}
