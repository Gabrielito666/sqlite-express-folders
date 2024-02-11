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
        const tree = await getLekDirTree();
        return await setTree(tree);
    };

    const setTree = async tree => await processTree(tree, sqlite_express_instance);

    const getLekDirTree = async(route=routeFolder, root=rootPath) => await thisCreateTree({
        route,
        root,
        spesificItems : [ 'methods' ]
    });

    return { sqlite_express_instance, getTree, setTree, getLekDirTree };
};
module.exports = sqliteExpressFolders;