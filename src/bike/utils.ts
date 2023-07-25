enum Dir {
  FORWARDS = 1,
  BACK = -1,
  STOP = 0,
}
enum Keys {
  UP = "w",
  DOWN = "s",
  RIGHT = "d",
  LEFT = "a",
}
const updateData = {
  velocity: 0,
  accel: 0,
  lrDir: 0,
  direction: Dir.STOP,
  color: "red",
  updateDirection: () => {
    const currentDir = updateData.direction;
    if (updateData.velocity > 0) updateData.direction = Dir.FORWARDS;
    else if (updateData.velocity < 0) updateData.direction = Dir.BACK;
    else updateData.direction = Dir.STOP;
    if (updateData.direction !== currentDir) {
      console.log("Direction changed: " + updateData.direction);
      console.log("Accel: " + updateData.accel);
    }
  },
  update: () => {
    if (updateData.velocity > 0.01) updateData.velocity -= 0.009;
    if (updateData.velocity < -0.005) updateData.velocity += 0.01;
    if (updateData.velocity > -0.005 && updateData.velocity < 0)
      updateData.velocity = 0;
    if (updateData.velocity < 0.01 && updateData.velocity > 0)
      updateData.velocity = 0;
    // if (updateData.velocity < -0.2) updateData.accel += 0.02;
    // if (updateData.velocity > 0.01) updateData.velocity -= 0.01;
    // else if (updateData.velocity < -0.01) updateData.velocity += 0.01;
    // if (
    //   (updateData.velocity < 0.01 && updateData.velocity > 0) ||
    //   updateData.velocity > -0.01 ||
    //   updateData.velocity < 0
    // )
    //   updateData.velocity = 0;
    // updateData.velocity += updateData.accel;
    updateData.updateDirection();
    // console.log("Velocity here ", updateData.velocity);
    // console.log("Accel here ", updateData.accel);
  },
  updateColor: (color: string) => {
    console.log(updateData);
    updateData.color = color;
  },
};

const upDownHandler = (e: KeyboardEvent) => {
  if (e.key === Keys.UP) {
    if (updateData.accel < 0.05) updateData.accel += 0.01;
  } else if (e.key === Keys.DOWN) {
    if (updateData.accel > -0.02) updateData.accel -= 0.01;
  }
  if (updateData.velocity < 5 && updateData.velocity > -0.5) {
    console.log("Update Speed", updateData.velocity);
    updateData.velocity += updateData.accel;
  }
  // console.log("Velocity: " + updateData.velocity, "accel:", updateData.accel);
  updateData.updateDirection();
};

const leftRightHandler = (e: KeyboardEvent) => {
  if (e.key === Keys.LEFT) {
    updateData.lrDir = -1;
  } else if (e.key === Keys.RIGHT) {
    updateData.lrDir = 1;
  } else updateData.lrDir = 0;
};

const renderColorBoxes = (...args: string[]) => {
  return new Promise<HTMLElement[]>((resolve) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("colorbox-wrapper");
    const els: HTMLElement[] = [];
    args.forEach((arg) => {
      // const colorBox = `<div data-color="${arg}"></div>`;;
      const colorBox = document.createElement("div");
      colorBox.setAttribute("data-color", arg);
      colorBox.style.backgroundColor = arg;
      wrapper.appendChild(colorBox);
      els.push(colorBox);
    });
    document.body.appendChild(wrapper);
    resolve(els);
  });
};

export { upDownHandler, leftRightHandler, updateData, renderColorBoxes };
