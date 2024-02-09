const SqliteExpress = require('sqlite-express');
const lekDirObject = require('lek-dir-object');
const path = require('path');
const processTree = require('./modules/processTree');
const sqliteExpressFolders = async ({ sqlite_express, root, route, createTree }) => {

    const rootPath = root ? root : (module.parent.filename ? path.dirname(module.parent.filename) : '.');
    const sqlite_express_instance = sqlite_express ? sqlite_express : new SqliteExpress(rootPath);

    const thisCreateTree = createTree ? createTree : lekDirObject();
    const routeFolder = path.isAbsolute( route ) ? route : path.resolve(root, route);

    const getTree = async () => {

        const tree = await thisCreateTree({
            route : routeFolder,
            root : rootPath,
            spesificItems : [ 'methods' ]
        });
        return await processTree(tree, sqlite_express_instance);
    };

    return { sqlite_express_instance, getTree };
};
module.exports = sqliteExpressFolders;