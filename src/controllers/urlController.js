import connection from '../databases/postgres.js';
import { nanoid } from 'nanoid';

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const userId = res.locals.userId;
    const shortUrl = nanoid();

    try {
        await connection.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`, [userId, url, shortUrl]);
        return res.sendStatus(201);

    } catch (error) {
        return res.status(500).send(error);
    }
}