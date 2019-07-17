const sr = require("./server.json");
const { zipFile } = require("./zip.ts");
const { uploadFile } = require("./ssh.ts");
const d = new Date();

const time = d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + "_" + d.getHours() + "_" + d.getMinutes();
const SSHConfig = {
  host: sr.host,
  username: sr.username,
  password: sr.password,
  port: sr.port
};
const zipFileName = "V" + time + ".zip";

function deploy() {
  console.log("开始部署 🙊!");
  zipFile(zipFileName, sr.localDir)
    .then(() => {
      console.log("压缩包📦 生成成功!");
      uploadFile(SSHConfig, __dirname, sr.path, zipFileName);
    })
    .catch(() => {
      console.error("压缩包📦 生成失败!");
    });
}
deploy();
