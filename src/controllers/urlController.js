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

export async function getUrlById(req, res) {
    const { id } = req.params;
    try {
        const { rows } = await connection.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1`, [id]);
        const url = rows[0];

        if (!url) {
            return res.sendStatus(404);
        }

        return res.status(200).send(url);

    } catch (error) {
        return res.status(500).send(error);
    }
}