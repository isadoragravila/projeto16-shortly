
export async function signUp(req, res) {
    //validar se o e-mail já existe

    //criptografar senha

    //inserir no banco de dados

    res.sendStatus(201);
}

export async function signIn(req, res) {
    //decriptografar senha
    
    //validar se o e-mail e a senha batem com o banco de dados

    //gerar token
    const token = 'token';
    
    res.status(200).send(token);
}