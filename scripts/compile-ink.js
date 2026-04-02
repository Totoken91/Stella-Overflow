const { Compiler } = require("inkjs/full");
const fs = require("fs");
const path = require("path");

const inputFile = process.argv[2] || "public/story/scene1.ink";
const outputFile = process.argv[3] || "public/story/scene1.json";

const inkSource = fs.readFileSync(path.resolve(inputFile), "utf-8");
const compiler = new Compiler(inkSource);
const story = compiler.Compile();
const jsonOutput = story.ToJson();

fs.writeFileSync(path.resolve(outputFile), jsonOutput, "utf-8");
console.log(`Compiled ${inputFile} -> ${outputFile}`);
