//MASINA 1
function Modif_Car1_name(){
    var a = prompt("Masina:");
    if( a === null || a === ""){
        alert("Introdu numele masinii");
        return;
    }
    document.getElementById("car1_name").value = a;
}

function Modif_Car1_Asigurare(){
    var a = prompt("Data la care ai facut asigurarea (dd/mm/yyyy)");
    var b = prompt ("Pe ce perioada ai facut asigurarea (luni)");
    var c = prompt ("Cat a costat? (RON)");
  
    if(a === null || a === "" || b === null || b === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }
   
    if(b==!null){
        var b = parseInt(b);
    }

    if(c==!null){
        var c = parseInt(c);
    }

    document.getElementById("car1_Asigurare_Data_txtbox").value=a;
    document.getElementById("car1_Asigurare_Perioada_txtbox").value=b;
    document.getElementById("car1_Asigurare_RON_txtbox").value=c;
}

function Modif_Car1_ITP(){
    var a = prompt("Data la care ai facut ITP (dd/mm/yyyy)");
    var b = prompt ("Valabilitate (luni)");
    var c = prompt ("Cat a costat? (RON)");

    if(a === null || a === "" || b === null || b === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(b==!null){
        var b = parseInt(b);
    }
    if(c==!null){
        var c = parseInt(c);
    }

    document.getElementById("car1_ITP_Data_txtbox").value=a;
    document.getElementById("car1_ITP_Perioada_txtbox").value=b;
    document.getElementById("car1_ITP_RON_txtbox").value=c;
}

function Modif_Car1_Rovigneta(){
    var a = prompt("Data la care ai facut Rovigneta (dd/mm/yyyy)");
    var b = prompt ("Valabilitate (luni)");
    var c = prompt ("Cat a costat? (RON)");
 
    if(a === null || a === "" || b === null || b === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(b==!null){
        var b = parseInt(b);
    }
    if(c==!null){
        var c = parseInt(c);
    }

    document.getElementById("car1_Rovigneta_Data_txtbox").value=a;
    document.getElementById("car1_Rovigneta_Perioada_txtbox").value=b;
    document.getElementById("car1_Rovigneta_RON_txtbox").value=c;

}


//MASINA 2
function Car2_add(){
    document.getElementById('tabMasina2').style.display = 'table';
}
function Car2_visible(){
    var a = document.getElementById("car2_name").value;
    if(a !==""){      
    document.getElementById('tabMasina2').style.display = 'table';
    document.getElementById('car2_add').style.display = 'none';

}
}

function Modif_Car2_name(){
    var a = prompt("Masina:");
    if( a === null || a === ""){
        alert("Introdu numele masinii");
        return;
    }
    document.getElementById("car2_name").value = a;
}

function Modif_Car2_Asigurare(){
    var a = prompt("Data la care ai facut asigurarea (dd/mm/yyyy)");
    var b = prompt ("Pe ce perioada ai facut asigurarea (luni)");
    var c = prompt ("Cat a costat? (RON)");
  
    if(a === null || a === "" || b === null || b === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(b==!null){
        var b = parseInt(b);
    }
    if(c==!null){
        var c = parseInt(c);
    }

    document.getElementById("car2_Asigurare_Data_txtbox").value=a;
    document.getElementById("car2_Asigurare_Perioada_txtbox").value=b;
    document.getElementById("car2_Asigurare_RON_txtbox").value=c;
}

function Modif_Car2_ITP(){
    var a = prompt("Data la care ai facut ITP (dd/mm/yyyy)");
    var b = prompt ("Valabilitate (luni)");
    var c = prompt ("Cat a costat? (RON)");

    if(a === null || a === "" || b === null || b === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(b==!null){
        var b = parseInt(b);
    }
    if(c==!null){
        var c = parseInt(c);
    }

    document.getElementById("car2_ITP_Data_txtbox").value=a;
    document.getElementById("car2_ITP_Perioada_txtbox").value=b;
    document.getElementById("car2_ITP_RON_txtbox").value=c;
}

function Modif_Car2_Rovigneta(){
    var a = prompt("Data la care ai facut Rovigneta (dd/mm/yyyy)");
    var b = prompt ("Valabilitate (luni)");
    var c = prompt ("Cat a costat? (RON)");
 
    if(a === null || a === "" || b === null || b === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(b==!null){
        var b = parseInt(b);
    };
    if(c==!null){
        var c = parseInt(c);
    };

    document.getElementById("car2_Rovigneta_Data_txtbox").value=a;
    document.getElementById("car2_Rovigneta_Perioada_txtbox").value=b;
    document.getElementById("car2_Rovigneta_RON_txtbox").value=c;

}

//CASA

function Modif_Curent(){
    var a = prompt("Data la care ai platit curentul (dd/mm/yyyy)");
    var c = prompt ("Cat ai platit (RON)");
  
    if(a === null || a === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(c==!null){
        var c = parseInt(c);
    };

    document.getElementById("Curent_Data_txtbox").value=a;
    document.getElementById("Curent_RON_txtbox").value=c;
}

function Modif_Gaz(){
    var a = prompt("Data la care ai platit gazul (dd/mm/yyyy)");
    var c = prompt ("Cat ai platit (RON)");
  
    if(a === null || a === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(c==!null){
        var c = parseInt(c);
    };

    document.getElementById("Gaz_Data_txtbox").value=a;
    document.getElementById("Gaz_RON_txtbox").value=c;
}

function Modif_Apa(){
    var a = prompt("Data la care ai platit apa (dd/mm/yyyy)");
    var c = prompt ("Cat ai platit (RON)");
  
    if(a === null || a === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(c==!null){
        var c = parseInt(c);
    };

    document.getElementById("Apa_Data_txtbox").value=a;
    document.getElementById("Apa_RON_txtbox").value=c;
}


//Entertainment

function Modif_Telefon1(){
    var a = prompt("Data la care ai platit Telefonul 1 (dd/mm/yyyy)");
    var c = prompt ("Cat ai platit (RON)");
  
    if(a === null || a === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(c==!null){
        var c = parseInt(c);
    };

    document.getElementById("Telefon1_Data_txtbox").value=a;
    document.getElementById("Telefon1_RON_txtbox").value=c;
}

function Modif_Telefon2(){
    var a = prompt("Data la care ai platit Telefonul 2 (dd/mm/yyyy)");
    var c = prompt ("Cat ai platit (RON)");
  
    if(a === null || a === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(c==!null){
        var c = parseInt(c);
    };

    document.getElementById("Telefon2_Data_txtbox").value=a;
    document.getElementById("Telefon2_RON_txtbox").value=c;
}

function Modif_Internet(){
    var a = prompt("Data la care ai platit Internetul (dd/mm/yyyy)");
    var c = prompt ("Cat ai platit (RON)");
  
    if(a === null || a === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(c==!null){
        var c = parseInt(c);
    };

    document.getElementById("Internet_Data_txtbox").value=a;
    document.getElementById("Internet_RON_txtbox").value=c;
}

function Modif_Televiziune(){
    var a = prompt("Data la care ai platit Televiziunea (dd/mm/yyyy)");
    var c = prompt ("Cat ai platit (RON)");
  
    if(a === null || a === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(c==!null){
        var c = parseInt(c);
    };

    document.getElementById("Televiziune_Data_txtbox").value=a;
    document.getElementById("Televiziune_RON_txtbox").value=c;
}

function Modif_Netflix(){
    var a = prompt("Data la care ai platit Netflix (dd/mm/yyyy)");
    var c = prompt ("Cat ai platit (RON)");
  
    if(a === null || a === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(c==!null){
        var c = parseInt(c);
    };

    document.getElementById("Netflix_Data_txtbox").value=a;
    document.getElementById("Netflix_RON_txtbox").value=c;
}

function Modif_Disney(){
    var a = prompt("Data la care ai platit Disney+ (dd/mm/yyyy)");
    var c = prompt ("Cat ai platit (RON)");
  
    if(a === null || a === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(c==!null){
        var c = parseInt(c);
    };

    document.getElementById("Disney_Data_txtbox").value=a;
    document.getElementById("Disney_RON_txtbox").value=c;
}

function Modif_HBOmax(){
    var a = prompt("Data la care ai platit HBO Maxx (dd/mm/yyyy)");
    var c = prompt ("Cat ai platit (RON)");
  
    if(a === null || a === "" || c === null || c === ""){
        alert("Introdu date in toate campurile");
        return;
    }

    if(c==!null){
        var c = parseInt(c);
    };

    document.getElementById("HBOmax_Data_txtbox").value=a;
    document.getElementById("HBOmax_RON_txtbox").value=c;
}

function Check_dates(){
    var arrData = ["car1_Asigurare_Data_txtbox" , "car2_Asigurare_Data_txtbox", "car1_Rovigneta_Data_txtbox", "car2_Rovigneta_Data_txtbox", "car1_ITP_Data_txtbox" , "car2_ITP_Data_txtbox" ];
    var arrPerioada = ["car1_Asigurare_Perioada_txtbox" , "car2_Asigurare_Perioada_txtbox", "car1_Rovigneta_Perioada_txtbox", "car2_Rovigneta_Perioada_txtbox", "car1_ITP_Perioada_txtbox" , "car2_ITP_Perioada_txtbox"];
    var i = 0;
    
    var b = 0;
    

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
while (i < 6){
    var a = document.getElementById(arrData[i]).value
    var per = parseInt(document.getElementById(arrPerioada[i]).value)
    var [day, month, year] = a.split('/');
    const dateObj = new Date(+year, +month - 1, +day);
  dateObj.setMonth(dateObj.getMonth() + per);
    


    while (b <= 7){
    
        dateObj.setDate(dateObj.getDate() - 1);

        if(today.getTime() === dateObj.getTime())
            {
                document.getElementById(arrData[i]).style.backgroundColor="#FFFF00";
                break;
            }
            b++
    }
    b=0;
    i++
}
}


