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
    <?php
      include_once 'includes/header.php';
    ?>

    <main>
      <section class="section-search">
        <div class="search-box">
          <div class="btn-search btn-search--user">
            <input id="user-input" class="" type="text" name=""
            placeholder="Search by user"">
            <button id="btn-user">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div class="btn-search btn-search--email">
            <input id="email-input" class="" type="text" name=""
            placeholder="Search by email"">
            <button id="btn-email">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div class="container-btn-extra">
            <button class="btn-all-users">Todas las personas</button>
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

    <!--  -->
    <!--

      sdsd
      ds
      ds
      ds
      ds
      ds
      ds
      ds
      -->
    <!--  -->
    <!--  -->

    <div class="examples">
      <button type="button" class="btn btn-primary mr-4" id="clearText">
        Clear
      </button>
      <button type="button" class="btn btn-danger mr-4" id="getText">
        Get Text
      </button>
      <button
        type="button"
        class="btn btn-danger mr-4 grid-button"
        id="getBoton"
      >
        Test
      </button>
      <div class="request" id="Preguntas">
        <p>Get FastAPI Test</p>
        <input
          type="text"
          class="inputFast"
          id="getUserName"
          placeholder="User"
        />
        <input
          type="text"
          class="inputFast"
          id="getUserEmail"
          placeholder="Email"
        />
        <button type="button" class="btn btn-danger mr-4" id="getUsers">
          Get Users
        </button>
      </div>
      <!-- <button type="button" class="btn btn-danger mr-4" id="getPosts">Get Post</button> -->
    </div>

    <h1 class="">Personas</h1>

    <div class="grid-container">
      <div class="grid-row">
        <div class="grid-item grid-id">Id</div>
        <div class="grid-item grid-name">Nombre</div>
        <div class="grid-item grid-email">Correo</div>
        <div class="grid-item grid-time">Tiempo</div>
        <div class="grid-item grid-description">Descripcion</div>
        <div class="grid-item grid-button-box">Botones</div>
      </div>
      <!-- <div class="grid-row">
      <div class="grid-item grid-id">1</div>
      <div class="grid-item grid-name">Juan</div>
      <div class="grid-item grid-email">juanito200@gmail.com</div>
      <div class="grid-item grid-time">2022-04-21T18:09:44</div>
      <div class="grid-item grid-description">Como se hace ...</div>
      <div class="grid-item grid-button-box">
        <button type="button" class="btn btn-warning">Update</button>
        <button type="button" class="btn btn-danger">Delete</button>
      </div>
    </div> -->
      <div id="grid-output"></div>
    </div>

    <div id="output"></div>

    <script src="./js/crudPersonas.js"></script>
  </body>
</html>
