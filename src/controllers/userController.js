import connection from '../databases/postgres.js';

export async function getUsersData(req, res) {
    const userId = res.locals.userId;
    try {
        const { rows: count } = await connection.query(`
        SELECT 
            urls."userId" AS id, 
            users.name AS name, 
            CAST(SUM(urls."visitCount") AS INTEGER) AS "visitCount"
        FROM urls 
        JOIN users 
        ON urls."userId" = users.id 
        WHERE urls."userId" = $1 
        GROUP BY urls."userId", users.name
        `, [userId]);

        const { rows: urls } = await connection.query(`SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1`, [userId]);
        const data = count[0] ? { ...count[0], shortenedUrls: urls } : `Usuário não possui nenhum Url`;

        return res.status(200).send(data);

    } catch (error) {
        return res.status(500).send(error);
    }
}