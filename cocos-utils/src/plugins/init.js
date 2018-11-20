var fs = require("fs");
var path = require("path");
var cfg = require("../../cfg/cfg.js");
var genRes = require("./genRes");

/**
 * Desc: 通用格式化方法
 * @param filePath
 * @param info
 */
function pubFrmt(filePath, info){
    var content = fs.readFileSync(filePath).toString();
    content = content.replace(/\[\%name\%\]/g, info.name);
    content = content.replace(/\[\%ccDir\%\]/g, info.ccDir);
    fs.writeFileSync(filePath, content);
}

function jsResFrmt(filePath, info){
    console.log(path.join('src', "MyLayer.js"));
    fs.writeFileSync(filePath, 'js.' + info.name + ' = {\r\n    MyLayer_js : ' + JSON.stringify('[%' + info.name + '%]src/MyLayer.js')
        + '\r\n};');
}

/**
 * Desc: 文件格式化工具。
 * @type {{}}
 */
var fileFrmt = {};
fileFrmt["index.html"] = pubFrmt;
fileFrmt["release.html"] = pubFrmt;
fileFrmt["resCfg.js"] = pubFrmt;
fileFrmt["index.html"] = pubFrmt;
fileFrmt["package.json"] = pubFrmt;
fileFrmt["main.js"] = pubFrmt;
fileFrmt["jsRes.js"] = jsResFrmt;

/**
 * Desc: 赋值文件到指定文件夹
 * @param srcDir
 * @param targetDir
 * @param opts
 * @private
 */
function _copyFiles(srcDir, targetDir, opts){
    var files = fs.readdirSync(srcDir);
    for(var i = 0, li = files.length; i < li; i++){
        var file = files[i];
        if(fs.statSync(path.join(srcDir, file)).isDirectory()){//如果是目录则创建目录
            var dir = path.join(targetDir, file + "/");
            fs.mkdirSync(dir);
            _copyFiles(path.join(srcDir, file + "/"), dir, opts);//继续递归
        }else{
            var filePath = path.join(targetDir, file);
            fs.writeFileSync(filePath, fs.readFileSync(path.join(srcDir, file)));//如果是文件则复制过去
            if(fileFrmt[file]) {
                fileFrmt[file](filePath, opts);
            }
        }
    }
}

/**
 * Desc: 初始化工程。
 * @param projName
 * @param opts
 * @returns {*}
 */
function init(projName, opts){
    var tempDir = path.join(__dirname, "../../templates/", opts.tempName + "/");
    if(!fs.existsSync(tempDir)) return console.error(tempDir + " not exists!");//if project temp exists

    var projDir = path.join("./", opts.dir || projName);
    //the project exists
    if(fs.existsSync(projDir)) return console.error(projDir + " exists! Can not create again!");
    fs.mkdirSync(projDir);
    opts.name = projName;
    opts.ccDir = "node_modules/cocos2d-html5/";
    _copyFiles(tempDir, projDir, opts);

    genRes(projDir, {});
};


module.exports = init;