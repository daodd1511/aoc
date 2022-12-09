var Knot = /** @class */ (function () {
    function Knot(name) {
        this.head = null;
        this.tail = null;
        this.position = [0, 0];
        this.visitedPositions = [];
        this.name = name;
        this.visitedPositions.push(this.position);
    }
    Knot.prototype.addKnot = function (knot) {
        if (this.tail === null) {
            this.tail = knot;
            knot.head = this;
        }
        else {
            this.tail.addKnot(knot);
        }
    };
    Knot.prototype.updateTailPosition = function (previousHeadPosition) {
        var tail = this.tail;
        if (tail.tail) {
            tail.updateTailPosition(tail.position);
        }
        if (Math.abs(this.position[0] - tail.position[0]) <= 1 &&
            Math.abs(this.position[1] - tail.position[1]) <= 1) {
            return;
        }
        // console.log("Before update", this.tail?.name, this.tail?.position);
        if (this.position[0] === tail.position[0]) {
            if (this.position[1] - tail.position[1] > 1) {
                tail.position = [tail.position[0], tail.position[1] + 1];
            }
            else if (this.position[1] - tail.position[1] < -1) {
                tail.position = [tail.position[0], tail.position[1] - 1];
            }
        }
        else if (Math.abs(this.position[0] - tail.position[0]) >= 2 ||
            Math.abs(this.position[1] - tail.position[1]) >= 2) {
            tail.position = previousHeadPosition;
        }
        tail.visitedPositions.push(tail.position);
        // console.log("After update", this.name, tail.position);
    };
    Knot.prototype.updatePosition = function (previousPosition, position) {
        this.position = position;
        this.updateTailPosition(previousPosition);
    };
    return Knot;
}());
var Rope = /** @class */ (function () {
    function Rope() {
        this.rootHead = new Knot("rootHead");
    }
    Rope.prototype.getAllKnots = function () {
        var result = [];
        var currentKnot = this.rootHead;
        while (currentKnot.tail !== null) {
            result.push(currentKnot);
            currentKnot = currentKnot.tail;
            if (currentKnot.tail === null) {
                result.push(currentKnot);
            }
        }
        return result;
    };
    Rope.prototype.getLastKnot = function () {
        var currentKnot = this.rootHead;
        while (currentKnot.tail !== null) {
            currentKnot = currentKnot.tail;
            if (currentKnot.tail === null) {
                return currentKnot;
            }
        }
        return currentKnot;
    };
    Rope.prototype.addKnot = function (knot) {
        this.rootHead.addKnot(knot);
    };
    Rope.prototype.moveRootHead = function (direction) {
        // console.log("Before move", this.rootHead.position);
        console.log("Move", direction, "1");
        var previousPosition = this.rootHead.position;
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
    };
    return Rope;
}());
var part2 = function (data) {
    var root = new Rope();
    for (var i = 1; i < 10; i++) {
        var knot = new Knot("knot".concat(i));
        root.addKnot(knot);
    }
    data.forEach(function (line) {
        var _a = line.split(" "), direction = _a[0], step = _a[1];
        // console.log("Move root head", direction, step);
        //Run 1 step every 2 second and re render grid
        for (var i = 0; i < parseInt(step); i++) {
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
var generateGrid = function () {
    var app = document.getElementById("app");
    var grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(50, 1fr)";
    grid.style.gridTemplateRows = "repeat(50, 1fr)";
    grid.style.width = "100%";
    grid.style.height = "100%";
    grid.style.margin = "0 auto";
    grid.style.padding = "0";
    grid.style.boxSizing = "border-box";
    grid.style.position = "relative";
    app === null || app === void 0 ? void 0 : app.appendChild(grid);
    for (var i = -25; i < 25; i++) {
        for (var j = -25; j < 25; j++) {
            var cell = document.createElement("div");
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
            cell.setAttribute("data-id", "".concat(i, "-").concat(j));
            grid.appendChild(cell);
        }
    }
};
var resetGrid = function () {
    var cells = document.querySelectorAll("div[data-id]");
    cells.forEach(function (cell) {
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
var renderGrid = function (rope) {
    var allKnots = rope.getAllKnots();
    allKnots.forEach(function (knot) {
        var cell = document.querySelector("[data-id=\"".concat(knot.position[0], "-").concat(knot.position[1], "\"]"));
        cell === null || cell === void 0 ? void 0 : cell.classList.add("knot");
        cell === null || cell === void 0 ? void 0 : cell.classList.add(knot.name);
        cell.innerHTML = knot.name;
    });
};
generateGrid();
var input = "\nR 5\n\nU 8\n\nL 8\n\nD 3\n\nR 17\n\nD 10\n\nL 25\n\nU 20\n\n";
var data = input.split("\n");
part2(data);
