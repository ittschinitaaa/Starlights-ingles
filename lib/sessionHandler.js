const fs = require("fs");
const path = require("path");

const baseDir = path.join(process.cwd(), "sessions-sub");

function createSessionDir(number) {
  const dir = path.join(baseDir, number);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function listSessions() {
  if (!fs.existsSync(baseDir)) return [];
  return fs.readdirSync(baseDir).filter((d) => fs.lstatSync(path.join(baseDir, d)).isDirectory());
}

function deleteSession(number) {
  const dir = path.join(baseDir, number);
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

module.exports = { createSessionDir, listSessions, deleteSession };
