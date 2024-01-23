const processParams = require('sqlite-express/modules/processParams');
const { DefaultOptions } = require('sqlite-express/modules/classes');

class CutomSession{
    constructor(instance){
        this.instance = instance;
        this.folderDefaultOptions = new DefaultOptions(instance.rootPath);
    }
    async createTable(...userParams){
        const params = processParams('createTable', userParams, this.folderDefaultOptions);
        return this.instance.createTable(params);
    }
    async insert(...userParams){
        const params = processParams('insert', userParams, this.folderDefaultOptions);
        return this.instance.insert(params);
    }
    async select(...userParams){
        const params = processParams('select', userParams, this.folderDefaultOptions);
        return this.instance.select(params);
    }
    async update(...userParams){
        const params = processParams('update', userParams, this.folderDefaultOptions);
        return this.instance.update(params);
    }
    async delete(...userParams){
        const params = processParams('delete', userParams, this.folderDefaultOptions);
        return this.instance.delete(params);
    }
    async exist(...userParams){
        const params = processParams('exist', userParams, this.folderDefaultOptions);
        return this.instance.exist(params);
    }
    async count(...userParams){
        const params = processParams('insert', userParams, this.folderDefaultOptions);
        return this.instance.count(params);
    }
};
module.exports = CutomSession;