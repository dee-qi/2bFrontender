var fs = require('fs');

//读文件
fs.readFile('note.md', function (err, data) {
    console.log(data);
    console.log(data.toString());
})

//写文件
var message = 'this is writed by nodejs';

fs.writeFile('writed.txt', message, function (err) {
    if(!err) {
        console.log('文件写入成功');
    } else {
        console.log(err);
    }
})