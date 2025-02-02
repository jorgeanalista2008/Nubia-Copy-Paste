const express = require('express')
const app = express()
const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authControllerPY4 = require('../controllers/authControllerpy4');
const dashboardController = require('../controllers/dashboardController');
const dashboardControllerPY4 = require('../controllers/dashboardControllerPY4');
const landingController = require('../controllers/landingController');
const passport = require('passport');

/*------------- PYT21 -------------*/
const userControllerPY21 = require('../controllers/PYT21/userControllerPY21');
const authControllerPY21 = require('../controllers/PYT21/authControllerPY21');
const dashboardControllerPY21 = require('../controllers/PYT21/dashboardControllerPY21');

/*------------- PYT24 -------------*/
const userControllerPY24 = require('../controllers/PYT24/userControllerPY24');
const authControllerPY24 = require('../controllers/PYT24/authControllerPY24');
const dashboardControllerPY24 = require('../controllers/PYT24/dashboardControllerPY24');
/*---------------------------------*/

/*------------- PYT27 -------------*/
const userControllerPY27 = require('../controllers/PYT27/userControllerPY27');
const authControllerPY27 = require('../controllers/PYT27/authControllerPY27');
const dashboardControllerPY27 = require('../controllers/PYT27/dashboardControllerPY27');
/*---------------------------------*/

/*------------- PYT672 -------------*/
const userControllerPY672 = require('../controllers/PYT672/userControllerPY672');
const authControllerPY672 = require('../controllers/PYT672/authControllerPY672');
const dashboardControllerPY672 = require('../controllers/PYT672/dashboardControllerPY672');
/*---------------------------------*/

const FileController = require('../models/PYT24/upload');
const fileController = new FileController();

const FileController4 = require('../models/PYT4/upload');
const fileController4 = new FileController4();

// Landing Page
router.get('/', landingController.showLandingPage);

//router.get('//:msg', landingController.showLandingPage);

// Iniciar sesión
router.get('/login', userController.formLogin);
router.post('/login',passport.authenticate('local',{ failureRedirect: '/login',failureFlash: 'Usuario o clave invalido.' }), userController.logintemp);

// Cerrar Sesión
router.get('/close-session', userController.closeSesion);

//CUPONERA
router.get('/intro_cuponera', dashboardControllerPY4.introCup);
router.get('/intro_cuponera/:crea', dashboardControllerPY4.introCup);
router.get('/log_cuponera/:registrado', dashboardControllerPY4.introCup);
router.post('/session_cuponera', dashboardControllerPY4.sessionCuponera);
router.get('/cuponera',authControllerPY4.authenticatedCliente, dashboardControllerPY4.introCupValidate);
router.get('/cuponera/:cat',authControllerPY4.authenticatedCliente, dashboardControllerPY4.introCupValidate);
router.post('/usar_cupon', dashboardControllerPY4.usar_cupon);
router.post('/save_cliente_cuponera', dashboardControllerPY4.save_cliente_cuponera);

//NOTIFICACIONES
router.get('/notificaciones_panel',authControllerPY4.authenticatedUser, dashboardControllerPY4.notificaciones_table);

// Dashboard
router.get('/dashboard', dashboardController.dashboard);
router.get('/home/:id', dashboardController.dashboard);

