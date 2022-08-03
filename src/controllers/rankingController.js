import connection from '../databases/postgres.js';

export async function getRanking(req, res) {
    try {
        const { rows: ranking } = await connection.query(`
        SELECT users.id, users.name, COUNT(urls.url) AS "linksCount", SUM(urls."visitCount") AS "visitCount" 
        FROM users 
        LEFT JOIN urls 
        ON urls."userId" = users.id 
        GROUP BY users.id, users.name 
        ORDER BY "visitCount" DESC
        LIMIT 10
        `);

        ranking.map(item => {
            item.linksCount = Number(item.linksCount);
            item.visitCount = Number(item.visitCount);
        });

        return res.status(200).send(ranking);

    } catch (error) {
        return res.status(500).send(error);
    }
}