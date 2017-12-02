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

# APIs-RESTful-en-Symfony-3-Consumidor-Javascript

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

### Instalando la aplicación

Si dispones de acceso a SSH (Terminal, cmd) y los datos de MySQL, empecemos el resto es fácil.

Debes tener Composer instalador globalmente. Si utilizas Linux o Mac OS X, ejecuta los siguientes comandos:

```bash
$ curl -sS https://getcomposer.org/installer | php
$ sudo mv composer.phar /usr/local/bin/composer
```

Si utilizas Windows, descárgate el [instalador ejecutable de Composer](https://getcomposer.org/download) y sigue los pasos indicados por el instalador.

Una vez instalado **Composer**, ejecuta los siguientes comandos para descargar e instalar la aplicación:

```bash
# clona el código de la aplicación
$ cd proyectos/
$ git clone git clone git://github.com/inventabcn/APIs-RESTful-Symfony-3-Javascript.git

# instala las dependencias del proyecto (incluyendo Symfony)
$ cd APIs-RESTful-Symfony-3-Javascript/
$ composer install
```

Personalizar la hoja de ajustes:

```bash
$ nano app/config/parameters.yml
```
	database_driver pdo_mysql
	database_host: xxx
	database_port: xxx
	database_name: xxx
	database_user: xxx
	database_password: xxx
	mailer_transport: smtp
	mailer_host: xxx
	mailer_user: xxx
	mailer_password: xxx
	locale: de
	secret: xxx


Instalar la base de datos con los siguientes comandos:

$ php bin/console doctrine:database:create
$ php bin/console doctrine:schema:create
$ php bin/console doctrine:fixtures:load

### Probando la aplicación

La forma más sencilla de probar la aplicación, ejecuta el siguiente comando, que arranca el servidor web interno de PHP y hace que tu aplicación se pueda ejecutar sin necesidad de usar Apache o Nginx:

```bash
$ php app/console server:run
Server running on http://localhost:8000
```

Ahora ya puedes abrir tu navegador y acceder a `http://localhost:8000` para probar la aplicación.

El comando anterior requiere PHP 5.4. Si utilizas una versión anterior de PHP, tendrás que configurar un *virtual host* en tu servidor web.

### Solución a los problemas comunes

Lo primero es borrar la caché de la aplicación, ejecutando los siguientes comandos:

Opción 1

$ php bin/console cache:clear
$ php bin/console cache:clear --env=prod
$ php bin/console cache:clear --env=acceptance

Opción 2

  * Entorno de desarrollo: `rm -rf var/cache`

Opción 3

Si aún así siguen persistiendo los errores, la solución es borrar completamente los directorios dentro de `var/cache/` desde FTP.

**1. Si solamente ves una página en blanco**, es posible que se trate de un problema de permisos. Una solución rápida puede ser ejecutar el siguiente comando:

```bash
$ cd APIs-RESTful-Symfony-3-Javascript
$ chmod -R 777 var/cache var/logs
```

**2. Si ves un error relacionado con la base de datos**, es posible que tu instalación de PHP no tenga instalada o activada la extensión para SQLite.

Para facilitar la instalación de la aplicación, SQLite se usa por defecto. Si prefieres usar una base de datos como MySQL, sigue estos pasos:

  1. Edita el archivo `app/config/parameters.yml` comentando todo lo relacionado
     con SQLite y descomentando todo lo relacionado con MySQL.
  2. Edita el archivo `app/config/config.yml` y en la sección `dbal`, comenta
     todo lo relacionado con SQLite y descomenta todo lo relacionado con MySQL.
  3. Ejecuta los siguientes comandos para crear la base de datos y rellenarla
     con datos de prueba:

```bash
$ php bin/console doctrine:database:create
$ php bin/console doctrine:schema:create
$ php bin/console doctrine:fixtures:load

# si este último comando da error, ejecuta en su lugar:
$ php bin/console doctrine:fixtures:load --append

# si estás desarrollando la aplicación desde cero, ejecuta lo siguiente
# para cargar los datos de prueba simplificados que no utilizan la seguridad
$ php bin/console doctrine:fixtures:load --fixtures=app/Resources
```

Frontend
--------

  * URL:
    * Entorno de desarrollo: `http://localhost:8000/frontend.php`
    * Entorno de producción: `http://localhost:8000/app.php/frontend.php`

Backend
-------

  * URL:
    * Entorno de desarrollo: `http://localhost:8000/`
    * Entorno de producción: `http://localhost:8000/app.php/`


