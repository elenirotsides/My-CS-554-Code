interface UserInterface {
    name: string;
    email: string;
    age: number;
    register();
    payInvoice();
}

class User implements UserInterface {
    name: string;
    email: string;
    age: number;

    constructor(name: string, email: string, age: number) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    register() {
        console.log(`${this.name} is now registered`);
    }
    payInvoice() {
        console.log(`${this.name} has paid their invoice`);
    }
}

let eleni: User = new User('Eleni Rotsides', 'erotside@stevens.edu', 21);
console.log(eleni);
eleni.register();
eleni.payInvoice();

class Member extends User {
    id: number;

    constructor(id: number, name: string, email: string, age: number) {
        super(name, email, age);
        this.id = id;
    }
    payInvoice() {
        super.payInvoice();
    }
}

let mario: User = new Member(1, 'Mario', 'mario@mario.com', 15);
console.log(mario);
mario.payInvoice();
