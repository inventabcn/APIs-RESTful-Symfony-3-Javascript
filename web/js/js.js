  var apiUrl = 'http://localhost:8000/' // la url de la API


  // configuracion de id en html
  const form = document.querySelector('form')
  const input = document.getElementById('name')
  const message = document.getElementById('message')
  const todosList = document.querySelector('.todosList')
  const todosListSpan = document.getElementById('list_group').getElementsByTagName("span");
  let granList = []; // todos los datos
  var idUpdate; // ultimo id actualizado
  var idRemove; // ultimo id borrado
  var MensajeAlertCont = 0; // contador de mensajes

  form.addEventListener("submit", create)

  function yaExisteFunction(comprobar, id = 0) {
    var firstObj = granList.filter(function (name) { return name == comprobar; });
    if(firstObj.length > 0){
      for(x=0; x<firstObj.length; x++) {
        if( (firstObj[x].id != id) && (firstObj[x].name.length == comprobar.length) && (firstObj[x].name.indexOf(comprobar) != -1) ) {
          MensajeAlert('warning','Error: Ya existe ' + comprobar + ' en la lista');
          delete comprobar;
          return false;
        }
      }
    }
    delete comprobar;
    return true;
  }

  function longitud(comprobar){
    if(comprobar == "" || typeof comprobar == "undefined" || comprobar.length < 20 || comprobar.length > 50) {
      MensajeAlert('warning','Error: Necesito más de 20 caracteres y menos de 50');
      delete comprobar;
      return false;
    }
    delete comprobar;
    return true;
  }
  function alertSetTimeout(MensajeAlertContId = null){
    if(MensajeAlertContId != null) {
      window.setTimeout(function() {
         document.getElementById(MensajeAlertContId).remove();
      }, 5000);
    }
  }
  // info
  // success
  // warning
  function MensajeAlert(type,mensaje) {
    MensajeAlertCont++;
    var m = document.createElement("div")
    var MensajeAlertContId = 'MensajeAlertCont_'+MensajeAlertCont;
    m.setAttribute("id", MensajeAlertContId)
    m.innerHTML = '<div class="alert alert-' + type + ' fade in"><a href="#" class="close" data-dismiss="alert">&times;</a>' + mensaje + '</div>';
    m.addEventListener('click', alertRemove);
    message.appendChild(m);
    alertSetTimeout(MensajeAlertContId)
  }
  function alertDelete(idremove){
    document.getElementById(idremove).remove();
  }
  function alertRemove(event){
    event.preventDefault();
    var target = event.target;
    parent = target.parentElement;
    var idremove = parent.parentNode.getAttribute('id');
    alertDelete(idremove);
  }
  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      viewStatus(response.status)
      return Promise.resolve(response)
      //return true
    } else {
      viewStatus(response)
      return false
    }
  }

  function viewStatus(s){
    switch (s) {
      case 200:
          MensajeAlert('success', 'Listo! Código 200' );
        break;
      case 201:
          MensajeAlert('success', 'Hecho! Código 201' );
        break;
      case 302:
          MensajeAlert('info', 'Sin datos, Código 302' );
        break;
      case 400:
          MensajeAlert('warning', 'Petición Incorrecta, Código 400' );
        break;
      case 404:
          MensajeAlert('warning', 'No se encuentra la página, Código 404' );
        break;
      case 406:
          MensajeAlert('warning', 'Valores Null no se pueden enviar, Código 406' );
        break;
      default:
          MensajeAlert('info', s.status + ' ' + s.statusText );
        break;
    }
  }

  function json(response) {
    return response.json()
  }

  function create(event){
    event.preventDefault();
    var largo = longitud(input.value);
    var yaExiste = yaExisteFunction(input.value);
    if( largo === true && yaExiste === true ) {
      fetch(apiUrl,{
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type':'application/json'
        },
        body: JSON.stringify({name:input.value})
      })
      .then(status)
      .then(json)
      .then(li)
      .then(function(data){
        granList = granList,data;
        test();
        input.value = ''
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
    }else{
      input.value = ''
      return false
    }
  }

  function updateList(event){
    event.preventDefault();
    idUpdate = event.target.getAttribute("data-id")
    document.getElementById('texto-'+idUpdate).classList.remove('error-item');
    var puntero = 0;
    var viejoName = '';
    if (undefined !== granList && granList.length) {
      for (x = 0; x < granList.length; x++) {
        if( granList[x].id == idUpdate) {
          viejoName = granList[x].name;
          puntero = x;
        }
      }
      if(event.target.innerText != viejoName && puntero != 0){
        var largo = longitud(event.target.innerText);
        var yaExiste = yaExisteFunction(event.target.innerText, idUpdate);
        if( largo === true && yaExiste === true ) {
          fetch(apiUrl+idUpdate,{
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-type':'application/json'
            },
            body: JSON.stringify({name:event.target.innerText})
          })
            .then(status)
            .then(json)
            .then(function(response){
              if( granList[puntero].id == idUpdate) {
                granList[puntero].name = response.name;
              }
              test();
            })
        }else{
          document.getElementById('texto-'+idUpdate).innerHTML = granList[puntero].name;
          document.getElementById('texto-'+idUpdate).className += " error-item";
        }
      }
    }
  }

  function li(datos){
    var l = document.createElement("li")
    var a = document.createElement("a")
    a.innerHTML = '&times;'
    a.addEventListener("click", removeIdList)
    a.title = "Eliminar tarea";
    a.setAttribute("data-id", datos.id)
    l.appendChild(a)
    var span = document.createElement("span")
    span.setAttribute("contenteditable", true)
    span.setAttribute("data-id", datos.id)
    span.setAttribute("id", "texto-"+datos.id)
    span.innerHTML = datos.name
    span.title = "Presiona dentro para Editar y fuera para grabar";
    span.addEventListener("blur", updateList)
    l.appendChild(span)
    todosList.appendChild(l)
  }

  function removeIdList(event){
    event.preventDefault()
    idRemove = event.target.getAttribute("data-id");
    if(idRemove % 1 == 0 && idRemove != null && idRemove !== "") {
      fetch(apiUrl+idRemove, {method: 'DELETE'})
        .then(status)
        .then(function(){
          todosList.removeChild(event.target.parentNode)
          for(x=0; x<granList.length; x++) {
            if( granList[x].id == idRemove) {
              granList.splice(x, 1);
            }
          }
          test();
          MensajeAlert('success','eliminado ok');
        })
        .catch(function(error) {
          MensajeAlert('warning',error);
        });
     } else {
      MensajeAlert('warning','No es un id de la lista');
      return false;
    }
  }

  function listado(){
    fetch(apiUrl, {mode: 'cors'})
      .then(status)
      .then(json)
      .then(function(todosList){
        todosList.forEach(li)
        granList = todosList;
        test();
        MensajeAlert('info','Items en Total: ' + todosList.length);
      })
      .catch(function(error) {
        MensajeAlert('warning','Error: ' + error);
      });
  }

  function test(){
    // for(x=0; x<granList.length; x++) {console.log('dato:', granList[x].id + ' / ' + granList[x].name + ' / ' + x);
    // }
  }

  function preloader() {
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('page').style.display = 'block';
  }
   window.onload = function() {
    preloader();
    listado();
  };