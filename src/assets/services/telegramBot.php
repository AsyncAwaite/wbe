<?php
$token = "1936019184:AAEIyuJFZGCDNaneOvoQDb1gIVNj9XuiSIU";

// $chat_id = "-504167134";
$chat_id = "-1001592542102";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (!empty($_POST['name']) && !empty($_POST['phone'])) {
    if (isset($_POST['name'])) {
      if (!empty($_POST['name'])) {
        $name = strip_tags($_POST['name']);
        $nameFieldset = "Им'я: ";
      }
    }

    if (isset($_POST['phone'])) {
      if (!empty($_POST['phone'])) {
        $phone = strip_tags($_POST['phone']);
        $phoneFieldset = "Телефон: ";
      }
    }
    if (isset($_POST['textarea'])) {
      if (!empty($_POST['textarea'])) {
        $textarea = strip_tags($_POST['textarea']);
        $textareaFieldset = "Коментар: ";
      }
    }

    $arr = array(
      $nameFieldset => $name,
      $phoneFieldset => $phone,
      $textareaFieldset => $textarea
    );
    foreach ($arr as $key => $value) {
      $txt .= "<b>" . $key . "</b> " . $value . "%0A";
    };
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");
  }
}
