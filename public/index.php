<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="../front/css/style.css">
  <title>Sign up / sign in</title>
</head>

<body>
  <!-- <section>
    <h2 id="form-title">Sign up</h2>
    <form id="signup-form" method="POST" action="" aria-labelledby="form-title" autocomplete="off">
  
      <label for="name">Name<span aria-hidden="true">*</span></label>
      <div>
        <input type="text" class="input-field" name="name" aria-required="true">
        <span class="error-message"></span>
      </div>
  
      <label for="surname">Surname<span aria-hidden="true">*</span></label>
      <div>
        <input type="text" class="input-field" name="surname" aria-required="true">
        <span class="error-message"></span>
      </div>
  
      <label for="email">Email<span aria-hidden="true">*</span></label>
      <div>
        <input type="email" class="input-field" name="email" autocomplete="email" aria-required="true">
        <span class="error-message"></span>
      </div>
  
      <label for="password">Password<span aria-hidden="true">*</span></label>
      <div>
        <input type="password" class="input-field" name="password" autocomplete="new-password" aria-required="true">
        <span class="error-message"></span>
      </div>
      <span id="form-feedback"></span>
      <input type="submit" value="Enviar">
    </form>
  </section> -->
  <section>
  <h2 >Sign in</h2> 
    <form id="signin-form" method="POST" action="" aria-labelledby="form-title" autocomplete="off">
      <label for="email">Email<span aria-hidden="true">*</span></label>
      <div>
        <input type="email" class="input-field" name="email" autocomplete="email" aria-required="true">
        <span class="error-message"></span>
      </div>
  
      <label for="password">Password<span aria-hidden="true">*</span></label>
      <div>
        <input type="password" class="input-field" name="password" autocomplete="new-password" aria-required="true">
        <span class="error-message"></span>
      </div>
      <span id="form-feedback"></span>
      <input type="submit" value="Enviar">
    </form>
  </section>
  <script type="module" src="../front/js/main.js"></script>
</body>

</html>