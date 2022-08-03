import connection from '../databases/postgres.js';

export async function shortenUrl(req, res) {
    const userId = res.locals.userId;
    try {
        console.log(userId);

        return res.sendStatus(201);

    } catch (error) {
        return res.status(500).send(error);
    }
}