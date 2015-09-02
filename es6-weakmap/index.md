# WeakMap and where they can be helpful

Besides introducing new syntax features, ES2015 (formerly ES6) has added a few extra collection types which
are covered in [the article on ES6 Collections from Mozilla Hacks](https://hacks.mozilla.org/2015/06/es6-in-depth-collections/).
I thought it would have been a good idea to supplement it with a few practical examples using WeakMap type.

So, where WeakMaps can be useful?

## 1. Privacy

The new _class_'es don't have _private_ access modifiers, one of known ways to hide their properties is to use WeakMap.

Below is a sample Human.js module:

```javascript
var privateFields = new WeakMap();

class Human {
    constructor(firstName, lastName) {
        privateFields.set(this, { firstName, lastName });
    }
    get fullName() {
        let { firstName, lastName } = privateFields.get(this);
        return `${firstName} ${lastName}`;
    }
}

export default Human;
```

So when an instance of _Human_ class is created, it is impossible to access its _.firstName_, _.lastName_ fields
as it does not own them at all.

```javascript
import Human from 'Human';

var sampleHuman = new Human('First', 'Last');
console.log(sampleHuman.fullName); // First Last
sampleHuman = null; // here the magic happens 
```

Notice that as soon as we lose reference to _sampleHuman_, the _privateFields_ WeakMap also stops retaining key-value pair
for that object. Take a look at memory snapshots before and after the ```sampleHuman = null```.

This behaviour had been impossible until ES6 came, so in past you were limited to three options to avoid memory leaks:

1) give up and let the private fields be accesible from outside

With the downside of exposing implementation details you'd rather conceal, in this case you'd get an
obvious performance boost virtually in all browsers. See performance benchmark below.

2) add a private ID property as a key and (alas) inevitable _.dispose()_ method to keep the _privateFields_ object clean
and prevent the memory leak:

```javascript
var Human = (function () {
    var counter = 1;
    var privateFields = {};

    function Human(firstName, lastName) {
        this._id = counter++;
        privateFields[this._id] = {
            firstName: firstName,
            lastName: lastName
        };
    }

    /* ... */

    Human.prototype.dispose = function () {
        delete privateFields[this._id];
        delete this._id;
    };

    return Human;
}());

Of course, the example above is not the only way to do it. At least three more variants could be thought of:

1) define a non-enumerable read-only ID property

```
```

2) point 1 plus use randomly generated property name (similar to ES6 _Symbol_)

```
```

3) store all created instances in private array and use index of _this_ in that array as an identifier

```
```

But no matter what you do, you have to manually dispose the instances, otherwise _privateFields_ variable
will be retaining increasingly more memory with every instance you create.

TODO: add screenshots of memory profiler

Here are performance benchmarks for all the cases above.

## 2. Decorating objects without changing or composing them

### 2.1. DOM
### 2.2. DOM

## Polyfills for WeakMap



The most efficient po
