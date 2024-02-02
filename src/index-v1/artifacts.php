<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Izi Crawler Build Artifacts</title>
</head>

<body>
    <h1>Izi Crawler Build Artifacts</h1>
        <?php
            // Get the list of files in the current directory
            $files = scandir('./');

            // Exclude '.' and '..' from the list
            $files = array_diff($files, array('.', '..'));

            // Exclude specific files (index.html and artifacts.php)
            $excludeFiles = array('index.html', 'artifacts.php');
            $files = array_diff($files, $excludeFiles);

            // Sort files based on modification time (newest first)
            usort($files, function($a, $b) {
                return filemtime($b) - filemtime($a);
            });

            // Display each file with its modification time
            foreach ($files as $file) {
                $filePath = "./$file";
                $fileTime = date("F d Y H:i:s.", filemtime($filePath));
                echo "<li><a href=\"$file\">$file</a> (Created: $fileTime)</li>";
            }
        ?>

</body>

</html>