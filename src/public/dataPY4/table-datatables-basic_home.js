/**
 * DataTables Advanced
 */

 'use strict';
 // Advanced Search Functions Starts
 // --------------------------------------------------------------------
 var minDate, maxDate,minDate2, maxDate2;
 
 // Custom filtering function which will search data in column four between two values
 $.fn.dataTable.ext.search.push(
     function( settings, data, dataIndex ) {
         var min = minDate.val();
         var max = maxDate.val();
       

     let f = data[5]
    
         var date = new Date(f);
         if (
             ( min === null && max === null ) ||
             ( min === null && date <= max ) ||
             ( min <= date   && max === null ) ||
             ( min <= date   && date <= max ) 
         ) {
             return true;
         }
         return false;
     }
 );
 
 
 // Datepicker for advanced filter
 var separator = ' - ',
   rangePickr = $('.flatpickr-range'),
   dateFormat = 'MM/DD/YYYY';
 var options = {
   autoUpdateInput: false,
   autoApply: true,
   locale: {
     format: dateFormat,
     separator: separator
   },
   opens: $('html').attr('data-textdirection') === 'rtl' ? 'left' : 'right'
 };
 
 //
 if (rangePickr.length) {
   rangePickr.flatpickr({
     mode: 'range',
     dateFormat: 'm/d/Y',
     onClose: function (selectedDates, dateStr, instance) {
       var startDate = '',
         endDate = new Date();
       if (selectedDates[0] != undefined) {
         startDate =
           selectedDates[0].getMonth() + 1 + '/' + selectedDates[0].getDate() + '/' + selectedDates[0].getFullYear();
         $('.start_date').val(startDate);
       }
       if (selectedDates[1] != undefined) {
         endDate =
           selectedDates[1].getMonth() + 1 + '/' + selectedDates[1].getDate() + '/' + selectedDates[1].getFullYear();
         $('.end_date').val(endDate);
       }
       $(rangePickr).trigger('change').trigger('keyup');
     }
   });
 }
 
 // Advance filter function
 // We pass the column location, the start date, and the end date
 var filterByDate = function (column, startDate, endDate) {
   // Custom filter syntax requires pushing the new filter to the global filter array
   $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData, iDataIndex) {
     var rowDate = normalizeDate(aData[column]),
       start = normalizeDate(startDate),
       end = normalizeDate(endDate);
       var  min2 = minDate2.val();
       var max2 = maxDate2.val();
       let f = aData[5]
       var date = new Date(f);
     // If our date from the row is between the start and end
     if (
      ( min2 === null && max2 === null ) ||
      ( min2 === null && date <= max2 ) ||
      ( min2 <= date   && max2 === null ) ||
      ( min2 <= date   && date <= max2 ) 
  ) {
      return true;
  }
  return false;
   });
 };
 
 // converts date strings to a Date object, then normalized into a YYYYMMMDD format (ex: 20131220). Makes comparing dates easier. ex: 20131220 > 20121220
 var normalizeDate = function (dateString) {
   var date = new Date(dateString);
   var normalized =
     date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' + ('0' + date.getDate()).slice(-2);
   return normalized;
 };
 function cargaTablas(rechar) {
    
  let valor = $('#array_pedido').val()
  let array2 = ""
  if (rechar) {
    
    array2 = JSON.parse(valor)

  }else{
    array2 = JSON.parse(valor.replace(/&quot;/g,'"'))
  }
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))
  //let stproductos = JSON.parse(array.productos)
  let status_pedido = array2.filter(status => status.status_pedido == "En proceso" || status.status_pedido == "Rezagado" || status.status_pedido == "Por entregar" || status.status_pedido == "Devuelto"); // return implicito
  let status_pedido2 = array2.filter(status => status.status_pedido == "Entregado" || status.status_pedido == "Reasignado" || status.status_pedido == "Cancelado"); // return implicito
  var dt_basic_table = $('.datatables-basic'),
    dt_date_table = $('.dt-date'),
    dt_basic_table2 = $('.datatables-basic2'),
    dt_adv_filter_table = $('.datatables-basic'),
    dt_row_grouping_table = $('.dt-row-grouping'),
    dt_multilingual_table = $('.dt-multilingual'),
    assetPath = '../../dataPY4/';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }
  minDate = new DateTime($('#min'), {
    format: 'DD/MM/YYYY'
});
maxDate = new DateTime($('#max'), {
    format: 'DD/MM/YYYY'
});

