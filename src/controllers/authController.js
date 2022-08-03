import connection from '../databases/postgres.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    try {
        const data = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (data.rowCount) {
            return res.sendStatus(409);
        }

        const encryptedPassword = bcrypt.hashSync(password, 10);
        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, encryptedPassword]);

        return res.sendStatus(201);

    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
    try {
        const { rows } = await connection.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const user = rows[0];

        if (user && bcrypt.compareSync(password, user.password)) {
            const data = { id: user.id };
            const secretKey = process.env.JWT_SECRET;
            const options = { expiresIn: 60 * 60 * 24 * 30 };
            const token = jwt.sign(data, secretKey, options);

            await connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [user.id, token]);

            return res.status(200).send({ token });
        }
        return res.status(401).send('E-mail ou senha incorretos!');

    } catch (error) {
        return res.status(500).send(error);
    }
}