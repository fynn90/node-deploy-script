import { SFTPStream, SSH2Stream } from "ssh2-streams";

const path = require("path");
const Client = require("ssh2").Client;
const fs = require("fs");
interface SSHConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

exports.uploadFile = function(config: SSHConfig, localPath: string, remotePath: string, fileName: string) {
  const local = path.join(localPath, fileName);
  const remote = path.join(remotePath, fileName);
  var shellList = [
    `cd ${remotePath}\n`,
    `unzip -ol ${fileName}\n`,
    "rm -rf backup.zip\n",
    `mv ${fileName} backup.zip\n`,
    "exit\n"
  ];
  console.log("准备上传⏫文件!");
  const conn = new Client();
  conn
    .on("ready", function() {
      console.log("服务器连接成功!");
      conn.sftp((err: any, sftp: SFTPStream) => {
        console.log("开始上传文件!");
        if (err) return;
        sftp.fastPut(local, remote, {}, function(err: any) {
          if (err) {
            console.error(err);
            return;
          } else {
            conn.shell(function(err: any, stream: SSH2Stream) {
              stream
                .on("close", function() {
                  console.log("文件上传成功!");
                  conn.end();
                  fs.unlink(local, () => {
                    console.log("已部署到测试服务器");
                  });
                })
                .on("data", function(data: any) {
                  console.log("OUTPUT: " + data);
                });
              stream.end(shellList.join(""));
            });
          }
        });
      });
    })
    .connect(config);
};
