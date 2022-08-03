import connection from '../databases/postgres.js';
import bcrypt from 'bcrypt';

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
            //gerar o token
            const token = 'token';
            return res.status(200).send(token);
        }
        return res.status(401).send('E-mail ou senha incorretos!');

    } catch (error) {
        return res.status(500).send(error);
    }
}