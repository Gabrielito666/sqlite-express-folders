const SqliteExpress = require('sqlite-express');
const LekDirObject = require('lek-dir-object');
const path = require('path');
const processTree = require('./modules/processTree');
class SqliteExpressFolders{
    constructor({ instance, rootPath, routeFolder }){
        this.rootPath = rootPath ? rootPath : (module.parent.filename ? path.dirname(module.parent.filename) : '.');
        this.instance = instance ? instance : new SqliteExpress(rootPath);
        this.routeFolder = path.isAbsolute( routeFolder ) ? routeFolder : path.resolve( this.rootPath, routeFolder );
    }
    async initialize(){
        this.lek_dir_object = new LekDirObject(this.routeFolder, this.rootPath);
        this.lek_dir_object.setSpesificMode(['methods'])
        await this.lek_dir_object.initialize();
        this.tree = await processTree(this.lek_dir_object.tree, this);
    };
};
module.exports = SqliteExpressFolders;