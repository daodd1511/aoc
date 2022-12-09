import { readFileSync, writeFileSync } from "fs";
import util from "util";

class FileNode {
  name: string;
  children: FileNode[];
  parent: FileNode | null;
  path: string;
  size: number;
  constructor(name: string) {
    this.name = name;
    this.children = [];
    this.parent = null;
    this.path = "";
    this.size = 0;
  }
}

class FileSystem {
  fileSystem: FileNode;
  currentDir: FileNode;
  constructor() {
    this.fileSystem = new FileNode("/");
    this.currentDir = { ...this.fileSystem };
  }

  // Change directory
  cd(path: string) {
    if (path === ".." && this.currentDir.parent) {
      this.currentDir = this.currentDir.parent;
      return;
    }
    const child = this.currentDir.children.find((child) => child.name === path);
    if (child) {
      this.currentDir = child;
    }
  }

  // Create directory
  mkdir(path: string) {
    const child = this.currentDir.children.find((child) => child.name === path);
    if (!child) {
      const newDir = new FileNode(path);
      newDir.parent = this.currentDir;
      newDir.path = this.currentDir.path + "/" + path;
      this.currentDir.children.push(newDir);
    }
  }

  // Create file
  touch(size: string, path: string) {
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

const buildFileSystem = (input: string[]) => {
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

const getDirectoriesSize = (
  node: FileNode,
  sizesHolder: number[] = []
): number => {
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

const solve = (input: string) => {
  const TOTAL_SIZE = 70_000_000;
  const REQUIRED_SIZE = 30_000_000;
  const data = input.split("\n");
  const root = buildFileSystem(data).getRoot();
  const sizes: number[] = [];
  const rootSize = getDirectoriesSize(root, sizes);
  
  // Part 1
  const smallDir = sizes.filter((dir) => dir < 100000);
  const p1Result = smallDir.reduce((sum, size) => sum + size, 0);
  console.log("Part 1: " + p1Result);

  // Part 2
  const unusedSize = TOTAL_SIZE - rootSize;
  const satisfiedDir = sizes.filter(
    (size) => size + unusedSize >= REQUIRED_SIZE
  );
  const p2Result = Math.min(...satisfiedDir);
  console.log("Part 2: " + p2Result);

  // Export result
  writeFileSync("./output.txt", 'Part 1: ' + p1Result + '\n'+ 'Part 2: ' + p2Result);
};

const exampleInput = readFileSync("./exampleInput.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");
solve(input);
