<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
<div> POST is
 <?php
echo $_POST;
?> </div>
<div> Content: <ul>
<?php
foreach ($_POST as $k => $post)
  echo "<li>" . "key: " . $k . " value: " . $post . "</li>";
 ?>
</ul></div>
<div> GET is
 <?php
echo $_GET;
?> </div>
<div> Content: <ul>
<?php
foreach ($_GET as $k => $post)
  echo "<li>" . "key: " . $k . " value: " . $post . "</li>";
 ?>
</ul></div>
<div> REQUEST is
 <?php
echo $_REQUEST;
?> </div>
<div> Content: <ul>
<?php
foreach ($_REQUEST as $k => $post)
  echo "<li>" . "key: " . $k . " value: " . $post . "</li>";
 ?>
</ul></div>
<div> FILES is
 <?php
echo $_FILES;
?> </div>
<div> Content: <ul>
<?php
foreach ($_FILES as $k => $file)
  echo "<li>" . "key: " . $k . " value: <ul>" ;
  foreach ($file as $k => $post)
    echo "<li>" . "key: " . $k . " value: " . $post . "</li>" ;
  echo "</ul>";
 ?>
</ul></div>
<div> Server is
 <?php
echo $_SERVER;
?> </div>
<div> Content: <ul>
<?php
foreach ($_SERVER as $k => $post)
  echo "<li>" . "key: " . $k . " value: " . $post . "</li>";
 ?>
</ul></div>

 </body>
</html>
