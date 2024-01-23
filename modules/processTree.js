const CutomSession = require('./CustomSession');
const processTree = async (obj, contex) => {
    const newObj = {};
    for (let key in obj) {
        if (key === "methods") Object.assign(newObj, await obj[key](new CutomSession(contex.instance)));
        else if (typeof obj[key] === 'object' && obj[key] !== null) newObj[key] = await processTree(obj[key], contex);
        else newObj[key] = obj[key];
    }
    return newObj;
}
module.exports = processTree;