const {Router}=require("express");
const router=Router();

const validateTokenAccess=require('../middleware/middleware.validate_jwt')


const index=require('../controllers/pages/controller.index_page.js')
const login_page=require('../controllers/pages/controller.login_page.js')
const nosotros_page=require('../controllers/pages/controller.nosotros_page.js')
const perfil_page=require('../controllers/pages/controller.perfil_page.js')
const register_page=require('../controllers/pages/controller.register_page.js')
const user_register=require('../controllers/controller.register_user.js')
const login_user=require('../controllers/controller.login_user.js')
const update_perfil=require('../controllers/controller.update_perfil.js')
const empleado_page=require('../controllers/pages/controller.empleado_page.js')
const admin_page=require('../controllers/pages/controller.admin_page.js')
const citas_page=require('../controllers/pages/controller.citas_page.js')
const agendar_page=require('../controllers/pages/controller.agendar_page.js')
const create_post=require('../controllers/controller.postulaciones.js')
const create_category=require('../controllers/controller.create_category.js')
const create_services=require('../controllers/controller.create_services.js')
const delete_user=require('../controllers/controller.delete_user.js')
const delete_category=require('../controllers/controller.delete_category.js')
const delete_services=require('../controllers/controller.delete_services.js')
const get_category=require('../controllers/controller.get_category.js')
const get_services=require('../controllers/controller.get_services.js')
const get_my_services=require('../controllers/controller.get_my_services.js')
const agendar=require('../controllers/controller.agendar_servicio.js')
const get_my_citas=require('../controllers/controller.get_my_citas.js')

const get_users=require('../controllers/controller.get_users.js')
const citas_empleado_page=require('../controllers/pages/controller.citas_empleado_page.js')
const get_citas_empleado=require('../controllers/controller.get_citas_empleado.js')
const update_cita_estado=require('../controllers/controller.update_cita_estado.js')

router.get('/',index)
router.get('/login',login_page)
router.get('/register',register_page)
router.get('/nosotros',nosotros_page)
router.get('/perfil',perfil_page)
router.get('/citas',citas_page)
router.get('/empleado',empleado_page)
router.get('/admin',admin_page)
router.get('/agendar',agendar_page)
router.get('/categorias',get_category)
router.get('/servicios',get_services)
router.get('/my_servicios',validateTokenAccess,get_my_services)
router.get('/mis_citas',validateTokenAccess,get_my_citas)
router.get('/admin/users',validateTokenAccess,get_users)
router.get('/empleado/citas',validateTokenAccess,get_citas_empleado)
router.get('/citas_empleado',citas_empleado_page)


router.post('/register',user_register)
router.post('/login',login_user)
router.post('/postulacion',validateTokenAccess,create_post)
router.post('/admin/categorias',validateTokenAccess,create_category)
router.post('/create_services',validateTokenAccess,create_services)
router.post('/agendar',validateTokenAccess,agendar)

router.patch('/perfil',validateTokenAccess,update_perfil)

router.delete('/perfil',validateTokenAccess,delete_user)
router.delete('/admin/categorias/:id',validateTokenAccess,delete_category)
router.delete('/service/:id',validateTokenAccess,delete_services)

router.patch('/empleado/citas/:detalle_id',validateTokenAccess,update_cita_estado)




module.exports=router