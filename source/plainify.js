'use strict';

const plainify = (object) => {
    const plainObject = {};

    const innerFunc = (path, obj) => {
        Object.keys(obj).forEach(key => {
            const newPath = `${path}${key}`;

            if (Object.keys(obj[key] || {}).length !== 0 && typeof obj[key] === 'object')  {
                innerFunc(`${newPath}.`, obj[key]);
            } else {
                plainObject[newPath] = obj[key];
            }
        });
    };

    innerFunc('', object);
    return plainObject;
};
