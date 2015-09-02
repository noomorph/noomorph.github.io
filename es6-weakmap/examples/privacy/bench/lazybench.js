function random(n) {
    return Math.random() * n | 0;
}

var humanImplementations;

if (window.humanImplementations) {
    humanImplementations = window.humanImplementations;
} else {
    humanImplementations = {
        weakMap: (function () {
            var privateFields = new WeakMap();

            function Human(firstName, lastName) {
                privateFields.set(this, {
                    firstName: firstName,
                    lastName: lastName
                });
            }

            Human.prototype.getFullName = function () {
                var privates = privateFields.get(this);
                return privates.firstName + ' ' + privates.lastName;
            }

            Human.prototype.dispose = function () {
                // no need to do anything
            };

            return { Human: Human };
        }()),
        map: (function () {
            var privateFields = new Map();

            function Human(firstName, lastName) {
                privateFields.set(this, {
                    firstName: firstName,
                    lastName: lastName
                });
            }

            Human.prototype.getFullName = function () {
                var privates = privateFields.get(this);
                return privates.firstName + ' ' + privates.lastName;
            }

            Human.prototype.dispose = function () {
                privateFields.delete(this);
            };

            return { Human: Human };
        }()),
        array: (function () {
            var instances = [];
            var privateFields = [];

            function Human(firstName, lastName) {
                instances.push(this);
                privateFields.push({
                    firstName: firstName,
                    lastName: lastName
                });
            }

            Human.prototype.getFullName = function () {
                var privates = privateFields[instances.indexOf(this)];
                return privates.firstName + ' ' + privates.lastName;
            }

            Human.prototype.dispose = function () {
                var index = instances.indexOf(this);

                if (index !== -1) {
                    instances.splice(index, 1);
                    privateFields.splice(index, 1);
                }
            };

            return { Human: Human };
        }()),
        id: (function () {
            var counter = 0,
                privateFields = {};

            function Human(firstName, lastName) {
                var id = ++counter;

                Object.defineProperty(this, '__id', {
                    get: function () { return id; }
                });

                privateFields[id] = {
                    firstName: firstName,
                    lastName: lastName
                };
            }

            Human.prototype.getFullName = function () {
                var privates = privateFields[this.__id];
                return privates.firstName + ' ' + privates.lastName;
            }

            Human.prototype.dispose = function () {
                delete privateFields[this.__id];
            };

            return { Human: Human };
        }()),
        idPublic: (function () {
            var counter = 0,
                privateFields = {};

            function Human(firstName, lastName) {
                this.id = ++counter;

                privateFields[this.id] = {
                    firstName: firstName,
                    lastName: lastName
                };
            }

            Human.prototype.getFullName = function () {
                var privates = privateFields[this.id];
                return privates.firstName + ' ' + privates.lastName;
            }

            Human.prototype.dispose = function () {
                delete privateFields[this.id];
            };

            return { Human: Human };
        }()),
        noPrivacy: (function () {
            function Human(firstName, lastName) {
                this.firstName = firstName;
                this.lastName = lastName;
            }

            Human.prototype.getFullName = function () {
                return this.firstName + ' ' + this.lastName;
            }

            Human.prototype.dispose = function () {
            };

            return { Human: Human };
        }()),
    };

    Object.keys(humanImplementations).forEach(function (implementationKey) {
        var impl = humanImplementations[implementationKey];
        var instances = impl.instances = [];

        for (var i = 0; i < 100000; i++) {
            var newHuman = new impl.Human(random(1000000), random(1000000));
            instances.push(newHuman);
        }
    });

    window.humanImplementations = humanImplementations;
}
