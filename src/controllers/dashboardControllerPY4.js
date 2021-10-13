const fs = require("fs");
const path = require("path");
const Swal = require("sweetalert2");
const DataBase = require("../models/PYT4/data")
const passport = require("passport");
//const {getStreamUrls} = require('mixcloud-audio')
//var moment = require('moment'); // require
var moment = require('moment-timezone');

exports.dashboard = (req, res) => {
  console.log(req.session.sucursal_select)

  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  if (req.params.day) {
    
    dia =moment(req.params.day, 'YYYY-DD-MM').format('YYYY-MM-DD');
  }else{
    dia = new Date()
  }
 
  //DATA-COMUNES
  DataBase.ClientesAll().then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     DataBase.PedidosAll().then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       DataBase.ChoferesAll().then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
        DataBase.Sucursales_ALl().then((sucursales_)=>{
          let sucursales_let = JSON.parse(sucursales_)
        DataBase.PrestadosGroupByCliente().then((prestamos_)=>{
          let prestamos_let = JSON.parse(prestamos_)  
                let prestamos_byday = []
                let prestamos_del_dia = 0
                let residencial_cont = 0
                let negocio_cont = 0
                let ptoVenta_cont = 0
                for (let i = 0; i < prestamos_let.length; i++) {
                  fecha_created = prestamos_let[i].fecha_ingreso
                  
                  let iguales = moment(fecha_created).isSame(dia, 'day'); // true
                  
                    prestamos_byday.push(prestamos_let[i])//OJO CORREGIR ID DEL CLIENTE NO PUEDE SER NULL
                    prestamos_del_dia = parseInt(prestamos_del_dia) + parseInt(prestamos_let[i].cantidad)                    
                    switch (prestamos_let[i].cliente.tipo) {
                      case 'Residencial':
                       residencial_cont ++
                        break;
                        case 'Negocio':
                           negocio_cont++
                          break;
                          case 'Punto de venta':
                            ptoVenta_cont++
                            break;
                      default:
                        break;
                    }
                }
                   prestamos_byday =JSON.stringify(prestamos_byday)
                   
    res.render("PYT-4/home", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      dash:true,
      clientes_d,
      clientes_arr,
      pedidos_,
      pedidos_let,
      choferes_,prestamos_byday,prestamos_,sucursales_let,
      msg
    }) 
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/errorpy4/" + msg);
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


exports.login = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
   
    res.render("PYT-4/login", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      login:true,
    })
};

exports.register = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
   
    res.render("PYT-4/register", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      login:true,
    })
};

exports.sesionstart = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  passport.authenticate("local",  function (err, user, info) {
    if (err) {
      console.log(err)
      return next(err);
    }
    if (!user) {
      console.log("no existe usuario")
      return res.redirect("/loginpy4");
    }
    req.logIn(user, async function (err) {
      if (err) {
        console.log(err)
        return next(err);
      }
      console.log(user.dataValues.id);
     let id_sucursal = await DataBase.Sucursal_byId_gerente(user.dataValues.id).then((resp)=>{
        let resp_ = JSON.parse(resp)
        let sucursal_select = resp_[0].id
      return  sucursal_select
      })
      req.session.sucursal_select= id_sucursal
console.log(req.session.sucursal_select)
      return res.redirect('/homepy4')
    });
  })(req, res);
};


