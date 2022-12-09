class Knot {
  name: string;
  head: Knot | null = null;
  tail: Knot | null = null;
  position: number[] = [0, 0];
  visitedPositions: number[][] = [];
  constructor(name: string) {
    this.name = name;
    this.visitedPositions.push(this.position);
  }

  addKnot(knot: Knot) {
    if (this.tail === null) {
      this.tail = knot;
      knot.head = this;
    } else {
      this.tail.addKnot(knot);
    }
  }

  updateTailPosition(previousHeadPosition: number[]) {
    const tail = this.tail as Knot;
    if (tail.tail) {
      tail.updateTailPosition(tail.position);
    }
    if (
      Math.abs(this.position[0] - tail.position[0]) <= 1 &&
      Math.abs(this.position[1] - tail.position[1]) <= 1
    ) {
      return;
    }
    // console.log("Before update", this.tail?.name, this.tail?.position);
    if (this.position[0] === tail.position[0]) {
      if (this.position[1] - tail.position[1] > 1) {
        tail.position = [tail.position[0], tail.position[1] + 1];
      } else if (this.position[1] - tail.position[1] < -1) {
        tail.position = [tail.position[0], tail.position[1] - 1];
      }
    } else if (
      Math.abs(this.position[0] - tail.position[0]) >= 2 ||
      Math.abs(this.position[1] - tail.position[1]) >= 2
    ) {
      tail.position = previousHeadPosition;
    }
    tail.visitedPositions.push(tail.position);
    // console.log("After update", this.name, tail.position);
  }

  updatePosition(previousPosition: number[], position: number[]) {
    this.position = position;
    this.updateTailPosition(previousPosition);
  }
}

class Rope {
  rootHead: Knot;
  constructor() {
    this.rootHead = new Knot("rootHead");
  }

  getAllKnots(): Knot[] {
    const result: Knot[] = [];
    let currentKnot = this.rootHead;
    while (currentKnot.tail !== null) {
      result.push(currentKnot);
      currentKnot = currentKnot.tail;
      if (currentKnot.tail === null) {
        result.push(currentKnot);
      }
    }
    return result;
  }

  getLastKnot(): Knot {
    let currentKnot = this.rootHead;
    while (currentKnot.tail !== null) {
      currentKnot = currentKnot.tail;
      if (currentKnot.tail === null) {
        return currentKnot;
      }
    }
    return currentKnot;
  }

  addKnot(knot: Knot) {
    this.rootHead.addKnot(knot);
  }

  moveRootHead(direction: string) {
    // console.log("Before move", this.rootHead.position);
    console.log("Move", direction, "1");
    const previousPosition = this.rootHead.position;
    switch (direction) {
      case "U":
        this.rootHead.updatePosition(previousPosition, [
          this.rootHead.position[0] - 1,
          this.rootHead.position[1],
        ]);
        break;
      case "D":
        this.rootHead.updatePosition(previousPosition, [
          this.rootHead.position[0] + 1,
          this.rootHead.position[1],
        ]);
        break;
      case "R":
        this.rootHead.updatePosition(previousPosition, [
          this.rootHead.position[0],
          this.rootHead.position[1] + 1,
        ]);
        break;
      case "L":
        this.rootHead.updatePosition(previousPosition, [
          this.rootHead.position[0],
          this.rootHead.position[1] - 1,
        ]);
        break;
    }
    // console.log("After move", this.rootHead.position + "\n");
  }
}
const part2 = (data: string[]): number => {
  const root = new Rope();
  for (let i = 1; i < 10; i++) {
    const knot = new Knot(`knot${i}`);
    root.addKnot(knot);
  }

  data.forEach((line) => {
    const [direction, step] = line.split(" ");
    // console.log("Move root head", direction, step);
    //Run 1 step every 2 second and re render grid

    for (let i = 0; i < parseInt(step); i++) {
      root.moveRootHead(direction);
      resetGrid();
      renderGrid(root);
    }
  });
  // const lastKnotVisitedPositions = root.getLastKnot().visitedPositions;
  // const result = [...new Set(lastKnotVisitedPositions.map(p => p.join(",")))]
  // // root.getAllKnots().forEach(knot => {
  // //   console.log(knot.name, knot.position)
  // // })
  return 0;
};

// Generate 50x50 grid into html
// Path: 2022/day9/part2.ts
const generateGrid = () => {
  const app = document.getElementById("app");
  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(50, 1fr)";
  grid.style.gridTemplateRows = "repeat(50, 1fr)";
  grid.style.width = "100%";
  grid.style.height = "100%";
  grid.style.margin = "0 auto";
  grid.style.padding = "0";
  grid.style.boxSizing = "border-box";
  grid.style.position = "relative";
  app?.appendChild(grid);
  for (let i = -25; i < 25; i++) {
    for (let j = -25; j < 25; j++) {
      const cell = document.createElement("div");
      cell.style.border = "1px solid white";
      cell.style.boxSizing = "border-box";
      cell.style.padding = "0";
      cell.style.margin = "0";
      cell.style.backgroundColor = "white";
      cell.style.position = "relative";
      cell.style.display = "flex";
      cell.style.justifyContent = "center";
      cell.style.alignItems = "center";
      cell.innerHTML = ".";
      cell.attributes.setNamedItem(document.createAttribute("data-id"));
      cell.setAttribute("data-id", `${i}-${j}`);
      grid.appendChild(cell);
    }
  }
};

const resetGrid = () => {
  const cells = document.querySelectorAll("div[data-id]");
  cells.forEach((cell) => {
    cell.classList.remove("knot");
    cell.classList.remove("rootHead");
    cell.classList.remove("knot1");
    cell.classList.remove("knot2");
    cell.classList.remove("knot3");
    cell.classList.remove("knot4");
    cell.classList.remove("knot5");
    cell.classList.remove("knot6");
    cell.classList.remove("knot7");
    cell.classList.remove("knot8");
    cell.classList.remove("knot9");
    cell.innerHTML = ".";
  });
};

const renderGrid = (rope: Rope) => {
  const allKnots = rope.getAllKnots();
  allKnots.forEach((knot) => {
    const cell = document.querySelector(
      `[data-id="${knot.position[0]}-${knot.position[1]}"]`
    ) as Element;
    cell?.classList.add("knot");
    cell?.classList.add(knot.name);
    cell.innerHTML = knot.name;
  });
};

generateGrid();

const input = `
R 5\n
U 8\n
L 8\n
D 3\n
R 17\n
D 10\n
L 25\n
U 20\n
`;

const data = input.split("\n");
part2(data);