//PYT-4 
router.post('/upload-file', fileController4.subirArchivo);
router.get('/errorpy4/:msg', dashboardControllerPY4.dashboard);
router.get('/py4/:id', dashboardControllerPY4.login);
router.get('/homepy4',authControllerPY4.authenticatedUser, dashboardControllerPY4.dashboard);
router.get('/homepy4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.dashboard);
router.get('/prestados/:day', authControllerPY4.authenticatedUser,dashboardControllerPY4.dashboard);
router.get('/loginpy4', dashboardControllerPY4.login);
router.get('/registerpy4/:id', dashboardControllerPY4.register);
router.post('/cambiar_sucursal', dashboardControllerPY4.change_sucursal);
//personal
router.get('/personal_py4',authControllerPY4.authenticatedUser, dashboardControllerPY4.personal_table);
router.get('/personal_py4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.personal_table);
router.post('/save_personal_py4', dashboardControllerPY4.save_personal);
router.get('/delete_personal/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_personal);
router.post('/editar_personal_id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_personal);

router.post('/save_personal_py4_edit', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_personal_py4);


router.get('/editar_usuario/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_usuarios);
router.post('/editar_usuario', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_usuarios);
router.post('/save_usuarios_py4_edit', dashboardControllerPY4.save_usuarios_py4);
router.post('/cambia_pass', dashboardControllerPY4.cambia_pass);

//sucursales
router.get('/sucursales_py4',authControllerPY4.authenticatedUser, dashboardControllerPY4.sucursales);
router.get('/sucursales_py4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.sucursales);
router.post('/save_sucursal_py4', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_sucursal);
router.get('/delete_sucursales/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_sucursales);
router.get('/editar_sucursales/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_sucursales);
router.post('/editar_sucursales', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_sucursales);
router.post('/editar_sucursales_save', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_sucursales_save);

//carga inicial
router.get('/carga_inicial_py4',authControllerPY4.authenticatedUser, dashboardControllerPY4.carga_inicial);
router.get('/carga_inicial_py4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.carga_inicial);
router.post('/save_carga_init_py4', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_carga_inicial);

//Cupones
router.get('/promociones_bw',authControllerPY4.authenticatedUser, dashboardControllerPY4.getCupones);
router.get('/promociones_bw/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.getCupones);
router.post('/crear_cupones',authController.authenticatedUser, dashboardControllerPY4.save_cupon);
router.post('/edit_cupon_id',authController.authenticatedUser, dashboardControllerPY4.editCupon);
router.post('/editar_cupones',authController.authenticatedUser, dashboardControllerPY4.saveCuponEdited);
router.get('/borrar_cupon/:id', authController.authenticatedUser, dashboardControllerPY4.deleteCupon);
router.post('/usar_cupon', dashboardControllerPY4.usar_cupon);

//vehiculos
router.get('/vehiculos_py4',authControllerPY4.authenticatedUser, dashboardControllerPY4.vehiculos_table);
router.get('/vehiculos_py4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.vehiculos_table);
router.post('/save_vehiculo_py4', dashboardControllerPY4.save_vehiculos);
router.get('/delete_vehiculos/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_vehiculos);
router.post('/editar_vehiculos', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_vehiculos);
router.post('/save_vehiculos_py4_edit', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_vehiculos_py4);


//CP
router.post('/consultaCP', dashboardControllerPY4.consultaCP);
//corte
router.get('/corte_py4',authControllerPY4.authenticatedUser, dashboardControllerPY4.corte_table);
router.get('/corteday_py4/:day',authControllerPY4.authenticatedUser, dashboardControllerPY4.corte_table);
router.get('/corte_py4/:msg', authControllerPY4.authenticatedUser,dashboardControllerPY4.corte_table);

//pedido
router.get('/delete_pedido/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_pedido);
router.get('/editar_pedido/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_pedido);
router.post('/editar_pedido', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_pedido);


router.get('/delete_cliente/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_cliente);
router.post('/editar_cliente_id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_cliente);
router.get('/cambiaS_pedido/:id/:status', authControllerPY4.authenticatedUser,dashboardControllerPY4.cambiaS_pedido);
router.post('/cambiaS_pedido', authControllerPY4.authenticatedUser,dashboardControllerPY4.cambiaS_pedido);

router.get('/cambia_S_pago/:id/:status', authControllerPY4.authenticatedUser,dashboardControllerPY4.cambia_S_pago);
router.post('/cambia_S_pago', authControllerPY4.authenticatedUser,dashboardControllerPY4.cambia_S_pago);
router.post('/verificar_deuda', authControllerPY4.authenticatedUser,dashboardControllerPY4.verifica_deuda_pedido);


router.get('/usuarios/:mensaje',authControllerPY4.authenticatedUser, dashboardControllerPY4.usuariosTable);
// Etiquetas
router.post('/save_etiqueta', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_etiquetas);
router.get('/delete_etiqueta/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_etiqueta);

router.get('/actualizar_devueltos/:id_chofer/:cantidad/:id_cliente/:fecha', authControllerPY4.authenticatedUser,dashboardControllerPY4.corte_prestados_table);

// Cerrar Sesión
router.get('/logoutpy4', dashboardControllerPY4.closeSesion);
router.get('/logout_cuponera', dashboardControllerPY4.closeSesioncuponera);
//post
router.post('/loginpyt4', dashboardControllerPY4.sesionstart);
router.post('/save_cliente_py4', dashboardControllerPY4.save_cliente_py4);

router.post('/registrar_usuario',dashboardControllerPY4.reguserPy4);
router.post('/reg_pedido_modal', dashboardControllerPY4.regPedidoPy4);
router.post('/editar_pedido_save', authControllerPY4.authenticatedUser,dashboardControllerPY4.Save_editPedidoPy4);
router.post('/editar_cliente', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_cliente_edit);
router.post('/ad_tag_cliente', authControllerPY4.authenticatedUser,dashboardControllerPY4.save_cliente_edit_tag);
router.post('/change_zone_client', authControllerPY4.authenticatedUser,dashboardControllerPY4.cambia_zona_client);




/*--------------------- PYT-21 ---------------------*/
router.get('/login/:id', dashboardControllerPY21.login);
router.get('/register/:id', dashboardControllerPY21.register);
router.get('/error404/:id', dashboardControllerPY21.error);
router.get('/notauthorized/:id', dashboardControllerPY21.notauthorized);
// Auth user
router.get('/py21/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.dashboard);
router.get('/config/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.config);
router.get('/contracts/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.contracts);
router.get('/retreats/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.retreats);
router.get('/deposits/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.deposits);
router.get('/controlrolespy21/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.controlroles);
// router.get('/earnings/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.earnings);
// router.get('/profile/:id', authControllerPY21.authenticatedUser, dashboardControllerPY21.profile);

// Auth admin
router.get('/adminpy21/:id', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.dashboardAdmin);
router.get('/depositsadmin/:id', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.depositsAdmin);
router.get('/seller/:id', authControllerPY21.authenticatedAdminOrSeller, dashboardControllerPY21.seller);
router.get('/users/:id', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.users);
router.get('/pay/:id', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.pay);
router.get('/paymethods/:id', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.paymethods);
router.get('/duration/:id', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.duration);

// POST
// * AUTH
router.post('/loginpy21', dashboardControllerPY21.sesionstart);
router.post('/reguserpy21', dashboardControllerPY21.reguserpy21);

// TODO: --- CONTRATOS ADMIN
router.post('/createcontract', dashboardControllerPY21.createcontract);



// MOSTRAR TODOS LOS PAQUETES DE USUARIOS - ADMIN
router.post('/getdepositspy21', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.getdeposits);

router.post('/addbankpy21', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.addbank);
// METODOS DE PAGO, PAGO MOVIL
router.post('/addpaympy21', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.addpaym);
// METODOS DE PAGO, RETIRO EN BTC
router.post('/addbtcpy21', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.addbtc);
// METODOS DE PAGO, BILLETERA DIGITAL
router.post('/addwalletpy21', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.addwallet);
// HABILITAR / DESHABILITAR METODOS DE PAGO
router.post('/updatestatuspaymethodpy21', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.updatestatuspaymethod);
// ACTUALIZAR METODOS DE PAGO
router.post('/updatepaymethodpy21', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.updatepaymethod);
// ELIMINAR METODOS DE PAGO
router.post('/deletepaymethodpy21', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.deletepaymethod);

// ELIMINAR METODOS DE RETIRO
router.post('/deletemretreatspy21', authControllerPY21.authenticatedUser, dashboardControllerPY21.deletemretreatspy21);
// ACTUALIZAR METODOS DE RETIROS
router.post('/updatemretreatspy21', authControllerPY21.authenticatedUser, dashboardControllerPY21.updatemretreatspy21);
// METODOS DE PAGO, TRANSFERENCIA BANCARIA
router.post('/addretreatsbankpy21', authControllerPY21.authenticatedUser, dashboardControllerPY21.addretreatsbankpy21);
// METODOS DE PAGO, PAGO MOVIL
router.post('/addretreatspaympy21', authControllerPY21.authenticatedUser, dashboardControllerPY21.addretreatspaympy21);
// METODOS DE PAGO, RETIRO EN BTC
router.post('/addretreatsbtcpy21', authControllerPY21.authenticatedUser, dashboardControllerPY21.addretreatsbtcpy21);
// METODOS DE PAGO, BILLETERA DIGITAL
router.post('/addretreatswalletpy21', authControllerPY21.authenticatedUser, dashboardControllerPY21.addretreatswalletpy21);

// ENVIAR DATOS DNI DE VERIFICACION
router.post('/solicitverifypy21', authControllerPY21.authenticatedUser, dashboardControllerPY21.solicitverify);
// VERIFICAR USUARIO
router.post('/verifyuserpy21', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.verifyuser);
// CONVERTIR INVERSIONISTA EN VENDEDOR
router.post('/usertosellerpy21', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.usertoseller);
// CONVERTIR VENDEDOR EN USUARIO
router.post('/sellertouserpy21', authControllerPY21.authenticatedAdmin, dashboardControllerPY21.sellertouser);

// Cerrar Sesión
router.get('/logout/PYT-21', userControllerPY21.closeSesion);




/*--------------------------------------------------*/

// PYT-24
// PRESALE
router.get('/controlroles/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.controlroles);
router.get('/boardpresale/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.boardpresale);
router.get('/presale/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.presale);
router.get('/depositpresale/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.depositpresale);

router.get('/web/:id', dashboardControllerPY24.web);
router.get('/register24/:id', dashboardControllerPY24.register);
router.get('/register24/PYT-24/ref=:ref', dashboardControllerPY24.referregister);
router.get('/login24/:id', dashboardControllerPY24.login);
router.get('/error24/:id', dashboardControllerPY24.error);

// Auth user
router.get('/py24/:id', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.dashboard);
router.get('/verifypackges/:id', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.verifypackges);
router.get('/verifypackgesuser/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.verifypackgesuser);
router.get('/notauthorized24/:id', dashboardControllerPY24.notauthorized);
router.get('/config24/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.config);
router.get('/retreats24/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.retreats);
router.get('/deposits24/:id', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.depositsadmin);
router.get('/plans/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.plans);

// MOSTRAR TODOS LOS PAQUETES DE USUARIOS - ADMIN
router.post('/getdeposits', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.getdeposits);
// Auth Admin
router.get('/seller24/:id', authControllerPY24.authenticatedAdminOrSeller, dashboardControllerPY24.seller);
router.get('/users24/:id', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.users);
router.get('/paymethods24/:id', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.paymethods);
router.get('/th/:id', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.th);
router.get('/paym/:id', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.paymanag);

// router.get('/profile24/:id', authControllerPY24.authenticatedUser, dashboardControllerPY24.profile);
// router.get('/contracts24/:id', dashboardControllerPY24.contracts);
// router.get('/earnings24/:id', dashboardControllerPY24.earnings);
// router.get('/duration24/:id', dashboardControllerPY24.duration);

// POST
router.post('/loginpy24', dashboardControllerPY24.sesionstart);
router.post('/reguserpy24', dashboardControllerPY24.reguserpy24);
router.post('/regreferpy24', dashboardControllerPY24.reguserreferpy24);

// AÑADIR MAQUINA DE MINADO 
router.post('/addth', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.addth);
// OBTENER MAQUINAS DE MINADO 
router.get('/getmachines', authControllerPY24.authenticatedUser, dashboardControllerPY24.getmachines);
// ELIMINAR MAQUINA DE MINADO 
router.post('/deletemachine', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.deletemachine);
// CONTROL DE TH PRECIO, % DE MANTENIMIENTO, % DE ERROR, GANANCIAS POR REFERIDOS, SALDO MINIMO DE RETIRO
router.post('/th', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.controlth);

// ACTUALIZAR PRECIO TH
router.post('/updateth', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updateth);
// ACTUALIZAR PORCENTAJE DE MANTENIMIENTO
router.post('/updatemaintance', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updatemaintance);
// ACTUALIZAR PORCENTAJE DE ERROR
router.post('/updateerror', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updateerror);
// ACTUALIZAR GANANCIAS POR REFERIDOS
router.post('/updateearnings', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updateearnings);
// ACTUALIZAR MINIMO DE RETIRO
router.post('/minwithd', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updateminwithd);

// VERIFICAR USUARIO
router.post('/verifyuser', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.verifyuser);

// CREAR PAQUETES
router.post('/createpackages', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.createpackages);
// CREAR PAQUETES PERSONALIZADOS
router.post('/createpackagespers', authControllerPY24.authenticatedUser, dashboardControllerPY24.createpackagespers);
// ACTUALIZAR PAQUETES
router.post('/updatepackages', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updatepackages);
// ELIMINAR PAQUETES
router.post('/deletepackages', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.deletepackages);

// ENVIAR DATOS DNI DE VERIFICACION
router.post('/solicitverify', authControllerPY24.authenticatedUser, dashboardControllerPY24.solicitverify);
// METODOS DE PAGO, TRANSFERENCIA BANCARIA
router.post('/addbank', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.addbank);
// METODOS DE PAGO, PAGO MOVIL
router.post('/addpaym', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.addpaym);
// METODOS DE PAGO, RETIRO EN BTC
router.post('/addbtc', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.addbtc);
// METODOS DE PAGO, RETIRO EN BNB
router.post('/addbnb', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.addbnb);
// METODOS DE PAGO, RETIRO EN USDT
router.post('/addusdt', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.addusdt);
// METODOS DE PAGO, BILLETERA DIGITAL
router.post('/addwallet', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.addwallet);
// HABILITAR / DESHABILITAR METODOS DE PAGO
router.post('/updatestatuspaymethod', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updatestatuspaymethod);
// ACTUALIZAR METODOS DE PAGO
router.post('/updatepaymethod', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.updatepaymethod);
// ELIMINAR METODOS DE PAGO
router.post('/deletepaymethod', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.deletepaymethod);

// ELIMINAR METODOS DE RETIRO
router.post('/deletemretreats', authControllerPY24.authenticatedUser, dashboardControllerPY24.deletemretreats);
// ACTUALIZAR METODOS DE RETIROS
router.post('/updatemretreats', authControllerPY24.authenticatedUser, dashboardControllerPY24.updatemretreats);
// METODOS DE PAGO, TRANSFERENCIA BANCARIA
router.post('/addretreatsbank', authControllerPY24.authenticatedUser, dashboardControllerPY24.addretreatsbank);
// METODOS DE PAGO, PAGO MOVIL
router.post('/addretreatspaym', authControllerPY24.authenticatedUser, dashboardControllerPY24.addretreatspaym);
// METODOS DE PAGO, RETIRO EN BTC
router.post('/addretreatsbtc', authControllerPY24.authenticatedUser, dashboardControllerPY24.addretreatsbtc);
// METODOS DE PAGO, RETIRO EN BNB
router.post('/addretreatsbnb', authControllerPY24.authenticatedUser, dashboardControllerPY24.addretreatsbnb);
// METODOS DE PAGO, RETIRO EN USDT
router.post('/addretreatsusdt', authControllerPY24.authenticatedUser, dashboardControllerPY24.addretreatsusdt);
// METODOS DE PAGO, BILLETERA DIGITAL
router.post('/addretreatswallet', authControllerPY24.authenticatedUser, dashboardControllerPY24.addretreatswallet);
router.post('/getretreatsusers', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.getretreatsuser);

// COMPRAR DE PAQUETE
router.post('/deposits', authControllerPY24.authenticatedUser, dashboardControllerPY24.createdeposits);
// SOLICITAR PAGO USUARIO
router.post('/solicitpay', authControllerPY24.authenticatedUser, dashboardControllerPY24.solicitpay);
// PAGAR A USUARIO ADMIN
router.post('/payuser', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.payuser);

// APROBAR
router.post('/startdeposit', authControllerPY24.authenticatedAdmin, dashboardControllerPY24.startdeposit);
// SUBIR IMAGEN
router.post('/upload', fileController.subirArchivo);


// Cerrar Sesión
router.get('/logout/PYT-24', userControllerPY24.closeSesion);




// PYT-27 --- AEROCOINS
// ! ADMIN
router.get('/paympy27/:id', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.paymanag);
router.get('/paymethodspy27/:id', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.paymethods);
router.get('/userspy27/:id', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.users);


// ? POST ADMIN 
// VERIFICAR USUARIO
router.post('/verifyuserpy27', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.verifyuser);
// METODOS DE PAGO, RETIRO EN BTC
router.post('/addbtcpy27', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.addbtc);
// METODOS DE PAGO, RETIRO EN BNB
router.post('/addbnbpy27', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.addbnb);
// METODOS DE PAGO, RETIRO EN USDT
router.post('/addusdtpy27', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.addusdt);
// HABILITAR / DESHABILITAR METODOS DE PAGO
router.post('/updatestatuspaymethodpy27', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.updatestatuspaymethod);
// ACTUALIZAR METODOS DE PAGO
router.post('/updatepaymethodpy27', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.updatepaymethod);
// ELIMINAR METODOS DE PAGO
router.post('/deletepaymethodpy27', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.deletepaymethod);

router.get('/py27/:id', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.dashboard);

// ! USUARIOS
router.get('/retreats27/:id', authControllerPY27.authenticatedUser, dashboardControllerPY27.retreats);

// ? POST
// ENVIAR DATOS DNI DE VERIFICACION
router.post('/solicitverifypy27', authControllerPY27.authenticatedUser, dashboardControllerPY27.solicitverify);
// METODOS DE PAGO, RETIRO EN BTC
router.post('/addretreatsbtcpy27', authControllerPY27.authenticatedUser, dashboardControllerPY27.addretreatsbtc);
// METODOS DE PAGO, RETIRO EN BNB
router.post('/addretreatsbnbpy27', authControllerPY27.authenticatedUser, dashboardControllerPY27.addretreatsbnb);
// METODOS DE PAGO, RETIRO EN USDT
router.post('/addretreatsusdtpy27', authControllerPY27.authenticatedUser, dashboardControllerPY27.addretreatsusdt);
// ACTUALIZAR METODOS DE RETIROS
router.post('/updatemretreatspy27', authControllerPY27.authenticatedUser, dashboardControllerPY27.updatemretreats);
// ELIMINAR METODOS DE RETIRO
router.post('/deletemretreatspy27', authControllerPY27.authenticatedUser, dashboardControllerPY27.deletemretreats);

router.get('/controlrolespy27/:id', authControllerPY27.authenticatedUser, dashboardControllerPY27.controlroles);
router.get('/boardpresalepy27/:id', authControllerPY27.authenticatedUser, dashboardControllerPY27.boardpresale);
router.get('/depositsaeroadmin/:id', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.depositsaeroadmin);

router.get('/profile27/:id', authControllerPY27.authenticatedUser, dashboardControllerPY27.profile);

router.get('/webpy27/:id', dashboardControllerPY27.web);
router.get('/webespy27/:id', dashboardControllerPY27.webes);
router.get('/privacy/:id', dashboardControllerPY27.privacy);
router.get('/register27/:id', dashboardControllerPY27.register);
// prueba
router.get('/login27/:id', dashboardControllerPY27.login);
router.get('/error27/:id', dashboardControllerPY27.error);
// AEROCOIN PRESALE
router.get('/aeropresale/:id', authControllerPY27.authenticatedUser, dashboardControllerPY27.aeropresale);
router.get('/depositaero/:id', authControllerPY27.authenticatedUser, dashboardControllerPY27.depositaero);
// CONTROL DE MONEDA AERO COIN
router.get('/aero/:id', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.aerocoin);

// AUTH
router.post('/loginpy27', dashboardControllerPY27.sesionstart);
router.post('/reguserpy27', dashboardControllerPY27.reguserpy27);

// APROBAR
router.post('/startdepositaero', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.startdepositaero);

// AÑADIR PRECIO DE AEROCOIN
router.post('/addaerocoin', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.addaerocoin);
// AÑADIR PRECIO DE BTC
router.post('/addbtcpricepy27', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.addbtcprice);
// AÑADIR PRECIO DE BNB
router.post('/addbnbpricepy27', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.addbnbprice);
// ACTUALIZAR PRECIO AEROCOIN
router.post('/updateaerocoin', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.updateaerocoin);
// ACTUALIZAR PRECIO BTC
router.post('/updateaebtcpy27', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.updateaebtc);
// ACTUALIZAR PRECIO BNB
router.post('/updateaebnbpy27', authControllerPY27.authenticatedAdmin, dashboardControllerPY27.updateaebnb);
// COMPRAR AEROCOINS
router.post('/buyaerocoins', authControllerPY27.authenticatedUser, dashboardControllerPY27.buyaerocoins);

// Cerrar Sesión
router.get('/logout/PYT-27', userControllerPY27.closeSesion);

/*------------ PYT-672-----------------*/
router.get('/grupos/:id', dashboardControllerPY672.grupos);
router.get('/verificargrupos/:id', dashboardControllerPY672.verificargrupos);
router.get('/matriculas/:id', dashboardControllerPY672.matriculas);


router.get('/error672/:id', dashboardControllerPY672.error);

// ? POST

// * CREAR GRUPOS
router.post('/creargrupopy672', dashboardControllerPY672.creargrupos);



/*------------ PYT-672-----------------*/

// 404
/*
router.use((req, res, next) => {
  res.status(404).redirect('/error404/PYT-21')
})
router.use((req, res, next) => {
  res.status(404).redirect('/error24/PYT-24')
})
*/
router.use((req, res, next) => {
  res.status(404).redirect('/error672/PYT-672')
})
router.use((req, res, next) => {
  res.status(404).redirect('/error27/PYT-27')
})



//router.get('/micuenta',authController.authenticatedUser, dashboardController.micuenta);
//router.get('/minegocio',authController.authenticatedUser, dashboardController.minegocio);
//router.get('/minegocio/:msg',authController.authenticatedUser, dashboardController.minegocio);


// Inicio de sesión con Facebook
router.get('/auth/facebook', 
  passport.authenticate('facebook', { scope : 'email' }
));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/dashboard',
    failureRedirect : '/'
  })
);
 
//incio sesion con google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }), function(req, res) {
    console.log("aqui")
  });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', {
    successRedirect : '/dashboard',
   failureRedirect: '/login',
  failureFlash: 'Invalid Google credentials.' }),
  function(req, res) {
    res.redirect('/dashboard');
  });


module.exports = router;