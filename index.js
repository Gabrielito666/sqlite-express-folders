const SqliteExpress = require('sqlite-express');
const LekDirObject = require('lek-dir-object');
const path = require('path');
const processTree = require('./modules/processTree');
class SqliteExpressFolders{
    constructor({ sqlite_express_instance, rootPath, routeFolder, lek_dir_object_instance }){
        this.extern_lek_dir_object_instance = lek_dir_object_instance ? true : false;
        this.rootPath = rootPath ? rootPath : (module.parent.filename ? path.dirname(module.parent.filename) : '.');
        this.sqlite_express_instance = sqlite_express_instance ? sqlite_express_instance : new SqliteExpress(rootPath);
        this.lek_dir_object_instance = lek_dir_object_instance ? lek_dir_object_instance : new LekDirObject();
        this.routeFolder = path.isAbsolute( routeFolder ) ? routeFolder : path.resolve( this.rootPath, routeFolder );
    }
    async initialize(){
        this.lek_dir_object_tree = this.lek_dir_object_instance.createTree(this.routeFolder, this.rootPath);
        this.lek_dir_object_tree.setSpesificMode(['methods']);
        if(!this.extern_lek_dir_object_instance) this.lek_dir_object_instance.initialize();
        this.tree = await processTree(await this.lek_dir_object_tree.tree, this);
    };
};
module.exports = SqliteExpressFolders;