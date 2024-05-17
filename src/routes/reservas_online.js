const { Router } = require("express");
const router = Router()
const {telaInicial,getReservas,postReservas,deleteReservas,getOnlyReservas} = require ("../controllers/reservas_online");


router.get('/', telaInicial);
router.get('/:local/:dia', getReservas);
router.get('/reservas/:local/:dia', getOnlyReservas);
router.post('/', postReservas);
router.delete('/', deleteReservas);

module.exports = router