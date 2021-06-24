

var largMatField = document.getElementById('largMat');
var altMatField = document.getElementById("altMat");
var largProdField = document.getElementById("largProd");
var altProdField = document.getElementById("altProd");
var qtdTotalField = document.getElementById("qtdTotal");
var tamanhoFinalField = document.getElementById("tamanhoFinal");

function inverter() {
    var tempAltProd = altProdField.value;
    var tempLargProd = largProdField.value;

    largProdField.value = tempAltProd;
    altProdField.value = tempLargProd;

    calculoTotal();
}
    
function calculoTotal()   {
    var horizDivide;
    var vertDivide;
    var horizTotal;
    var vertTotal;
    var horizSobra;
    var vertSobra;
    var tempHoriz;
    var tempVert;
    var tempTotal;
    
    if(largMatField.value == '' && altMatField.value == '')  {
        horizDivide = 0;
        vertDivide = 0;
        horizTotal = 0;
        vertTotal = 0
        horizSobra = 0;
        vertSobra = 0;
        tempHoriz = 0;
        tempVert = 0;
        tempTotal = 0;

    }   else if(largMatField.value != '' && altMatField.value != '')   {
        horizDivide = Math.floor(parseInt(largMatField.value) / parseInt(largProdField.value));
        vertDivide = Math.floor(parseInt(altMatField.value) / parseInt(altProdField.value));
        tempTotal = horizDivide * vertDivide;
        horizTotal = horizDivide * parseInt(largProdField.value);
        vertTotal = vertDivide * parseInt(altProdField.value);
        horizSobra = parseInt(largMatField.value) - parseInt(horizTotal);
        vertSobra = parseInt(altMatField.value) - parseInt(vertTotal);
        if(horizSobra > parseInt(altProdField.value)) { //cabe mais de pé na horizontal
            tempHoriz = Math.floor(horizSobra / parseInt(altProdField.value) * Math.floor(parseInt(altMatField.value) / parseInt(largProdField.value)));
            tempTotal += tempHoriz;
        }
        if(vertSobra > parseInt(largProdField.value)) { //cabe mais deitado na vertical
            tempVert = Math.floor(vertSobra / parseInt(largProdField.value) * Math.floor(parseInt(largMatField.value) / parseInt(altProdField.value)));
            tempTotal += tempVert;
        }
    }
    qtdTotalField.value =  tempTotal;
    tamanhoFinalField.value = horizTotal + ' x ' + vertTotal;
}
