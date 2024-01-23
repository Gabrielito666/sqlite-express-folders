# Sqlite Express Folders

It is a package that facilitates the order in working with sqlite-express, nesting functions and tasks in a network of nested folders in your project.

# Usage

First install it with the following command

```bash
npm i sqlite-express-folders
```

to use it the first thing to do is to import the class and instantiate it. for this you will be asked for 3 parameters in an object:

- instance
- rootPath
- routeFolder

##### instance

In instance an instance of sqlite-express is passed if desired, the model to work needs an instance from which to call the methods of sqlite-express therefore, if you do not pass any instance by default one will be created, then you can access it through the instance property.

##### rootPath

In the case of rootPath an absolute directory is needed which will be used as root to access the relative paths requested by the system. In the case of passing an instance in the instance parameter, rootPath will not be necessary, however if you decide to use the default value of instance it is essential that you enter the rootPath parameter with the absolute path that you want, which is usually __dirname.
##### routeFolder

This parameter is mandatory and must correspond to a relative path (relative to the rootPath or to the directory from which you are nesting the instance in case you have not set rootPath) and must correspond to the path you are going to use to nest your methods.

example:

```javascript
//main folder
const SqliteExpressFolders = require('sqlite-express-folders');

const session = new SqliteExpressFolders({ rootPath : __dirname, routeFolder : './my_methods' });
```

## Folders

The reading system of the folders is as follows. From the "routeFolder" you can create directories with any name and methods.js files. Any file that does not have that name will simply not be read. inside methods.js you must create a function and export it. the function provides a parameter that corresponds to the sqlite-express session and from here you can access all the methods provided by the original package.

example:

```javascript
//my_methods/methods.js
const methods = async sqliteExpress => {

    //initialization code
    //...
    //declaration of methods
    const method_1 = x => 'your method';
    const method_2 = x => 'your method';
    //etc...

    return { method_1, method_2 } //etc....
};
module.exports = methods;
```

The instance passed as argument to the function has a new property: "folderDefaultOptions".

This property is like what in sqlite-express is called defaultOptions, this is used to declare arguments by default but in a crazy way and that only work in the file itself. This helps to simplify the code and avoid redundancy. The defaultOptions in the original session still work but they have less weight locally, as well as the folderDefaultOptions have less weight than the parameters that are passed in a method directly.

That is to say, if it does not find a property in the method itself, it will resort to the FolderDefaultOptions and if it does not find that property there it will resort to the defaultOptions of the sqlite-express session.

To add folderDefaultOptions you can do it in the same way as in defaultOptions. by means of the set method or with individual setters.

Example:

```javascript
//my_methods/methods.js
const methods = async sqliteExpress => {

    sqliteExpress.folderDefaultOptions.set({
        //my defaults for this folder
    })
    //initialization code
    //...
    //declaration of methods
    const method_1 = x => 'your method';
    const method_2 = x => 'your method';
    //etc...

    return { method_1, method_2 } //etc....
};
module.exports = methods;
```

## initialization

Finally for the system to function the instance must be initialized. the initialization is asynchronous so before using it an await or a .then must be done.

Example:

```javascript
//main folder
const SqliteExpressFolders = require('sqlite-express-folders');

const session = new SqliteExpressFolders({ rootPath : __dirname, routeFolder : './my_methods' });

(async () => {
    await session.initialize();
    console.log(session.tree);
})()

```

This method will execute the entire network of functions that have been exported from the routeFolder and their child folders in exported methods.js files. When executing the function with the initialization all the code of this function will be executed so those operations that are directly in the function will be executed (recommended to put only createTable) and according to the returned values the tree property of the main instance will be constructed.

```javascript
//my_methods/methods.js
const methods = async sqliteExpress => {

    sqliteExpress.folderDefaultOptions.set({
        //my defaults for this folder
    })
    //initialization code
    sqliteExpress.createTable(/* ...props... */)
    //this code will be executed with the initialization.
    //...
    //declaration of methods
    const method_1 = x => 'your method'; //obviously the idea is to use methods from sqlite-express
    const method_2 = x => 'your method';
    //etc...

    return { method_1, method_2 } //etc...
    //returns the methods you will access from tree
};
module.exports = methods;
```

```javascript
//main folder
const SqliteExpressFolders = require('sqlite-express-folders');

const session = new SqliteExpressFolders({ rootPath : __dirname, routeFolder : './my_methods' });

(async () => {
    await session.initialize();
    console.log(session.tree);

    const { method_1, method_2 } = session.tree;

    await method_1();

})()

```
If you nest folders you can organize your methods and form complex structures and then access them from the tree object.

Example:

```directory
/routeFolder/
    /things_1/
        /things_2/
            -methods.js         || module.exports { method_1, method_2 }
        ...
        -methods.js             || module.exports { method_3 }
    ...
    /things_3/
        -methods.js             || module.exports { method_4, method_5, method_6 }
    ...
...

```
would become:

```javascript

const tree = {
    things_1 : {
        thingd_2 : { method_1, method_2  },
        method_3
    }
    things_3 : { method_4, method_5, method_6 }
}

```

## License

This software is licensed under the ISC License. The ISC License is a permissive free software license, allowing for freedom to use, modify, and redistribute the software, with some conditions. For the complete terms and conditions, please see the LICENSE file in the root directory of this project.