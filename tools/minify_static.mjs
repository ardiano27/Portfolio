import { readFileSync, writeFileSync, statSync } from "node:fs";
import { basename } from "node:path";

const files = [
  { input: "style.css", output: "style.min.css", minify: minifyCss },
  { input: "script.js", output: "script.min.js", minify: minifyJs },
];

function minifyCss(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

function stripJsComments(source) {
  let output = "";
  let quote = null;
  let escaped = false;

  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    const next = source[i + 1];

    if (quote) {
      output += char;
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      output += char;
      continue;
    }

    if (char === "/" && next === "/") {
      while (i < source.length && source[i] !== "\n") i++;
      output += "\n";
      continue;
    }

    if (char === "/" && next === "*") {
      i += 2;
      while (i < source.length && !(source[i] === "*" && source[i + 1] === "/")) i++;
      i++;
      continue;
    }

    output += char;
  }

  return output;
}

function minifyJs(source) {
  return stripJsComments(source)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function size(path) {
  return statSync(path).size;
}

for (const file of files) {
  const source = readFileSync(file.input, "utf8");
  const minified = file.minify(source);
  writeFileSync(file.output, `${minified}\n`);

  const before = size(file.input);
  const after = size(file.output);
  const ratio = after / before;
  console.log(`${basename(file.input)} -> ${basename(file.output)} (${ratio.toFixed(1)}x, ${before}B to ${after}B)`);
}
