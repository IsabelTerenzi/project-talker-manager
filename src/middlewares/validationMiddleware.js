const validationMiddleware = (req, res, next) => {
    const login = req.body;
    const { email, password } = login;

    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!Object.values(email).includes('@')) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (Object.values(password).length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    next();
};

// Requisito 4 - Adicione as validações para o endpoint /login

module.exports = validationMiddleware;