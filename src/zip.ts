const pt = require("path");
const fs = require("fs");
const archiver = require("archiver");

exports.zipFile = function(fileName: string, localPath: string) {
  console.log("zip", fileName, localPath);
  return new Promise((resolve, reject) => {
    console.log(`压缩包${fileName} 生成中……`);
    const output = fs.createWriteStream(pt.join(__dirname, fileName));
    var archive = archiver("zip", {
      zlib: { level: 9 }
    });
    output.on("close", function() {
      console.log(`压缩包${fileName} 生成成功!`);
      resolve({ success: true });
    });

    output.on("end", function() {
      console.log("Data has been drained");
    });

    archive.on("warning", function(err: any) {
      console.error(err);
      if (err.code === "ENOENT") {
        // log warning
        console.warn(err);
      } else {
        // throw error
        reject(new Error(err));
      }
    });

    archive.on("error", function(err: any) {
      console.error(err);
      reject(new Error(err));
    });

    archive.pipe(output);

    archive.directory(localPath, false);
    archive.finalize();
  });
};