exports.usuariosTable = (req, res) => {
  
  let msg = false;

  if (req.params.msg) {
    msg = req.params.msg;
  }
  let proyecto = "PYT-4"
  DataBase.ClientesAll().then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length 
     DataBase.PedidosAll().then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       DataBase.ChoferesAll().then((choferes)=>{
        let choferes_ = JSON.parse(choferes)
        DataBase.Sucursales_ALl().then((sucursales_)=>{
          let sucursales_let = JSON.parse(sucursales_)
     res.render("PYT-4/usersTable", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      users1:true,
      clientes_d,pedidos_,
      pedidos_let,
      choferes,
      choferes_,
      clientes_arr,
      count,sucursales_let,
      msg
    })
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
   
};


exports.save_cliente_py4 = (req, res) => {
  
  const { firstName,cp,asentamiento,lastName,ciudad,municipio, fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, cliente_nuevo, fecha_ultimo_pedido, utimos_botellones,sucursal, email} = req.body
  let msg = false;
  var modo_cliente ="SI"
  if (cliente_nuevo == null){
    modo_cliente = "NO"
  }

  DataBase.registrar_cliente(firstName,cp,asentamiento,lastName,ciudad,municipio,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, modo_cliente, fecha_ultimo_pedido, utimos_botellones,sucursal, email).then((respuesta) =>{

    res.redirect('/usuarios/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
}

exports.delete_cliente = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
  DataBase.Delete_Cliente(id_).then((respuesta) =>{
    
    
  let msg = "Cliente Eliminado con éxito"
  res.redirect('/usuarios/'+msg)

   })   
 };

 exports.editar_cliente = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
DataBase.ClientebyId(id_).then((clientes_)=>{
  let cliente_let = JSON.parse(clientes_)[0]
  DataBase.Sucursales_ALl().then((sucursales_)=>{
    let sucursales_let = JSON.parse(sucursales_)
res.render("PYT-4/edit_cliente", {
  pageName: "Bwater",
  dashboardPage: true,
  dashboard: true,
  py4:true,
  users1:true,
  clientes_,
  cliente_let,sucursales_let
}) 
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
  });
 };
 exports.save_cliente_edit = (req, res) => {
   
  
  const {id_cliente,cp,asentamiento, firstName,lastName,ciudad,municipio,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, cliente_nuevo, fecha_ultimo_pedido, utimos_botellones,sucursal, email} = req.body
  let msg = false;
  var modo_cliente ="SI"
  if (cliente_nuevo == null){
    modo_cliente = "NO"
  }

  DataBase.update_cliente(id_cliente,cp,asentamiento,firstName,lastName,ciudad,municipio,fraccionamiento,coto,casa, calle, avenida, referencia, telefono, nombre_familiar_1, apellido_familiar_1,    telefono_familiar_1, nombre_familiar_2, apellido_familiar_2, telefono_familiar_2,  tipo_cliente, modo_cliente, fecha_ultimo_pedido, utimos_botellones,sucursal, email).then((respuesta) =>{
    res.redirect('/usuarios/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
}


  exports.reguserPy4 = (req, res) => {
    
    const { tipo, nombre, email, password} = req.body
    let msg = false;
  
    DataBase.RegUser(tipo, nombre, email, password).then((respuesta) =>{
      res.redirect('/homepy4/'+respuesta)
  
    }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/errorpy4/" + msg);
    });
};


exports.closeSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/loginpy4");
  });
};

exports.regPedidoPy4 = (req, res) => {
  
  let garrafon19L ={refill_cant: req.body.refill_cant_garrafon, refill_mont: req.body.refill_garrafon_mont, canje_cant: req.body.canje_cant_garrafon, canje_mont:req.body.canje_garrafon_mont, nuevo_cant:req.body.enNew_cant_garrafon, nuevo_mont: req.body.nuevo_garrafon_mont, total_cant: req.body.total_garrafon_cant, total_cost: req.body.total_garrafon, enobsequio_cant_garrafon: req.body.enobsequio_cant_garrafon}

  let botella1L ={refill_cant: req.body.refill_cant_botella, refill_mont: req.body.refill_botella_mont, canje_cant: req.body.canje_cant_botella, canje_mont:req.body.canje_botella_mont, nuevo_cant:req.body.enNew_cant_botella, nuevo_mont: req.body.nuevo_botella_mont, total_cant: req.body.total_botella_cant, total_cost: req.body.total_botella, enobsequio_cant_botella: req.body.enobsequio_cant_botella}

  let garrafon11L ={refill_cant: req.body.refill_cant_garrafon11l, refill_mont: req.body.refill_garrafon11l_mont, canje_cant: req.body.canje_cant_garrafon11l, canje_mont:req.body.canje_garrafon11l_mont, nuevo_cant:req.body.enNew_cant_garrafon11l, nuevo_mont: req.body.nuevo_garrafon11l_mont, total_cant: req.body.total_garrafon11l_cant, total_cost: req.body.total_garrafon11l, enobsequio_cant_garrafon11l: req.body.enobsequio_cant_garrafon11l}

  let botella5L ={refill_cant: req.body.refill_cant_botella5l, refill_mont: req.body.refill_botella5l_mont, canje_cant: req.body.canje_cant_botella5l, canje_mont:req.body.canje_botella5l_mont, nuevo_cant:req.body.enNew_cant_botella5l, nuevo_mont: req.body.nuevo_botella5l_mont, total_cant: req.body.total_botella5l_cant, total_cost: req.body.total_botella5l, enobsequio_cant_botella5l: req.body.enobsequio_cant_botella5l}

  const user = res.locals.user
  const { id_cliente, firstName, lastName,  ciudad,municipio, fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago, status_pago,   status_pedido, garrafones_prestamos, observacion,danados,id_chofer, sucursal} = req.body

  DataBase.PedidosReg(id_cliente, firstName, lastName,  ciudad, municipio,fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago,   status_pago,   status_pedido, garrafones_prestamos, observacion,danados,id_chofer, garrafon19L,botella1L, garrafon11L, botella5L, user.id, sucursal).then((respuesta) =>{
    res.redirect('/homepy4/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


exports.delete_pedido = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
  DataBase.Delete_Pedido(id_).then((respuesta) =>{
    
    
  let msg = "Pedido Eliminado con éxito"
  res.redirect('/homepy4/'+msg)

   })   
 };

 exports.editar_pedido = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
DataBase.PedidoById(id_).then((pedidos_)=>{
  let pedido_let = JSON.parse(pedidos_)[0]
  
 DataBase.ChoferesAll().then((choferes)=>{
  let choferes_ = JSON.parse(choferes)
  
 let garrafon19L = JSON.parse(pedido_let.garrafon19L);
 let botella1L = JSON.parse(pedido_let.botella1L)
 let garrafon11L = JSON.parse(pedido_let.garrafon11L)
 let botella5L = JSON.parse(pedido_let.botella5L)
 DataBase.Sucursales_ALl().then((sucursales_)=>{
  let sucursales_let = JSON.parse(sucursales_)
res.render("PYT-4/edit_pedido", {
  pageName: "Bwater",
  dashboardPage: true,
  dashboard: true,
  py4:true,
  dash:true,
  pedidos_,
  pedido_let,
  garrafon19L,choferes_,
botella1L,
garrafon11L,
botella5L,sucursales_let
}) 
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
  });
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
  });
 };

 exports.Save_editPedidoPy4 = (req, res) => {
  
  let garrafon19L ={refill_cant: req.body.refill_cant_garrafon, refill_mont: req.body.refill_garrafon_mont, canje_cant: req.body.canje_cant_garrafon, canje_mont:req.body.canje_garrafon_mont, nuevo_cant:req.body.enNew_cant_garrafon, nuevo_mont: req.body.nuevo_garrafon_mont, total_cant: req.body.total_garrafon_cant, total_cost: req.body.total_garrafon, enobsequio_cant_garrafon: req.body.enobsequio_cant_garrafon}

  let botella1L ={refill_cant: req.body.refill_cant_botella, refill_mont: req.body.refill_botella_mont, canje_cant: req.body.canje_cant_botella, canje_mont:req.body.canje_botella_mont, nuevo_cant:req.body.enNew_cant_botella, nuevo_mont: req.body.nuevo_botella_mont, total_cant: req.body.total_botella_cant, total_cost: req.body.total_botella, enobsequio_cant_botella: req.body.enobsequio_cant_botella}

  let garrafon11L ={refill_cant: req.body.refill_cant_garrafon11l, refill_mont: req.body.refill_garrafon11l_mont, canje_cant: req.body.canje_cant_garrafon11l, canje_mont:req.body.canje_garrafon11l_mont, nuevo_cant:req.body.enNew_cant_garrafon11l, nuevo_mont: req.body.nuevo_garrafon11l_mont, total_cant: req.body.total_garrafon11l_cant, total_cost: req.body.total_garrafon11l, enobsequio_cant_garrafon11l: req.body.enobsequio_cant_garrafon11l}

  let botella5L ={refill_cant: req.body.refill_cant_botella5l, refill_mont: req.body.refill_botella5l_mont, canje_cant: req.body.canje_cant_botella5l, canje_mont:req.body.canje_botella5l_mont, nuevo_cant:req.body.enNew_cant_botella5l, nuevo_mont: req.body.nuevo_botella5l_mont, total_cant: req.body.total_botella5l_cant, total_cost: req.body.total_botella5l, enobsequio_cant_botella5l: req.body.enobsequio_cant_botella5l}

  const user = res.locals.user
  const { id_pedido,id_cliente, firstName, lastName,  ciudad,municipio, fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago, status_pago,   status_pedido, garrafones_prestamos, observacion, danados,id_chofer,sucursal} = req.body

  DataBase.PedidosUpd(id_pedido,id_cliente, firstName, lastName,  ciudad, municipio,fraccionamiento, coto, casa, calle, avenida, referencia, telefono, chofer, total_total_inp, metodo_pago,   status_pago,   status_pedido, garrafones_prestamos, observacion,danados,id_chofer, garrafon19L,botella1L, garrafon11L, botella5L, user.id,sucursal).then((respuesta) =>{

    
    let msg=respuesta
    res.redirect('/homepy4/'+msg)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};

exports.cambiaS_pedido = (req, res) => {
  
  const user = res.locals.user
  const id_pedido = req.params.id
  const status = req.params.status
  

  DataBase.CambiaStatus(id_pedido,status).then((respuesta) =>{
    
    let msg=respuesta
    res.redirect('/homepy4/'+msg)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};
exports.cambia_S_pago = (req, res) => {
  
  const user = res.locals.user
  const id_pedido = req.params.id
  const status = req.params.status
  

  DataBase.CambiaStatusPago(id_pedido,status).then((respuesta) =>{
    
    let msg=respuesta
    res.redirect('/homepy4/'+msg)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


//PERSONAL
exports.personal_table = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  
  DataBase.ClientesAll().then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     
     DataBase.PedidosAll().then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       
      DataBase.PersonalAll().then((personal_)=>{
        let personal_let = JSON.parse(personal_)
         let count = personal_let.length
        
           DataBase.ChoferesAll().then((choferes)=>{
            let choferes_ = JSON.parse(choferes)
            DataBase.vehiculosAll().then((vehiculos_)=>{
              let vehiculos_let = JSON.parse(vehiculos_)
               let count = vehiculos_let.length
               DataBase.Sucursales_ALl().then((sucursales_)=>{
                let sucursales_let = JSON.parse(sucursales_)
    res.render("PYT-4/personal", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      personal:true,
      clientes_d, clientes_arr,  personal_let, personal_,  pedidos_,choferes,choferes_,
      vehiculos_let,  msg,sucursales_let
    }) 
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/errorpy4/" + msg);
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


exports.save_personal = (req, res) => {
  
  const { firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso, vehiculo} = req.body
  let msg = false;

  DataBase.savePersonal(firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso, vehiculo).then((respuesta) =>{
    res.redirect('/personal_py4/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


exports.delete_personal = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
  DataBase.Delete_Personal(id_).then((respuesta) =>{
    
  let msg = "Personal Eliminado con éxito"
  res.redirect('/personal_py4/'+msg)

   })   
 };

 exports.editar_personal = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
DataBase.PersonalById(id_).then((personal_)=>{
  let personal_let = JSON.parse(personal_)[0]
  
 DataBase.vehiculosAll().then((vehiculos_)=>{
  let vehiculos_let = JSON.parse(vehiculos_)
   let count = vehiculos_let.length
   DataBase.Sucursales_ALl().then((sucursales_)=>{
    let sucursales_let = JSON.parse(sucursales_)
res.render("PYT-4/edit_personal", {
  pageName: "Bwater",
  dashboardPage: true,
  dashboard: true,
  py4:true,
  personal:true,
  personal_,  personal_let,vehiculos_let,sucursales_let
}) 
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
  });
 };

 exports.save_personal_py4 = (req, res) => {
   
  const user = res.locals.user
  const {id_personal,firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso, vehiculo} = req.body

  DataBase.updPersonal(id_personal,firstName, lastName, direccion,cargo, salario, telefono,  sucursal, email, fecha_ingreso, vehiculo).then((respuesta) =>{
 
    
    let msg=respuesta
    res.redirect('/personal_py4/'+msg)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


//CORTE
exports.corte_table = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  let dia =""
 
  if (req.params.day) {
    
    dia =moment(req.params.day, 'YYYY-DD-MM').format('YYYY-MM-DD');
  }else{
    dia = new Date()
  }
  
  DataBase.ClientesAll().then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     
     DataBase.PedidosAllGroupByChoferes().then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
      DataBase.PersonalAll().then((personal_)=>{
        let personal_let = JSON.parse(personal_)
         let count = personal_let.length        
           DataBase.ChoferesAll().then((choferes)=>{
            let choferes_ = JSON.parse(choferes)
            let pedidos_byday = []
            let ventas_del_dia = 0
            let cont_ventas_del_dia = 0
            let residencial_cont = 0
            let residencial_mont= 0
            let negocio_cont = 0
            let negocio_mont= 0
            let ptoVenta_cont = 0
            let ptoVenta_mont= 0
            var chofer_pedido = []
            for (let i = 0; i < pedidos_let.length; i++) {
              fecha_created = pedidos_let[i].createdAt
              let iguales = moment.tz(fecha_created,'UTC').isSame(dia, 'day'); // true
              if (iguales == true && pedidos_let[i].status_pedido == "Entregado") {
                pedidos_byday.push(pedidos_let[i])
               ventas_del_dia = parseInt(ventas_del_dia) + parseInt(pedidos_let[i].monto_total)
                cont_ventas_del_dia++
                
                switch (pedidos_let[i].cliente.tipo) {
                  case 'Residencial':
                    residencial_mont= parseInt(residencial_mont) + parseInt(pedidos_let[i].monto_total)
                   residencial_cont ++
                    break;
                    case 'Negocio':
                       negocio_mont= parseInt(negocio_mont) + parseInt(pedidos_let[i].monto_total)
                       negocio_cont++
                      break;
                      case 'Punto de venta':
                        ptoVenta_mont = parseInt(ptoVenta_mont) + parseInt(pedidos_let[i].monto_total)
                        ptoVenta_cont++
                        break;
                  default:
                    break;
                }
              }
            }
               pedidos_byday =JSON.stringify(pedidos_byday)
              
    res.render("PYT-4/corte", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      corte:true,dia,
      clientes_d,clientes_arr,personal_let,personal_,pedidos_byday,
      cont_ventas_del_dia,ventas_del_dia,residencial_cont,residencial_mont, negocio_cont,  negocio_mont,ptoVenta_cont,ptoVenta_mont,pedidos_,
choferes,chofer_pedido,
choferes_,
      msg
    }) 
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/errorpy4/" + msg);
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


//CORTE PRESTADOS
exports.corte_prestados_table = (req, res) => {
  
  let id_chofer  = req.params. id_chofer, 
  cantidad = req.params.cantidad ,
  id_cliente = req.params.id_cliente ,
  fecha = req.params.fecha;
  
  DataBase.DescontarGPrestados(id_chofer,  cantidad, id_cliente, fecha).then((desc_)=>{
    let desc__let = JSON.parse(desc_)[0]
    
    let devueltos_nuevo = parseInt(desc__let.devueltos)+ parseInt(cantidad)
    let nueva_cantidad = parseInt(desc__let.cantidad)- parseInt(cantidad)
    
    DataBase.UpdateGPRestados(id_chofer,  devueltos_nuevo, id_cliente, fecha,nueva_cantidad).then((personal_)=>{
      let pedidos_let = JSON.parse(personal_)[0]
             
      res.send(pedidos_let.devueltos)
    })
  })

  

};



//CP
exports.consultaCP = (req, res) => {
  
  let cp = req.body.cp
  DataBase.CPbycp(cp).then((CP_)=>{
    let cp_let = JSON.parse(CP_)
    let count = cp_let.length
    
    return res.status(200).send({ cp_let:cp_let });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


//VEHICULOS
exports.vehiculos_table = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  
  DataBase.ClientesAll().then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     
     DataBase.PedidosAll().then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       
      DataBase.vehiculosAll().then((vehiculos_)=>{
        let vehiculos_let = JSON.parse(vehiculos_)
         let count = vehiculos_let.length
        
           DataBase.ChoferesAll().then((choferes)=>{
            let choferes_ = JSON.parse(choferes)
            DataBase.Sucursales_ALl().then((sucursales_)=>{
              let sucursales_let = JSON.parse(sucursales_)
    res.render("PYT-4/vehiculos", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      vehiculos:true,
      clientes_d,
      clientes_arr,
      vehiculos_let,
      vehiculos_,
      pedidos_,sucursales_let,
choferes,
choferes_,
      msg
    }) 
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/errorpy4/" + msg);
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


exports.save_vehiculos = (req, res) => {
  
  const { matricula, marca, modelo, anio, status, sucursal,tipo, capacidad} = req.body
  let msg = false;

  DataBase.savevehiculos(matricula, marca, modelo, anio, status, sucursal,tipo,capacidad).then((respuesta) =>{
    res.redirect('/vehiculos_py4/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


exports.delete_vehiculos = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
  DataBase.Delete_vehiculos(id_).then((respuesta) =>{
    
  let msg = "vehiculos Eliminado con éxito"
  res.redirect('/vehiculos_py4/'+msg)

   })   
 };

 exports.editar_vehiculos = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
DataBase.vehiculosById(id_).then((vehiculos_)=>{
  let vehiculos_let = JSON.parse(vehiculos_)[0]
  DataBase.Sucursales_ALl().then((sucursales_)=>{
    let sucursales_let = JSON.parse(sucursales_)
res.render("PYT-4/edit_vehiculos", {
  pageName: "Bwater",
  dashboardPage: true,
  dashboard: true,
  py4:true,
  vehiculos:true,
  vehiculos_,
  vehiculos_let,sucursales_let
}) 
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
  });
 };

 exports.save_vehiculos_py4 = (req, res) => {
   
  const user = res.locals.user
  const {id_vehiculo,matricula, marca, modelo, anio, status, sucursal,tipo, capacidad} = req.body

  DataBase.updVehiculos(id_vehiculo,matricula, marca, modelo, anio, status, sucursal,tipo, capacidad).then((respuesta) =>{
    
    let msg=respuesta
    res.redirect('/vehiculos_py4/'+msg)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};

//SUCURSALES
exports.sucursales = (req, res) => {
  let msg = false;
  if (req.params.msg) {
    msg = req.params.msg;
  }
  //comunes
  DataBase.ClientesAll().then((clientes_d)=>{
    let clientes_arr = JSON.parse(clientes_d)
     let count = clientes_arr.length
     
     DataBase.PedidosAll().then((pedidos_)=>{
      let pedidos_let = JSON.parse(pedidos_)
       let count = pedidos_let.length
       
           
           DataBase.ChoferesAll().then((choferes)=>{
            let choferes_ = JSON.parse(choferes)
            DataBase.vehiculosAll().then((vehiculos_)=>{
              let vehiculos_let = JSON.parse(vehiculos_)
               let count = vehiculos_let.length
 DataBase.Sucursales_ALl().then((sucursales_)=>{
                let sucursales_let = JSON.parse(sucursales_)
                 let count = sucursales_let.length
                 console.log(sucursales_let)
               //no comunes
              
                 DataBase.Gerentes().then((gerentes_)=>{
                  let gerentes_let = JSON.parse(gerentes_)
                   let count = gerentes_let.length
                   console.log(gerentes_let)
    res.render("PYT-4/sucursales", {
      pageName: "Bwater",
      dashboardPage: true,
      dashboard: true,
      py4:true,
      sucursales:true,
      clientes_d, clientes_arr,pedidos_,choferes,choferes_,
      vehiculos_let,  msg,
      //NO COMUNES
      sucursales_let, sucursales_,gerentes_let
    }) 
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
  console.log(err)
  let msg = "Error en sistema";
  return res.redirect("/errorpy4/" + msg);
});
  }).catch((err) => {
      console.log(err)
      let msg = "Error en sistema";
      return res.redirect("/errorpy4/" + msg);
    });
  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};


exports.save_sucursal = (req, res) => {
  
  const { nombre, direccion, longitud, latitud, telefono, gerente,telefono_gerente, id_gerente} = req.body
  let msg = false;

  DataBase.saveSucursal(nombre, direccion, longitud, latitud, telefono, gerente,telefono_gerente, id_gerente).then((respuesta) =>{
    res.redirect('/sucursales_py4/'+respuesta)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};

exports.delete_sucursales = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
  DataBase.delete_sucursales(id_).then((respuesta) =>{
    
  let msg = "Sucursal eliminada con éxito"
  res.redirect('/sucursales_py4/'+msg)

   })   
 };
 
 exports.editar_sucursales = (req, res) => {
  const user = res.locals.user;
  let id_ = req.params.id
  
DataBase.Sucursales_id(id_).then((sucursales_)=>{
  let sucursales_let = JSON.parse(sucursales_)[0]
  DataBase.Gerentes().then((gerentes_)=>{
    let gerentes_let = JSON.parse(gerentes_)
res.render("PYT-4/edit_sucursales", {
  pageName: "Bwater",
  dashboardPage: true,
  dashboard: true,
  py4:true,
  vehiculos:true,
  sucursales_,
  sucursales_let,gerentes_let
}) 
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
}).catch((err) => {
console.log(err)
let msg = "Error en sistema";
return res.redirect("/errorpy4/" + msg);
});
 };

 exports.editar_sucursales_save = (req, res) => {
   
  const user = res.locals.user
  const {id_sucursal, nombre, direccion, longitud, latitud, telefono, gerente,telefono_gerente, id_gerente} = req.body

  DataBase.updSucursal(id_sucursal,nombre, direccion, longitud, latitud, telefono, gerente,telefono_gerente, id_gerente).then((respuesta) =>{
    
    let msg=respuesta
    res.redirect('/sucursales_py4/'+msg)

  }).catch((err) => {
    console.log(err)
    let msg = "Error en sistema";
    return res.redirect("/errorpy4/" + msg);
  });
};
 