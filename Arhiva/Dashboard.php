<!DOCTYPE html>
<html>
    <head>
        <title>My Project</title>
        <link rel="stylesheet" href="styles.css?v=<?php echo time(); ?>">
        <script src="announcementscript.js"></script>
       
<!--include("anouncement.php");-->

    </head>

    <body>
        <div class="sidebar">
            <img src="resources/Temp family pic.jpg" width="100%"/>
            <ul>
                <li><a id="active" href="Dashboard.php">Dashboard</a></li>
                <li>To Do's</li>
                <li><a href="Calendar.html">Calendar</a></li>
                <li>Shopping list</li>
                <li><a href="Recipes.html">Recipes</a></li>
                <li>Bucket List</li>
                <li><a href="Expenses.php">Expenses</a></li>
                <li><a href = "/emm/buget.html"> Budget</a></li>
                
            </ul>
        </div>
        <div class="announcement">
            <h2>Announcements</h2>
            <table id="anounceTable">
                <tr>
                    <td>
                        <form method="POST" action="/prj/intarzii.php">
                        <input type="submit" name="intarzii" id="submit" value="Intarzii">
                        </form>
                    </td>
                    <td>
                        <button id="cumparaturi" value="Cumparaturi" onclick="Cumparaturi()">Cumparaturi</button>
                    </td>
                    <td>
                        Trafic
                    </td>
                    <td>
                        Eu gatesc
                    </td>
                    <td>
                        Am dus gunoiul
                    </td>
                    <td>
                        ...
                    </td>
                </tr>
                    </table>            
            <br>
            <br>


            <table id="anounceTable_DB">
                <tr>
                    <th>Data si Ora</th>
                    <th>Nume</th>
                    <th>Anunt</th>
                </tr>

                    <?php
                        if(is_array($fetchData)){      
                        $sn=1;
                        foreach($fetchData as $data){
                    ?>

                <tr>
                    <td>
                        <?php echo $data['DataSiOra']??''; ?>
                    </td>
                    <td>
                        <?php echo $data['Nume']??''; ?>
                    </td>
                    <td>
                        <?php echo $data['anunt']??''; ?>
                    </td>
                </tr>
                    <?php $sn++;}}else{ ?>
                <tr>
                    <td colspan="3">
                        <?php echo $fetchData; ?>
                    </td>
                <tr>
                        <?php }?>
            </table>
        </div>
    </body>
</html>