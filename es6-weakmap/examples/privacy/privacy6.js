'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var privateFields = new WeakMap();

var Human = (function () {
    function Human(firstName, lastName) {
        _classCallCheck(this, Human);

        privateFields.set(this, { firstName: firstName, lastName: lastName });
    }

    _createClass(Human, [{
        key: 'getFirstName',
        value: function getFirstName() {
            return privateFields.get(this).firstName;
        }
    }, {
        key: 'getLastName',
        value: function getLastName() {
            return privateFields.get(this).lastName;
        }
    }, {
        key: 'getFullName',
        value: function getFullName() {
            var _privateFields$get = privateFields.get(this);

            var firstName = _privateFields$get.firstName;
            var lastName = _privateFields$get.lastName;

            return firstName + ' ' + lastName;
        }
    }]);

    return Human;
})();

console.log(new Human('John', 'Smith').getFullName());

exports['default'] = Human;
module.exports = exports['default'];

