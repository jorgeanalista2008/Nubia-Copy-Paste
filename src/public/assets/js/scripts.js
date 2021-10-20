$(document).ready(function () {
  const subirImagen = (event) => {
    const archivos = event.target.files;
    const data = new FormData();

    console.log(archivos)
    data.append("archivo", archivos[0]);
    //$("#loading").show()
    //$("#info-drop").hide()
    
    $.ajax({
      url: '/upload',
      type: 'POST',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      xhr: function () {        
          var xhr = $.ajaxSettings.xhr();
          xhr.upload.onprogress = function (event) {
            var perc = Math.round((event.loaded / event.total) * 100);
            // $("#nombreArchivoCalendario1").text(inputFile.name);
             
            $("#progressBar1").text(perc + '%');
            $("#progressBar1").css('width', perc + '%');
          };
          return xhr;
      },
      beforeSend: function (xhr) {
        //displayLoading()
        $("#progressBar1").text('0%');
        $("#progressBar1").css('width', '0%');
      },
      success: function (data, textStatus, jqXHR)
      {      
        //$("#loading").hide()
        $("#progressBar1").addClass("progress-bar-success");
        $("#progressBar1").text('100% - Carga realizada');
        console.log(data)
        $('#voucher').val(archivos[0].name);
      },
      error: function (jqXHR, textStatus) { 
          $("#progressBar1").text('100% - Error al cargar el archivo');
          $("#progressBar1").removeClass("progress-bar-success");
          $("#progressBar1").addClass("progress-bar-danger");
      }
  });

  };

  const img1 = document.getElementById("img1");
  img1.addEventListener("change", (event) => {
      const file = img1.files[0];

      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        alert("Elige un archivo válido (.png, .jpg, .jpeg)");
        return;
      }

      const reader = new FileReader();
     // reader.addEventListener("load", displayFileInfo);
      reader.readAsDataURL(file);
      console.log(file);
      subirImagen(event);
  });
});
