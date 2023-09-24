<?php
if ($_POST['coupon'] && $_POST['mobile'] && $_POST['coupon'] !== "" && $_POST['mobile'] !== "") {
    $mobile = $_POST["mobile"];
    $coupon = $_POST["coupon"];
    
    // Example validation (dummy)
    if ($coupon === "SPECIAL10") {
        $couponResult = "Coupon code accepted!";
        $celebrationImage = "celebrations.jpg"; // Image filename
        if($mobile === "7731851857"){
          $name = "Jwala Sri";
          $celebrationText = "Congratulations ".$name."! You've unlocked a special discount. Rs.3200 will be credited to your Pranay Funds account within 24 hours.";
        }elseif($mobile === "8074004889"){
          $name = "Sahithi";
          $celebrationText = "I Know ".$name."! You've also unlocked a special discount. Rs.1100 will be credited to your Pranay Funds account within 24 hours. You are our golden customer. Let's cover the remaining in returns.";
        }else{
          $name = "User";
          $celebrationText = "Sorry, you don't have any coupon right now.";
        }
    } else {
        $couponResult = "Coupon code is invalid.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
    :root {
        --primary: #ffa500;
        --secondary: #ff6347;
        --light: #f5f5f5;
        --dark: #000000;
    }
    </style>
    <title>Pranay Funds Coupon Result</title>
</head>

<body class="bg-light flex justify-center items-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold mb-4">Pranay Funds Coupon Result</h1>
        <div class="p-4 bg-primary rounded">
            <img src="../assets/img/gift-and-letter.png" alt="Celebrations" class="w-30 h-30 mx-auto mb-3" />
            <p class="text-light"><?php echo $couponResult; ?></p>
            <?php if (isset($celebrationText)): ?>
            <div class="bg-secondary p-3 mt-4 rounded text-light">
                <?php echo $celebrationText; ?>
            </div>
            <?php endif; ?>
        </div>
    </div>
</body>

</html>