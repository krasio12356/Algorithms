<?php
function begintop($name)
{
    $application = "Algorithms";
    $contents = file_get_contents("Layout.html");
    if ($name !== "index")
    {
        $contents = str_replace($application, $name, $contents);
    }
    $position = strpos($contents, "@@@RenderBody@@@");
    echo substr($contents, 0, $position);
}

function endbottom()
{
    $contents = file_get_contents("Layout.html");
    $position = strpos($contents, "@@@RenderBody@@@") + strlen("@@@RenderBody@@@");
    echo substr($contents, $position);
}
?>