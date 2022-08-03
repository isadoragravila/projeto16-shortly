import connection from '../databases/postgres.js';
import jwt from 'jsonwebtoken';

async function tokenValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const secretKey = process.env.JWT_SECRET;

    try {
        const { id: userId } = jwt.verify(token, secretKey);

        const data = await connection.query(`SELECT * FROM users WHERE id = $1`, [userId]);
        if (!data.rowCount) {
            return res.status(401).send('Houve algum problema com a sua sessão');
        }

        res.locals.userId = userId;
        next();

    } catch (error) {
        return res.status(401).send('Houve algum problema com a sua sessão');
    }
}

export default tokenValidation;