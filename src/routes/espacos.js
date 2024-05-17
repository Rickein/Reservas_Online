const { Router } = require("express");
const router = Router()
const { telaInicial, novoEspaco,alterarEspaco,espacos,espaco } = require("../controllers/espacos");

router.get('/', telaInicial);
router.get('/espacos',espacos);
router.get('/espacos/:id',espaco);

router.post('/', novoEspaco);
router.patch('/',alterarEspaco);

module.exports = router