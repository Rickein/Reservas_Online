const { Router } = require("express");
const router = Router()
const { telaLogin,validaLoginUsuario,NovoUsuario} = require("../controllers/login");

router.get('/', telaLogin);
router.post('/', NovoUsuario);
router.post('/validaLogin',validaLoginUsuario);

module.exports = router