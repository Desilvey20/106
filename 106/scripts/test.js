function Dog(name, age){
    this.name = name;
    this.age = age;
}

class Cat{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}

function runTests(){
    console.log("Tests")

    //creating objects

    //object literal
    let dog = { name: "fido", age: 3 };
    console.log(dog);

    let dog2 = { name: "Lola", age: 7, color: "pink"};
    console.log(dog2);

    //object constractor
    let dog3 = new Dog("Einstein", 9);
    console.log(dog3);

    let dog4 = new Dog("Something",1);
    console.log(dog4);

    //class
    let cat1 = new Cat("Luna", 1);
    console.log(cat1);
}

runTests();
