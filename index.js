// 读取Node.js 基础教程文件夹下的全部html内容，获取其中的标题，
// 汇总该数据并导出json文件作为index.html的数据来源，
// index.html读取该json文件后，循环该json文件作为index.html中的菜单列表

function readFile() {
  const fs = require("fs");
  const path = require("path");
  const pathName = "Node.js 基础教程";

  let dirs = [];
  let bookList = [];
  let buffer = "";
  let htmlToText = "";
  // 存在异步问题
  // 读取文件夹
  fs.readdir(pathName, (err, files) => {
    // 循环该文件夹
    for (let i = 0; i < files.length; i++) {
      fs.stat(path.join(pathName, files[i]), (err, data) => {
        if (data.isFile()) {
          dirs.push(files[i].toString());

          buffer = fs.readFileSync("./" + pathName + "/" + files[i].toString());
          htmlToText = String(buffer);
          title = htmlToText
            .replace(/\s+/g, "")
            .replace(/.*<title>/g, "")
            .replace(/<\/title>.*/g, "");

          bookList.push({
            name: title,
            id: i
          });
        }
      });
    }
    setTimeout(() => {
      console.log("dirs:", dirs);
      console.log("bookList:", bookList);
      let str = JSON.stringify(bookList);

      fs.writeFile("data.json", str, function(err) {
        if (err) {
          res.status(500).send("Server is error...");
        }
      });
    });
  });
}

readFile();
