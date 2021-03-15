const dbConnection = require('../mongoConnection');
const moviesData = require('../data/movies');

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    const cast = [
        { firstName: 'Eleni', lastName: 'Rotsides' },
        { firstName: 'Joe', lastName: 'Shmoe' },
        { firstName: 'Ava', lastName: 'Smith' },
        { firstName: 'Jane', lastName: 'Doe' },
        { firstName: 'Bill', lastName: 'Nye' },
    ];

    const info = { director: 'Albert Einstein', yearReleased: 2000 };

    const cast2 = [
        { firstName: 'Bob', lastName: 'Marley' },
        { firstName: 'Joe', lastName: 'Shmoe' },
    ];

    const info2 = { director: 'Your mom', yearReleased: 1950 };

    const cast3 = [
        { firstName: 'Eleni', lastName: 'Rotsides' },
        { firstName: 'Joe', lastName: 'Shmoe' },
        { firstName: 'Ava', lastName: 'Smith' },
    ];

    const info3 = { director: 'Your dad', yearReleased: 1988 };

    const cast4 = [{ firstName: 'Zac', lastName: 'Efron' }];

    const info4 = { director: 'Nikola Tesla', yearReleased: 2019 };

    const cast5 = [
        { firstName: 'Person', lastName: 'One' },
        { firstName: 'Person', lastName: 'Two' },
        { firstName: 'Person', lastName: 'Three' },
        { firstName: 'Person', lastName: 'Four' },
    ];

    const info5 = { director: 'Your Brother', yearReleased: 2006 };

    let movieToAdd;
    try {
        movieToAdd = await moviesData.addMovie(
            "Eleni's Great Adventure",
            cast,
            info,
            "This movie is about Eleni's great quest into the unknown!",
            4
        );
    } catch (e) {
        console.log('Uh oh, an error has occured.....');
        console.log();
        console.log(e);
        return await db.serverConfig.close();
    }

    let movieToAdd2;
    try {
        movieToAdd2 = await moviesData.addMovie('Movie 2', cast2, info2, 'Movie 2 plot', 1);
    } catch (e) {
        console.log('Uh oh, an error has occured.....');
        console.log();
        console.log(e);
        return await db.serverConfig.close();
    }

    let movieToAdd3;
    try {
        movieToAdd3 = await moviesData.addMovie('Movie 3', cast3, info3, 'Movie 3 plot', 2);
    } catch (e) {
        console.log('Uh oh, an error has occured.....');
        console.log();
        console.log(e);
        return await db.serverConfig.close();
    }

    let movieToAdd4;
    try {
        movieToAdd4 = await moviesData.addMovie('Movie 4', cast4, info4, 'Movie 3 plot', 5);
    } catch (e) {
        console.log('Uh oh, an error has occured.....');
        console.log();
        console.log(e);
        return await db.serverConfig.close();
    }

    let movieToAdd5;
    try {
        movieToAdd5 = await moviesData.addMovie('Movie 5', cast5, info5, 'Movie 5 plot', 3);
    } catch (e) {
        console.log('Uh oh, an error has occured.....');
        console.log();
        console.log(e);
        return await db.serverConfig.close();
    }

    console.log();
    console.log('Done seeding the database!');
    await db.serverConfig.close();
}

main();
