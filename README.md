# APIs-RESTful-Symfony-3-Javascript
Es una edición de tareas totalmente funcional y gratuita. Puede usarlo como base para sus proyectos web de Symfony 3, si estas creando una API. O pegarle un vistazo a la hoja frontend.php, donde esta el consumidor en Javascript sin Jquery u otras librerías.

### La arquitectura:

El Javascript pide al servidor los datos.
El servidor en Symfony 3.3.13, se conecta a una base de datos (MySQL), gestiona lo que necesita (Alta, Baja, Lista y Modificaciones) y lo deja disponía en una matriz JSON junto con los códigos de estado y su mensaje correspondiente (ej: 204 No Content).
El consumidor, muy sencillo en Javascript, lo muestra con un poquito de ayuda del CSS3 para que sea bonito.

### Funciones:

El consumidor dispone de un campo para ingresar nuevos datos. Estos datos deben estar entre >20 y <50 caracteres. Pero tampoco puede existir el registro previamente. O sea, no duplicados.
También, puedes actualizar un dato existente. Simplemente presiona sobre el registro que deseas editar, escribe lo que quieras y presiona fuera para que se guarde.
Ya se efectuó la tarea, así que puedes eliminarla presionando en la x del registro.
Si detectas un error, sabe cómo mejorarlo o si tiene una idea sobre esta edición, por favor, ¡escríbela!
