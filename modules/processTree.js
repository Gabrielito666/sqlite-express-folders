const CutomSession = require('./CustomSession');
const processTree = async (obj, sqlite_express_instance) => {
    const newObj = {};
    for (let key in obj) {
        if (key === "methods")
        {
            Object.assign(newObj, await obj[key](new CutomSession(sqlite_express_instance)));
        }
        else if (typeof obj[key] === 'object' && obj[key] !== null)
        {
            newObj[key] = await processTree(obj[key], sqlite_express_instance);
        }
        else
        {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
module.exports = processTree;