minDate2 = new DateTime($('#min1'), {
  format: 'DD/MM/YYYY'
});
maxDate2 = new DateTime($('#max1'), {
  format: 'DD/MM/YYYY'
});
  // DataTable with buttons
  // --------------------------------------------------------------------
  var groupColumn = 8;
  if (dt_basic_table.length) {
    $('.dt-column-search thead tr').clone(true).appendTo('.dt-column-search thead');
    $('.dt-column-search thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');
  
      $('input', this).on('keyup change', function () {
        if (dt_basic.column(i).search() !== this.value) {
          dt_basic.column(i).search(this.value).draw();
        }
      });
    });
    $('.select_chofer_pedidos').on('change', function(){
      console.log(this.value)
      dt_basic.search(this.value).draw();   
   });
   $('.select_etiqueta_pedidos').on('change', function(){
    console.log(this.value)
    dt_basic.search(this.value).draw();   
 });
    var dt_basic = dt_basic_table.DataTable({
      data: status_pedido,
      columns: [
        { data: 'id' },
        { data: 'cliente.firstName' },
        { data: 'total_garrafones_pedido' },
        { data: 'monto_total'}, // used for sorting so will hide this column
        { data: 'status_pedido' },
        { data: 'status_pago' },
        { data: 'createdAt'},
        {   // Actions
          targets: -1,
          title: 'Opciones',
          orderable: false,
          render: function (data, type, full, meta) {
            let rf= parseInt((JSON.parse(full['botella1L']))['refill_cant'])+parseInt((JSON.parse(full['botella5L']))['refill_cant'])+parseInt((JSON.parse(full['garrafon11L']))['refill_cant'])+parseInt((JSON.parse(full['garrafon19L']))['refill_cant'])
            let CJ= parseInt((JSON.parse(full['botella1L']))['canje_cant'])+parseInt((JSON.parse(full['botella5L']))['canje_cant'])+parseInt((JSON.parse(full['garrafon11L']))['canje_cant'])+parseInt((JSON.parse(full['garrafon19L']))['canje_cant'])
            let Env= parseInt((JSON.parse(full['botella1L']))['nuevo_cant'])+parseInt((JSON.parse(full['botella5L']))['nuevo_cant'])+parseInt((JSON.parse(full['garrafon11L']))['nuevo_cant'])+parseInt((JSON.parse(full['garrafon19L']))['nuevo_cant'])
            let asentamiento = ""
for (let i = 0; i < codigosP_arr.length; i++) {
  if (codigosP_arr[i]['id'] == full['cliente']['cpId']) {
    asentamiento = codigosP_arr[i]['asentamiento']
  }
  
}
if ($('#otro_rol').length>0) {
    console.log($(this).html())
let Hoy = moment().format('DD/MM/YYYY'); 
let fecha =moment(full['createdAt']).format('DD/MM/YYYY')
    var fecha_final= moment(Hoy).isAfter(fecha); // true
        
} 
let modif = ""
console.log(fecha_final)
if (fecha_final == true) {
  modif = "d-none"
}
            return (
              '<div class="d-inline-flex">' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record '+full['id']+'">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'+
              '<a href="javascript:;" class="'+full['id']+' dropdown-item '+modif+'" onclick=\'edit_pedido("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item share_record '+full['id']+'">' +
              feather.icons['share-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>' +
             `<p id="CopyPedido${full['id']}" class="d-none">#Pedido:${full['id']} -
Cliente:  ${full['cliente']['firstName']} ${full['cliente']['lastName']};
Dirección: ${asentamiento}, Coto ${full['cliente']['coto']}, Casa ${full['cliente']['casa']},Calle ${full['cliente']['calle']}, Avenida ${full['cliente']['avenida']};
Referencia:${full['cliente']['referencia']}
Rf:${rf}; CJ: ${CJ};Env: ${Env}</p>`  
            );
          }, 
        },
        { data: 'personal.name' },
        { data: 'cliente.etiqueta' },
      ], columnDefs: [
        { visible: false, targets: groupColumn,
         
        },
        { visible: false, targets: 9,
          render: function (data, type, full) {
            
            if (full['cliente']['etiqueta'] == null) {
          return data
            }else{
              
              console.log(data['etiquetas'])
              return data['etiquetas']
            }
            
          }
         
        },
        {
          // Label
          targets: 0,
          render: function (data, type, full, meta) {
          //  let fecha_creado = full['createdAt'], modificado = full['updatedAt']
          //  let modificacion = moment(fecha_creado).isSame(modificado)
          //   if (modificacion == false) {
          //     return (`<span class="badge rounded-pill badge-light-danger"> ${full['id']}</span>`);
          //   }
            var cliente_arr = encodeURIComponent(JSON.stringify(full['cliente']));
            var color_tag ="", color_text=""
            if (full['cliente']['etiqueta'] ==null) {
              color_tag =0
              color_text="black"
            }else{
              color_tag =full['cliente']['etiqueta']['color']
              color_text="white"
            }
            return (`<span class="badge rounded-pill " style="cursor:pointer; background-color: ${color_tag}; color:${color_text}"> ${full['id']}</span>`);
          }
        },
        {
          // Label
          targets: 1,
          render: function (data, type, full, meta) {
            let asentamiento = ""
            for (let i = 0; i < codigosP_arr.length; i++) {
              if (codigosP_arr[i]['id'] == full['cliente']['cpId']) {
                asentamiento = codigosP_arr[i]['asentamiento']
              }
              
            }
       
            var $status_number = full['cliente']['tipo'];
            var $status = {
              "Residencial": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: 'badge-light-info' },
              "Punto de venta": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: ' badge-light-success' },
              "Negocio": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: ' badge-light-danger' },
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
        var cliente_arr = encodeURIComponent(JSON.stringify(full['cliente']));
        var color_tag ="", color_text=""
        if (full['cliente']['etiqueta'] ==null) {
          color_tag =0
          color_text="black"
        }else{
          color_tag =full['cliente']['etiqueta']['color']
          color_text="white"
        }
        console.log(full['cliente'])
        //aqui activa el modal info del cliente
            return (
              '<span class="hover_cliente badge rounded-pill ' +$status[$status_number].class+
              '" data-id="'+full['cliente']['id']+'" data-arraycliente="'+cliente_arr+'" data-title="Datos de '+full['cliente']['firstName']+'" >' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
         {
          // Label
          targets: 2,
          render: function (data, type, full, meta) {
            let total = parseInt(data)- parseInt(full['total_obsequio_pedido'])
            return (
              '<span class="badge rounded-pill badge-light-info modal_detail_garrafones" data-id="'+full['cliente']['id']+'" data-rfeill="'+full['total_refill_pedido']+'" data-total="'+data+'" data-canje="'+full['total_canje_pedido']+'" data-env="'+full['total_nv_pedido']+'" data-obsequio="'+full['total_obsequio_pedido']+'" data-title="Detalle garrafones"  style="cursor:pointer;" >' +
              total +
              '</span>'
            );
          }

        
        },
        {
          // Label
          targets: 3,
          render: function (data, type, full, meta) {
           let detailRefill = 0, detailCanje = 0, detailNuevo=0
           detailRefill = parseFloat(full['total_refill_pedido'])*35
           detailCanje = parseFloat(full['total_canje_pedido'])*55
           detailNuevo = parseFloat(full['total_nv_pedido'])*105
           return (
            '<span class="badge rounded-pill badge-light-info detail_monto " data-id="'+full['cliente']['id']+'" data-rfeill="'+detailRefill+'" data-total="'+data+'" data-canje="'+detailCanje+'" data-env="'+detailNuevo+'" data-obsequio="'+full['total_obsequio_pedido']+'" data-title="Detalle monto total"   style="cursor:pointer;" >$' +
            data +
            '</span>'
          );
        }
      },
        {
          // Label
          targets: 4,
          render: function (data, type, full, meta) {
            var $status_number = full['status_pedido'];
            var $status = {
              "Devuelto": { title: 'En proceso', class: 'badge-light-primary' },
              "Por entregar": { title: 'Por entregar', class: ' badge-light-yellow' },
              "Devuelto": { title: 'Devuelto', class: ' badge-light-danger' },
              "Rezagado": { title: 'Rezagado', class: ' badge-light-warning' },
              "En proceso": { title: 'En proceso', class: ' badge-light-info' }
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '" style="cursor:pointer"   onclick=\'cambioSP("'+full['id'] +'","'+full['status_pedido'] +'")\' data-status="'+full['status_pedido'] +'" data-id="'+full['id']+'">' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          // Label
          targets: 5,
          render: function (data, type, full, meta) {
            var $status_number = full['status_pago'];
            var $status = {
              "Pagado": { title: 'Pagado', class: 'badge-light-success' },
              "Por verificar": { title: 'Por verificar', class: ' badge-light-yellow' },
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '" style="cursor:pointer" onclick=\'cambioPago("'+full['id'] +'","'+full['status_pago'] +'")\'>' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          targets: 6,className:'fecha_pedido',
          render:function(data, type, full){
            console.log(full['id'])
           // return moment.tz(data, 'America/Mexico_City').format('L');
         //  return (`<span class="badge rounded-pill">${moment(data).format('L')}</span>`);
           return moment(data).format('L');
          }
        },
      ],
     
      order: [[6, 'desc'],[9,'desc']],
      dom: '<"none "<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      drawCallback: function (settings) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api
          .column(groupColumn, { page: 'current' })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              $(rows)
                .eq(i)
                .before('<tr class="group"><td colspan="8"><i class="fas fa-truck me-1"></i>                ' + group + '</td></tr>');//AQUI LOS CHOFERES AGRUPADOS

              last = group;
            }
          });
      },
     
      language: {
      "decimal": "",
      "emptyTable": "No hay información",
      "info": "Total _TOTAL_ registros",
      "infoEmpty": "Total _TOTAL_ registros",
      "infoFiltered": "(Filtrado de _MAX_ registros totales)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ Entradas",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      }
    });
    $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
      // on key up from input field
 /* $('input.dt-input').on('keyup change', function () {
    filterColumn($(this).attr('data-column'), $(this).val());
  });**/


    // Refilter the table
    $('#min1, #max1').on('change', function () {
      filterByDate(5); // We call our filter function
      dt_basic.draw();
      });
  }
  if (dt_basic_table2.length) {
    $('.dt-column-search2 thead tr').clone(true).appendTo('.dt-column-search2 thead');
    $('.dt-column-search2 thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');
  
      $('input', this).on('keyup change', function () {
        if (dt_basic2.column(i).search() !== this.value) {
          dt_basic2.column(i).search(this.value).draw();
        }
      });
    });
    $('.select_chofer_ventas').on('change', function(){
      console.log(this.value)
      dt_basic2.search(this.value).draw();   
   });  
    $('.select_etiqueta_ventas').on('change', function(){
      console.log(this.value)
      dt_basic2.search(this.value).draw();   
   });
    var dt_basic2 = dt_basic_table2.DataTable({
      data: status_pedido2,
      columns: [
        { data: 'id' },
        { data: 'cliente.firstName' },
        { data: 'total_garrafones_pedido' },
        { data: 'monto_total'}, // used for sorting so will hide this column
        { data: 'status_pedido' },
        { data: 'status_pago' },
        { data: 'createdAt'},
        {   // Actions
          targets: -1,
          title: 'Opciones',
          orderable: false,
          render: function (data, type, full, meta) {
            if ($('#otro_rol').length>0) {
              console.log(full['createdAt'])
                console.log($(this).html())
            let Hoy = moment().format('DD/MM/YYYY'); 
            console.log(Hoy)
            let fecha =moment(full['createdAt']).format('DD/MM/YYYY')
            console.log(fecha)
                var fecha_final= moment(Hoy).isAfter(fecha); // true
                    
            } 
            let modif = ""
            console.log(fecha_final)
            if (fecha_final == true) {
              modif = "d-none"
            }
            return (
              '<div class="d-inline-flex">' +
              '<a href="javascript:;" class="'+full['id']+' dropdown-item delete-record ">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'+
              '<a href="javascript:;" class="'+full['id']+' dropdown-item '+modif+'" onclick=\'edit_pedido("'+full['id']+'")\'>' +
              feather.icons['file-text'].toSvg({ class: 'font-small-4 '+full['id']+'' }) +
              '</a>'              
            );
          } },
          { data: 'personal.name' },
          { data: 'cliente.etiqueta' },
        ], columnDefs: [
          { visible: false, targets: groupColumn,
           
          },
          { visible: false, targets: 9,
           
          },
          {
            // Label
            targets: 0,
            render: function (data, type, full, meta) {
            //  let fecha_creado = full['createdAt'], modificado = full['updatedAt']
            //  let modificacion = moment(fecha_creado).isSame(modificado)
            //   if (modificacion == false) {
            //     return (`<span class="badge rounded-pill badge-light-danger"> ${full['id']}</span>`);
            //   }
              var cliente_arr = encodeURIComponent(JSON.stringify(full['cliente']));
              var color_tag ="", color_text=""
              if (full['cliente']['etiqueta'] ==null) {
                color_tag =0
                color_text="black"
              }else{
                color_tag =full['cliente']['etiqueta']['color']
                color_text="white"
              }
              return (`<span class="badge rounded-pill " style="cursor:pointer; background-color: ${color_tag}; color:${color_text}"> ${full['id']}</span>`);
            }
          },
          {
            // Label
            targets: 1,
            render: function (data, type, full, meta) {
              let asentamiento = ""
              for (let i = 0; i < codigosP_arr.length; i++) {
                if (codigosP_arr[i]['id'] == full['cliente']['cpId']) {
                  asentamiento = codigosP_arr[i]['asentamiento']
                }
                
              }
              var $status_number = full['cliente']['tipo'];
              var $status = {
                "Residencial": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: 'badge-light-info' },
                "Punto de venta": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: ' badge-light-success' },
                "Negocio": { title: full['cliente']['firstName'] +" "+ full['cliente']['lastName'] + " / "+ asentamiento, class: ' badge-light-danger' },
              };
              if (typeof $status[$status_number] === 'undefined') {
                return data;
              }
          var cliente_arr = encodeURIComponent(JSON.stringify(full['cliente']));
          var color_tag ="", color_text=""
          if (full['cliente']['etiqueta'] ==null) {
            color_tag =0
            color_text="black"
          }else{
            color_tag =full['cliente']['etiqueta']['color']
            color_text="white"
          }
              return (
                '<span class="hover_cliente badge rounded-pill ' +$status[$status_number].class+
                '" data-id="'+full['cliente']['id']+'" data-arraycliente="'+cliente_arr+'" data-title="Datos de '+full['cliente']['firstName']+'" >' +
                $status[$status_number].title +
                '</span>'
              );
            }
          },
        {
          // Label
          targets: 2,
          render: function (data, type, full, meta) {
            let total = parseInt(data)- parseInt(full['total_obsequio_pedido'])
            return (
              '<span class="badge rounded-pill badge-light-info modal_detail_garrafones"  data-id="'+full['cliente']['id']+'" data-rfeill="'+full['total_refill_pedido']+'" data-total="'+data+'" data-canje="'+full['total_canje_pedido']+'" data-env="'+full['total_nv_pedido']+'" data-obsequio="'+full['total_obsequio_pedido']+'" data-title="Detalle garrafones"   style="cursor:pointer;" >' +
              total +
              '</span>'
            );
          }
        
        
        },
        {
          // Label
          targets: 3,
          render: function (data, type, full, meta) {
            
           let detailRefill = 0, detailCanje = 0, detailNuevo=0
           detailRefill = parseFloat(full['total_refill_pedido'])*35
           detailCanje = parseFloat(full['total_canje_pedido'])*55
           detailNuevo = parseFloat(full['total_nv_pedido'])*105
           return (
            '<span class="badge rounded-pill badge-light-info detail_monto"  data-id="'+full['cliente']['id']+'" data-rfeill="'+detailRefill+'" data-total="'+data+'" data-canje="'+detailCanje+'" data-env="'+detailNuevo+'" data-obsequio="'+full['total_obsequio_pedido']+'" data-title="Detalle monto total"  style="cursor:pointer;">$' +
            data +
            '</span>'
          );
        }
      },
        {
          // Label
          targets: 4,
          render: function (data, type, full, meta) {
            
            var $status_number = full['status_pedido'];
            var $status = {
              "Reasignado": { title: 'Reasignado', class: 'badge-light-primary' },
              "Entregado": { title: 'Entregado', class: ' badge-light-success' },
              "Cancelado": { title: 'Devuelto', class: ' badge-light-danger' },
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '" style="cursor:pointer"   data-status="'+full['status_pedido'] +'" data-id="'+full['id']+'" onclick=\'cambioSP("'+full['id'] +'","'+full['status_pedido'] +'")\'>' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },
        {
          // Label
          targets: 5,
          render: function (data, type, full, meta) {
            var $status_number = full['status_pago'];
            var $status = {
              "Pagado": { title: 'Pagado', class: 'badge-light-success' },
              "Por verificar": { title: 'Por verificar', class: ' badge-light-yellow' },
            };
            if (typeof $status[$status_number] === 'undefined') {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '" style="cursor:pointer" onclick=\'cambioPago("'+full['id'] +'","'+full['status_pago'] +'")\'>' +
              $status[$status_number].title +
              '</span>'
            );
          }
        },{
          targets: 6,
          render:function(data){
           // return moment(data).format('L');
            return moment(data).format('L');
          }
        },
      ],
     
      order: [[6, 'desc'],[5, 'desc']],
      dom: '<" none"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      displayLength: 10,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      drawCallback: function (settings) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api
          .column(groupColumn, { page: 'current' })
          .data()
          .each(function (group, i) {
            let icono =`<i class="fas fa-truck"></i>`
            if (last !== group) {
              $(rows)
                .eq(i)

                .before('<tr class="group"><td colspan="8"><i class="fas fa-truck me-1"></i>' + group + '</td></tr>');


              last = group;
            }
          });
      },
      language: {
        "decimal": "",
      "emptyTable": "No hay información",
      "info": "Total _TOTAL_ registros",
      "infoEmpty": "Total _TOTAL_ registros",
      "infoFiltered": "(Filtrado de _MAX_ registros totales)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ Entradas",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "Sin resultados encontrados",
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      }
    });

    $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');
      // on key up from input field
 /*$('input.dt-input2').on('keyup change', function () {
    filterColumn2($(this).attr('data-column'), $(this).val());
  });*/

  $('#min, #max').on('change', function () {
    dt_basic2.draw();
    });

  }
}

 // Advanced Search Functions Ends
 $(function () {
  'use strict';
  cargaTablas()
  let codigosP = $('#array_cp').val()
  let codigosP_arr = JSON.parse(codigosP.replace(/&quot;/g,'"'))

  $('.cambia_status').on('click',async (e)=>{
    console.log(e['currentTarget']['dataset'])
   let id =e['currentTarget']['dataset']['id'], status=e['currentTarget']['dataset']['status']
    
  })
  //ACA SE ACTIVAS LOS CONTEXT MENU
  
  $.contextMenu({
    selector: '.modal_detail_garrafones',
    trigger: 'hover',
    autoHide: true,
    build: function ($trigger, e) {
      console.log(e)
      var title = e.currentTarget['dataset']["title"];
      var rfeill = e.currentTarget['dataset']["rfeill"];
      var canje = e.currentTarget['dataset']["canje"];
     var Env = e.currentTarget['dataset']["env"] 
     var obsequio = e.currentTarget['dataset']["obsequio"];
     var total = e.currentTarget['dataset']["total"] 
        return {
            callback: function (key, options) {
                var m = "clicked: " + key;
                console.log(m);
            },
            items: {
                "Refill": { name: `Refill: ${rfeill}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
                "Canje": { name: `Canje: ${canje}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
                "Envase Nuevo": { name: `Envase Nuevo: ${Env}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
                "Total": { name: `Total: ${total}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
            }
        };
    }
  });

$.contextMenu({
  selector: '.detail_monto',
  trigger: 'hover',
  autoHide: true,
  build: function ($trigger, e) {
    console.log(e)
    var title = e.currentTarget['dataset']["title"];
    var rfeill = e.currentTarget['dataset']["rfeill"];
    var canje = e.currentTarget['dataset']["canje"];
   var Env = e.currentTarget['dataset']["env"] 
   var obsequio = e.currentTarget['dataset']["obsequio"];
   var total = e.currentTarget['dataset']["total"] 
      return {
          callback: function (key, options) {
              var m = "clicked: " + key;
              console.log(m);
          },
          items: {
              "Refill": { name: `Refill: $${rfeill}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Canje": { name: `Canje: $${canje}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Envase Nuevo": { name: `Envase Nuevo: $${Env}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Total": { name: `Total: $${total}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
          }
      };
  }
});
$.contextMenu({
  selector: '.hover_cliente',
  trigger: 'hover',
  autoHide: true,
  build: function ($trigger, e) {
    var title = e.currentTarget['dataset']["title"];
    var Array = e.currentTarget['dataset']["arraycliente"];
     var my_object = JSON.parse(decodeURIComponent(Array));
   //  $("#home_modalBody").append(txt2);
   let asentamiento =""
   for (let i = 0; i < codigosP_arr.length; i++) {
   if (my_object['cpId'] == codigosP_arr[i]['id']) {
     asentamiento = codigosP_arr[i]['asentamiento']
   }
   }
      return {
          callback: function (key, options) {
              var m = "clicked: " + key;
              console.log(m);
          },
          items: {
              "Asentamiento": { name: `Asentamiento: ${asentamiento}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Coto": { name: `Coto: ${my_object['coto']}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Casa": { name: `Casa: ${my_object['casa']}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
              "Tlf": { name: `Tlf: ${my_object['telefono']}`,className: 'list-group-item d-flex justify-content-between align-items-center'},
          }
      };
  }
});
 

  // Add New record
  // ? Remove/Update this code as per your requirements ?
  var count = 101;
  $('.data-submit').on('click', function () {
    var $new_name = $('.add-new-record .dt-full-name').val(),
      $new_post = $('.add-new-record .dt-post').val(),
      $new_email = $('.add-new-record .dt-email').val(),
      $new_date = $('.add-new-record .dt-date').val(),
      $new_salary = $('.add-new-record .dt-salary').val();

    if ($new_name != '') {
      dt_basic.row
        .add({
          responsive_id: null,
          id: count,
          full_name: $new_name,
          post: $new_post,
          email: $new_email,
          start_date: $new_date,
          salary: '$' + $new_salary,
          status: 5
        })
        .draw();
      count++;
      $('.modal').modal('hide');
    }
  });



  // Responsive Table
  // --------------------------------------------------------------------


  // Filter form control to default size for all tables
  $('.dataTables_filter .form-control').removeClass('form-control-sm');
  $('.dataTables_length .form-select').removeClass('form-select-sm').removeClass('form-control-sm');
  // Delete Record
  
  $('.odd').addClass('selector');
  $('.even').addClass('selector'); 

  $('.datatables-basic tbody').on('click', '.delete-record', function (e) {    
    if ($('#otro_rol').length) {
      console.log('no eres admin')
      Swal.fire("Función valida solo para directores")
      return
    }
    var id = e.target.classList[0]
    Swal.fire({
      title: 'Eliminar',
      text: "Seguro desea eliminar el pedido indicado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`/delete_pedido/${id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`              
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result)
        dt_basic.row($(this).parents('tr')).remove().draw();
        Swal.fire({
          title: `Pedido ${id} borrado con éxito`,
        })
      }
    })

  });

  $('#form_edit_pedido').submit((e)=>{
    e.preventDefault()
    $.ajax({
      url: `/editar_pedido_save`,
      type: 'POST',
      data:$("#form_edit_pedido").serialize(),
      success: function (data, textStatus, jqXHR) {
  $('#array_pedido').val(JSON.stringify(data.pedidos_let))
  
  $('.datatables-basic').dataTable().fnDestroy();
   $('.datatables-basic').empty();
  $('.datatables-basic').html(`<thead>
  <tr>
      <th>Nº Pedido</th>
      <th>Cliente</th>
      <th>Total garrafones</th>
      <th>Monto Total</th>
      <th>Status del Pedido</th>
      <th>Status de Pago</th>
      <th>Fecha</th>
      <th>Opciones</th>
      
  
  <th>oculto choferes </th> 
  <th>oculto etiqueta </th> 
  </tr>
  </thead>`);
  $('.datatables-basic2').dataTable().fnDestroy();
  $('.datatables-basic2').empty();
  $('.datatables-basic2').html(`<thead>
  <tr>
      <th>Nº Pedido</th>
      <th>Cliente</th>
      <th>Total garrafones</th>
      <th>Monto Total</th>
      <th>Status del Pedido</th>
      <th>Status de Pago</th>
      <th>Fecha</th>
      <th>Opciones</th>
      
  
  <th>oculto choferes </th> 
  <th>oculto etiqueta </th> 
  </tr>
  </thead>`);
  
  cargaTablas('si')
  $('#edit_pedido').modal('hide')
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });   
  });
  $('.datatables-basic tbody').on('click', '.share_record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit = e.target.classList[0]
    if (typeof id_edit =="undefined") {
      return console.log(id_edit)
    }
    /*let direction_copy = location.host + `/ver_pedido/${id_edit}`;
    $('#p1').text(direction_copy)*/
    copyToClipboard(`#CopyPedido${id_edit}`)

  });

  $('.datatables-basic2 tbody').on('click', '.edit_record', function (e) {
    //dt_basic.row($(this).parents('tr')).remove().draw();
    var id_edit2 = e.target.classList[0]
    if (typeof id_edit2 =="undefined") {
      return console.log(id_edit2)
    }
  //window.location.href = `/editar_pedido/${id_edit2}`;
$('#edit_pedido').modal('show')

  });

  $('.datatables-basic2 tbody').on('click', '.delete-record', function (e) {
    if ($('#otro_rol').length) {
      console.log('no eres admin')
      Swal.fire("Función valida solo para directores")
      return
    }
    var id2= e.target.classList[0]
    Swal.fire({
      title: 'Eliminar',
      text: "Seguro desea eliminar el pedido indicado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`/delete_pedido/${id2}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`              
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result)
        dt_basic2.row($(this).parents('tr')).remove().draw();
        Swal.fire({
          title: `Pedido ${id2} borrado con éxito`,
        })
      }
    })

  });

});
// Filter column wise function
function filterColumn(i, val) {
  if (i == 5) {
    var startDate = $('.start_date').val(),
      endDate = $('.end_date').val();
    if (startDate !== '' && endDate !== '') {
      
      filterByDate(i, startDate, endDate); // We call our filter function
    }
    
    if (startDate == '' && endDate == '') {
      
      location.reload();
    }
    $('.datatables-basic').dataTable().fnDraw();
    
  } else {
    $('.datatables-basic').DataTable().column(i).search(val, false, true).draw();
  }
}
function copyToClipboard(elemento) {
  var $temp = $("<textarea>")
  var brRegex = /<br\s*[\/]?>/gi;
  $("body").append($temp);
  $temp.val($(elemento).html().replace(brRegex, "\r\n")).select();
  document.execCommand("copy");
  $temp.remove();
  Swal.fire('Pedido copiado en el portapapeles')
  }
// Filter column wise function
function filterColumn2(i, val) {
  if (i == 5) {
    var startDate = $('.start_date2').val(),
      endDate = $('.end_date2').val();
    if (startDate !== '' && endDate !== '') {
      
      filterByDate(i, startDate, endDate); // We call our filter function
    }
    
 /*   if (startDate == '' && endDate == '') {
      
      location.reload();
    }*/
    $('.datatables-basic2').dataTable().fnDraw();
    
  } else {
    $('.datatables-basic2').DataTable().column(i).search(val, false, true).draw();
  }
}
// cambiar estados
 async function cambioSP(id, status) {
 const { value: estado } = await Swal.fire({
  title: 'Seleccione un nuevo Status',
  input: 'select',
  inputOptions: {
      Entregado: 'Entregado',
      Cancelado: 'Cancelado',
      'Por entregar': 'Por entregar',
  },
  inputPlaceholder: 'Seleccione un nuevo Status',
  showCancelButton: true,
  inputValidator: (value) => {
    return new Promise((resolve) => {
      if (value === status) {
        resolve('Debe seleccionar un estado diferente')
      } else {
         resolve()
      }
    })
  }
})

if (estado) {
  console.log(estado)   
  const data_C = new FormData();
  data_C.append("id", id);
  data_C.append("status", estado);
  $.ajax({
    url: `/cambiaS_pedido`,
    type: 'POST',
    data: data_C,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data, textStatus, jqXHR) {
console.log(data)
$('#array_pedido').val(JSON.stringify(data.pedidos_let))
console.log($('#array_pedido').val())

$('.datatables-basic').dataTable().fnDestroy();
 $('.datatables-basic').empty();
$('.datatables-basic').html(`<thead>
<tr>
    <th>Nº Pedido</th>
    <th>Cliente</th>
    <th>Total garrafones</th>
    <th>Monto Total</th>
    <th>Status del Pedido</th>
    <th>Status de Pago</th>
    <th>Fecha</th>
    <th>Opciones</th>
    

<th>oculto choferes </th> 
<th>oculto etiqueta </th> 
</tr>
</thead>`);
$('.datatables-basic2').dataTable().fnDestroy();
$('.datatables-basic2').empty();
$('.datatables-basic2').html(`<thead>
<tr>
    <th>Nº Pedido</th>
    <th>Cliente</th>
    <th>Total garrafones</th>
    <th>Monto Total</th>
    <th>Status del Pedido</th>
    <th>Status de Pago</th>
    <th>Fecha</th>
    <th>Opciones</th>
    

<th>oculto choferes </th> 
<th>oculto etiqueta </th> 
</tr>
</thead>`);

cargaTablas('si')
    },
    error: function (jqXHR, textStatus) {
      console.log('error:' + jqXHR)
    }
  });


// window.location.href = `/cambiaS_pedido/${id}/${estado}`;
}
 }

async function cambioPago(id, status) {
  const { value: estado } = await Swal.fire({
    title: 'Seleccione un nuevo Status',
    input: 'select',
    inputOptions: {
        Pagado: 'Pagado',
        'Por verificar': 'Por verificar',
    },
    inputPlaceholder: 'Seleccione un nuevo Status',
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value === status) {
          resolve('Debe seleccionar un estado diferente')
        } else {
           resolve()
        }
      })
    }
  })
  
  if (estado) {
    //window.location.href = `/cambia_S_pago/${id}/${estado}`;
    console.log(estado)   
    const data_C = new FormData();
    data_C.append("id", id);
    data_C.append("status", estado);
    $.ajax({
      url: `/cambia_S_pago`,
      type: 'POST',
      data: data_C,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data, textStatus, jqXHR) {
  console.log(data)
  $('#array_pedido').val(JSON.stringify(data.pedidos_let))
  console.log($('#array_pedido').val())
  
  $('.datatables-basic').dataTable().fnDestroy();
  $('.datatables-basic').empty();
  $('.datatables-basic').html(`<thead>
                                            <tr>
                                                <th>Nº Pedido</th>
                                                <th>Cliente</th>
                                                <th>Total garrafones</th>
                                                <th>Monto Total</th>
                                                <th>Status del Pedido</th>
                                                <th>Status de Pago</th>
                                                <th>Fecha</th>
                                                <th>Opciones</th>
                                                
                                            
                                            <th>oculto choferes </th> 
                                            <th>oculto etiqueta </th> 
                                            </tr>
                                        </thead>`);
  $('.datatables-basic2').dataTable().fnDestroy();
  $('.datatables-basic2').empty();
  $('.datatables-basic2').html(`<thead>
  <tr>
      <th>Nº Pedido</th>
      <th>Cliente</th>
      <th>Total garrafones</th>
      <th>Monto Total</th>
      <th>Status del Pedido</th>
      <th>Status de Pago</th>
      <th>Fecha</th>
      <th>Opciones</th>
      
  
  <th>oculto choferes </th> 
  <th>oculto etiqueta </th> 
  </tr>
</thead>`);
  
  cargaTablas('si')
      },
      error: function (jqXHR, textStatus) {
        console.log('error:' + jqXHR)
      }
    });
  
  }
}
function edit_pedido(id_edit) {
  if (typeof id_edit =="undefined") {
    return console.log(id_edit)
  }
 //window.location.href = `/editar_pedido/${id_edit2}`;

const data_C = new FormData();
data_C.append("id", id_edit);
$.ajax({
  url: `/editar_pedido`,
  type: 'POST',
  data: data_C,
  cache: false,
  contentType: false,
  processData: false,
  success: function (data, textStatus, jqXHR) {
console.log(data)
if ( $(".chofer option[value='" + data['chofer'] + "']").length == 0 ){
$('.chofer').prepend('<option selected value="' + data['chofer'] + '">' + data['chofer'] + '</option>');  
}else{
  //$('.chofer').find('option:selected').remove().end();
  $(".chofer option[value='" + data['chofer'] + "']").attr("selected", true);
}
$('#id_chofer_edit').val(data['personalId'])
$('#edit_pedido_id').val(data['id'])
$('#edit_pedido_id_cliente').val(data['clienteId'])
let garrafon19L = JSON.parse(data['garrafon19L'])
let garrafon11L = JSON.parse(data['garrafon11L'])
let botella1L = JSON.parse(data['botella1L'])
let botella5L = JSON.parse(data['botella5L'])
console.log(garrafon11L)
console.log(botella1L)
console.log(botella5L)
$('.count_refill_garrafon').val(garrafon19L['refill_cant'])
$('.refill_garrafon_mont').val(garrafon19L['refill_mont'])
$('.count_canje_garrafon').val(garrafon19L['canje_cant'])
$('.canje_garrafon_mont').val(garrafon19L['canje_mont'])
$('.count_enNew_garrafon').val(garrafon19L['nuevo_cant'])
$('.enNew_garrafon_mont').val(garrafon19L['nuevo_mont'])
$('.count_enobsequio_garrafon').val(garrafon19L['enobsequio_cant_garrafon'])
$('.total_garrafon').val(garrafon19L['total_cant'])
$('.cant_garrafon').text(garrafon19L['total_cant'])
$('.monto_garrafon_input').val(garrafon19L['total_cost'])
$('.monto_garrafon').text(garrafon19L['total_cost'])

$('.count_refill_botella').val(botella1L['refill_cant'])
$('.refill_botella_mont').val(botella1L['refill_mont'])
$('.count_canje_botella').val(botella1L['canje_cant'])
$('.canje_botella_mont').val(botella1L['canje_mont'])
$('.count_enNew_botella').val(botella1L['nuevo_cant'])
$('.enNew_botella_mont').val(botella1L['nuevo_mont'])
$('.count_enobsequio_botella').val(botella1L['enobsequio_cant_botella'])
$('.total_botella').val(botella1L['total_cant'])
$('.cant_botella').text(botella1L['total_cant'])
$('.monto_botella_input').val(botella1L['total_cost'])
$('.monto_botella').text(botella1L['total_cost'])

$('.count_refill_garrafon11l').val(garrafon11L['refill_cant'])
$('.refill_garrafon11l_mont').val(garrafon11L['refill_mont'])
$('.count_canje_garrafon11l').val(garrafon11L['canje_cant'])
$('.canje_garrafon11l_mont').val(garrafon11L['canje_mont'])
$('.count_enNew_garrafon11l').val(garrafon11L['nuevo_cant'])
$('.enNew_garrafon11l_mont').val(garrafon11L['nuevo_mont'])
$('.count_enobsequio_garrafon11l').val(garrafon11L['enobsequio_cant_garrafon11l'])
$('.total_garrafon11l').val(garrafon11L['total_cant'])
$('.cant_garrafon11l').text(garrafon11L['total_cant'])
$('.monto_garrafon11l_input').val(garrafon11L['total_cost'])
$('.monto_garrafon11l').text(garrafon11L['total_cost'])

$('.count_refill_botella5l').val(botella5L['refill_cant'])
$('.refill_botella5l_mont').val(botella5L['refill_mont'])
$('.count_canje_botella5l').val(botella5L['canje_cant'])
$('.canje_botella5l_mont').val(botella5L['canje_mont'])
$('.count_enNew_botella5l').val(botella5L['nuevo_cant'])
$('.enNew_botella5l_mont').val(botella5L['nuevo_mont'])
$('.count_enobsequio_botella5l').val(botella5L['enobsequio_cant_botella5l'])
$('.total_botella5l').val(botella5L['total_cant'])
$('.cant_botella5l').text(botella5L['total_cant'])
$('.monto_botella5l_input').val(botella5L['total_cost'])
$('.monto_botella5l').text(botella5L['total_cost'])

$('.total_total_inp').val(data['monto_total'])
$('.total_total').text(data['monto_total'])

if ( $("#metodo_pago_edit option[value='" + data['metodo_pago'] + "']").length == 0 ){
console.log(data['metodo_pago'])
$('#metodo_pago_edit').prepend('<option selected value="' + data['metodo_pago'] + '">' + data['metodo_pago'] + '</option>');  
}else{
//  $('#metodo_pago_edit').find('option:selected').remove().end();
  $("#metodo_pago_edit option[value='" + data['metodo_pago'] + "']").attr("selected", true);
}
$('.status_pago').val(data['status_pago'])
$('#status_pedido_edit').val(data['status_pedido'])
$('#prestados_edit').val(data['garrafones_prestamos'])
$('#danados_edit').val(data['danados'])
$('#descuento_edit').val(data['descuento'])
$('#observacion_edit').val(data['observacion'])
$('#edit_pedido').modal('show')
  },
  error: function (jqXHR, textStatus) {
    console.log('error:' + jqXHR)
  }
});
}