var privateFields = new WeakMap();

class Human {
    constructor(firstName, lastName) {
        privateFields.set(this, { firstName, lastName });
    }
    get firstName() {
        return privateFields.get(this).firstName;
    }
    get lastName() {
        return privateFields.get(this).lastName;
    }
    get fullName() {
        let { firstName, lastName } = privateFields.get(this);
        return `${firstName} ${lastName}`;
    }
}

export default Human;

// console.log(new Human('John', 'Smith').fullName);
