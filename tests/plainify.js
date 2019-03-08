'use strict';

QUnit.module('Тестируем функцию plainify', function () {
    QUnit.test('Проверяем правильность работы plainify на первоначальных тестах', function (assert) {
        assert.deepEqual(plainify({foo: 'bar', baz: 42}), {'foo': 'bar', 'baz': 42});

        const nested1 = {
            deep: {
                foo: 'bar',
                baz: 42
            }
        };

        const plain1 = {
            'deep.foo': 'bar',
            'deep.baz': 42
        };

        assert.deepEqual(plainify(nested1), plain1);

        const nested2 = {
            deep: {
                foobar: 0,
                nested: {
                    object: {
                        fields: {
                            foo: 42,
                            bar: 42,
                            baz: 42
                        }
                    }
                }
            }
        };

        const plain2 = {
            'deep.foobar': 0,
            'deep.nested.object.fields.foo': 42,
            'deep.nested.object.fields.bar': 42,
            'deep.nested.object.fields.baz': 42
        };

        assert.deepEqual(plainify(nested2), plain2);
    });

    QUnit.test('Даём пустой объект', function (assert) {
        const nested3 = {
            deep: {
                foobar: 0,
                nested: {
                    fields: {
                        foo: 41,
                        bar: 42,
                        baz: 43
                    }
                }
            },
            nested: {},
            fields: {
                foo: 44,
                bar: 45,
                baz: -46
            }
        };

        const plain3 = {
            'deep.foobar': 0,
            'deep.nested.fields.foo': 41,
            'deep.nested.fields.bar': 42,
            'deep.nested.fields.baz': 43,
            'nested': {},
            'fields.foo': 44,
            'fields.bar': 45,
            'fields.baz': -46,
        };

        assert.deepEqual(plainify(nested3), plain3);
    });

    QUnit.test('Даём объект со значением "null"', function (assert) {
        const nested4 = {
            fields: {
                foo: 2,
                bar: 3,
                baz: 4
            },
            nil: null
        };

        const plain4 = {
            'fields.foo': 2,
            'fields.bar': 3,
            'fields.baz': 4,
            'nil': null
        };

        assert.deepEqual(plainify(nested4), plain4);
    });

    QUnit.test('Даём объект со значениями разных типов', function (assert) {
        const nested5 = {
            fields: {
                foo: 1,
                bar: 'qwerty',
                baz: 3.14
            },
        };

        const plain5 = {
            'fields.foo': 1,
            'fields.bar': 'qwerty',
            'fields.baz': 3.14,
        };

        assert.deepEqual(plainify(nested5), plain5);
    });
});
