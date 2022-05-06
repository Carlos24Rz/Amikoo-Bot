<?php
  session_start();

  if (!isset($_SESSION["username"])) {
    header("location: index.php");
    exit();
  }

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />

    <script
      src="https://kit.fontawesome.com/96bb550736.js"
      crossorigin="anonymous"
    ></script>
    <link href="./css/crudPersonas.css" rel="stylesheet" />
    <title>Chatbot</title>
  </head>
  <body>
    <header class="header">
      <div class="logo-box">
        <a href="#">
          <img
            class="logo-crud"
            loading="lazy"
            src="img/naatik-header.png"
            alt="Logo Naatik"
          />
        </a>
        <p class="title-header-crud">Naatik chatbot CRUD</p>
      </div>

      <nav class="nav">
        <ul class="nav-list">
          <li><a class="nav-link" href="./crudPreguntas.php">Preguntas</a></li>
          <li><a class="nav-link nav-link-current" href="./crudPersonas.php">Personas</a></li>
          <li><a class="nav-link" href="./crudCalificaciones.php">Calificaciones</a></li>
          <li><a class="nav-link" href="includes/logout.inc.php">Log out</a></li>
        </ul>
      </nav>

      <button class="btn-mobile-nav">
        <i class="icon-mobile-nav fa-solid fa-bars" name="menu-outline"></i>
        <i class="icon-mobile-nav fa-solid fa-xmark" name="close-outline"></i>
      </button>
    </header>

    <main>
      <section class="section-search">
        <div class="search-box">
          <div class="btn-search btn-search--user">
            <input
              id="user-input"
              class=""
              type="text"
              name=""
              placeholder="Buscar por nombre"
            />
            <button id="btn-user">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div class="btn-search btn-search--email">
            <input
              id="email-input"
              class=""
              type="text"
              name=""
              placeholder="Buscar por correo"
            />
            <button id="btn-email">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div class="container-btn-extra">
            <button class="btn-all-users">Todas las personas</button>
          </div>

          <div class="container-btn-extra">
            <button class="btn-clear">Limpiar</button>
          </div>
        </div>
      </section>

      <section class="section-data">
        <div class="container-table">
          <div class="grid-row grid-row--header">
            <div class="grid-item grid-item--id">Id</div>
            <div class="grid-item grid-item--nombre">Nombre</div>
            <div class="grid-item grid-item--correo">Correo</div>
            <div class="grid-item grid-item--fecha">Tiempo</div>
            <div class="grid-item grid-item--descripcion">Descripcion</div>
            <div class="grid-item grid-item--botones">Botones</div>
          </div>
          <div class="container-database-info"></div>
        </div>
      </section>
    </main>

    <script src="./js/crudPersonas.js"></script>
  </body>
</html>
