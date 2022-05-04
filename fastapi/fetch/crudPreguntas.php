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
    <link href="./css/crudPreguntas.css" rel="stylesheet" />
    <title>Chatbot</title>
  </head>
  <body>
    <?php
      include_once 'includes/header.php';
    ?>

    <main>
      <section class="section-search">
        <div class="search-box">
          <div class="container-btn-extra">
            <button class="btn-crear-nueva-pregunta">
              Crear nueva pregunta
            </button>
          </div>
          <div class="btn-search">
            <input id="nombre-input" class="" type="text" name=""
            placeholder="Search by nombre"">
            <button id="btn-nombre">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div class="container-btn-extra">
            <button class="btn-all-preguntas">Todas las preguntas</button>
          </div>

          <div class="container-btn-extra">
            <button class="btn-clear">Clear</button>
          </div>
        </div>
      </section>

      <section class="section-data">
        <div class="container-table">
          <div class="grid-row grid-row--header">
            <div class="grid-item grid-item--id">Id</div>
            <div class="grid-item grid-item--padre-id">Padre id</div>
            <div class="grid-item grid-item--nombre">Nombre</div>
            <div class="grid-item grid-item--emoji">Emoji</div>
            <div class="grid-item grid-item--texto">Texto</div>
            <div class="grid-item grid-item--visitas">Visitas</div>
            <div class="grid-item grid-item--is-final">Is final</div>
            <div class="grid-item grid-item--botones">Botones</div>
          </div>
          <div class="container-database-info"></div>
        </div>
      </section>
    </main>

    <script src="./js/crudPreguntas.js"></script>

    <!--  -->
    <!--  -->
    <!--  -->
    <!-- <div class="backdrop"></div> -->
    <!-- <div class="modal">
      <header class="modal-header"><h2>${title}</h2></header>

      <div class="modal-content">
        <div class="modal-row-input">
          <label for="id-input">Id</label>
          <input id="id-input" type="text" placeholder="" />
        </div>
        <div class="modal-row-input">
          <label for="padre-input">Padre</label>
          <input id="padre-input" type="text" placeholder="" />
        </div>
        <div class="modal-row-input">
          <label for="nombre-pregunta-input">Nombre</label>
          <input id="nombre-pregunta-input" type="text" placeholder="" />
        </div>
        <div class="modal-row-input">
          <label for="emoji-input">Emoji</label>
          <input id="emoji-input" type="text" placeholder="" />
        </div>
        <div class="modal-row-input">
          <label for="texto-input">Texto</label>
          <input id="texto-input" type="text" placeholder="" />
        </div>
      </div>

      <footer class="modal-actions">
        <button id="btn-modal-cancelar">Cancelar</button>
        <button id="btn-modal-actualizar">Actualizar</button>
      </footer>
    </div> -->
  </body>
</html>