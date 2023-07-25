import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { eventHandler, renderColorBoxes, updateData } from "./utils";
import { Color, Mesh } from "three";

const bikeColorsMeshes = [
  "tail_plastics_Paint_0",
  "fuel_tank_Paint_0",
  "front_fender_Paint_0",
  "starter_kill_switch_Red_Plastic_Shiny_0",
  "Red_Plastic_Shiny",
];
const tires = ["rear_tire_surface", "front_tire_surface"];
const tire_rims = ["rear_wheel_geometry", "front_rim"];

async function renderBikes() {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync("/street_bike/scene.gltf");
  let currentColor = updateData.color;
  let currentSpeed = updateData.velocity;
  gltf.scene.scale.set(0.2, 0.2, 0.2);
  renderColorBoxes("red", "brown", "green", "orange", "yellow", "black").then(
    (divs: HTMLElement[]) => {
      divs.forEach((d) =>
        d.addEventListener("click", () =>
          updateData.updateColor(d.getAttribute("data-color")!)
        )
      );
    }
  );
  const update = () => {
    if (gltf) gltf.scene.rotateY(0.1);
  };

  const tiresObj = tires.map((t) => gltf.scene.getObjectByName(t));
  const rimsObj = tire_rims.map((t) => gltf.scene.getObjectByName(t));
  const bikeColors = bikeColorsMeshes
    .map((mesh) => {
      const surface = gltf.scene.getObjectByName(mesh) as Mesh;
      return surface;
    })
    .filter((d: any) => d instanceof Mesh && d.material.color instanceof Color)
    .map<Color>((d: any) => d.material.color);

  window.addEventListener("keydown", eventHandler);
  const speed = document.getElementById("speed") as HTMLSpanElement;

  setInterval(() => {
    // rTire?.rotateX(0.01);
    // fTire?.rotateX(0.01);
    // if (updateData.lrDir > 0) fTire?.rotateZ(0.01);
    // else if (updateData.lrDir < 0) fTire?.rotateZ(-0.01);
    // else fTire?.rotateZ(Math.sign(fTire.rotation.z) * -0.01);
    updateData.update(speed);
    currentSpeed = updateData.velocity;
    tiresObj.forEach((tire) => {
      tire?.rotateX(currentSpeed);
    });
    rimsObj.forEach((tire) => {
      tire?.rotateZ(currentSpeed);
    });
    if (currentColor !== updateData.color) {
      currentColor = updateData.color;
      // updateColor();
      bikeColors.forEach((c) => {
        c.setColorName(currentColor);
      });
    }
  }, 10);

  console.log(gltf);
  gltf.scene.traverse((o) => {
    if (o.name.includes("tire")) console.info(o);
  });
  return { object: gltf.scene, update };
}
export { renderBikes };
