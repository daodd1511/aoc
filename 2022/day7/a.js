const fs = require("fs");
const util = require("util");
class FileNode {
  constructor(name) {
    this.name = name;
    this.children = [];
    this.parent = null;
    this.path = "";
    this.size = 0;
  }
}

// Class file system with command
class FileSystem {
  constructor() {
    this.fileSystem = new FileNode("/");
    this.currentDir = { ...this.fileSystem };
  }

  // Change directory
  cd(path) {
    if (path === "..") {
      this.currentDir = this.currentDir.parent;
      return;
    }
    const child = this.currentDir.children.find((child) => child.name === path);
    if (child) {
      this.currentDir = child;
    }
  }

  // Create directory
  mkdir(path) {
    const child = this.currentDir.children.find((child) => child.name === path);
    if (!child) {
      const newDir = new FileNode(path);
      newDir.parent = this.currentDir;
      newDir.path = this.currentDir.path + "/" + path;
      this.currentDir.children.push(newDir);
    }
  }

  // Create file
  touch(size, path) {
    const child = this.currentDir.children.find((child) => child.name === path);
    if (!child) {
      const newFile = new FileNode(path);
      newFile.parent = this.currentDir;
      newFile.path = this.currentDir.path + "/" + path;
      newFile.size = parseInt(size, 10);
      this.currentDir.children.push(newFile);
    }
  }

  // Get root directory
  getRoot() {
    return this.fileSystem;
  }

  // List directory
  ls() {
    return this.currentDir.children.map((child) => child.name);
  }

  // Print file system
  print() {
    console.log(
      util.inspect(this.fileSystem, {
        showHidden: false,
        depth: null,
        colors: true,
      })
    );
  }
}

const buildFileSystem = (input) => {
  const fileSystem = new FileSystem();
  input.forEach((line) => {
    const command = line.split(" ");
    if (command[0] === "$" && command[1] === "ls") {
      return;
    }
    switch (command[0]) {
      case "$":
        fileSystem.cd(command[2]);
        break;
      case "dir":
        fileSystem.mkdir(command[1]);
        break;
      default:
        fileSystem.touch(command[0], command[1]);
        break;
    }
  });
  return fileSystem;
};

const getDirectoriesSize = (node, sizesHolder = []) => {
  if (node instanceof FileNode && node.children.length === 0) {
    return node.size;
  }
  const size = node.children.reduce(
    (sum, child) => sum + getDirectoriesSize(child, sizesHolder),
    0
  );

  sizesHolder.push(size);
  return size;
};

fs.readFile("./input.txt", "utf8", (err, data) => {
    const TOTAL_SIZE = 70_000_000;
    const REQUIRED_SIZE = 30_000_000;
    const input = data.split("\n");
    const root = buildFileSystem(input).getRoot();
    const sizes = [];
    const rootSize = getDirectoriesSize(root, sizes);
    const smallDir = sizes.filter((dir) => dir < 100000);

    // Part 1
    const p1Result = smallDir.reduce((sum, size) => sum + size, 0)
    console.log("Part 1: " + p1Result);

    // Part 2
    const unusedSize = TOTAL_SIZE - rootSize;
    const satisfiedDir = sizes.filter((size) => (size + unusedSize) >= REQUIRED_SIZE);
    const p2Result = Math.min(...satisfiedDir);
    console.log("Part 2: " + p2Result);
  });