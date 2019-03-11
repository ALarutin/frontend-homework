'use strict';

const objectSplitting = (path, obj) => {
    Object.keys(obj).forEach(key => {
        const newPath = `${path}${key}`;

        if (Object.keys(obj[key] || {}).length !== 0 && typeof obj[key] === 'object')  {
            objectSplitting(`${newPath}.`, obj[key]);
        } else {
            plainObject[newPath] = obj[key];
        }
    });
};

const plainify = (object) => {
    const plainObject = {};

    objectSplitting('', object);

    return plainObject;
};
