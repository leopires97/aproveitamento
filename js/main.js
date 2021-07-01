

var largMatField = document.getElementById('largMat');
var altMatField = document.getElementById("altMat");
var largProdField = document.getElementById("largProd");
var altProdField = document.getElementById("altProd");
var qtdTotalField = document.getElementById("qtdTotal");
var tamanhoFinalField = document.getElementById("tamanhoFinal");
var canvasAprov = document.getElementById("canvasAprov");
var qtdObjField = document.getElementById("qtdObj");
var qtdChapaField = document.getElementById("qtdChapa");
var totalEntregaField = document.getElementById("totalEntrega");
var qtdObj = 0;

function checkCampos()  {
    if(largMatField.value != "" && altMatField.value != "" && altProdField.value != "" && largProdField.value != "")    {
        calculoTotal();
    }   else    {
        alert("Preencha os campos corretamente");
    }
}

function rectCreate(x, y, largura, altura)  {
    var ctx = canvasAprov.getContext("2d");
    ctx.beginPath();
    ctx.rect(x, y, largura, altura);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x, y, largura, altura);
    qtdObj = qtdObj + 1;
}

function desenharAprov(qtdHoriz, qtdVert, qtdGiraHoriz, qtdGiraHorizLinha, qtdGiraVert, qtdGiraVertLinha)    {
    var larguraObj = parseInt(largProdField.value) *2;
    var alturaObj = parseInt(altProdField.value) *2;
    canvasAprov.width = parseInt(largMatField.value) *2;
    canvasAprov.height = parseInt(altMatField.value) *2;
    rectCreate(0, 0, canvasAprov.width, canvasAprov.height);
    qtdGiraHoriz = qtdGiraHoriz / qtdGiraHorizLinha;
    qtdGiraVert = qtdGiraVert / qtdGiraVertLinha;

    for(var a = 0; a < qtdHoriz; a++)  { //loop para criação na largura
        if(a == 0)  {
            rectCreate(0, 0, larguraObj, alturaObj);
        }   else if(a > 0)   {
            rectCreate(larguraObj * a, 0, larguraObj, alturaObj);
        }
        if(qtdVert > 1)    {
            for(var b = 0; b < qtdVert; b++)    { //b = vertical; c = horizontal
                for(var c = 0; c < qtdHoriz; c++)   {
                    if(b == 0 && c == 0)  {
                        rectCreate(0, alturaObj, larguraObj, alturaObj);
                    }   else if(c > 0)   {            
                        rectCreate(larguraObj * c, alturaObj, larguraObj, alturaObj);
                    }   
                    if(b > 0)  {        
                        rectCreate(larguraObj * c, alturaObj * b, larguraObj, alturaObj);
                    }
                }
            }
        }
    }
    if(qtdGiraVert > 1)    { //loop pra girar na vertical dependendo do aproveitamento
        for(var d = 0; d < qtdGiraVertLinha; d++)  {
            for(var e = 0; e < qtdGiraVert; e++)   {
                if(e == 0)  {
                    rectCreate(0, alturaObj * qtdVert, alturaObj, larguraObj);
                }   else if(e > 0)  {
                    rectCreate(alturaObj * e, alturaObj * qtdVert, alturaObj, larguraObj);
                }
                if(d > 0)   {
                    for(var f = 0; f < qtdGiraVert; f++)   {
                        if(f == 0)  {
                            rectCreate(0, (alturaObj * qtdVert) + (larguraObj * d), alturaObj, larguraObj);
                        }   else if(f > 0)  {
                            rectCreate(alturaObj * f, (alturaObj * qtdVert) + (larguraObj * d), alturaObj, larguraObj);
                        }
                    }
                }
            }
        }
    }
    if(qtdGiraHoriz > 1)    { //loop pra girar na horizontal dependendo do aproveitamento
        for(var g = 0; g < qtdGiraHoriz; g++)   {
            if(g == 0)  {
                rectCreate(larguraObj * qtdHoriz, 0, alturaObj, larguraObj);
            }   else if(g > 0)  {
                rectCreate(larguraObj * qtdHoriz, larguraObj * g, alturaObj, larguraObj);
            }
        }
    }
}

function inverterProduto() {
    var tempAltProd = altProdField.value;
    var tempLargProd = largProdField.value;

    largProdField.value = tempAltProd;
    altProdField.value = tempLargProd;

    checkCampos();
}

function inverterMaterial() {
    var tempAltMat = altMatField.value;
    var tempLargMat = largMatField.value;

    largMatField.value = tempAltMat;
    altMatField.value = tempLargMat;

    checkCampos();

}
    
function calculoTotal()   {
    var horizDivide, vertDivide, horizTotal, vertTotal, 
        horizSobra, vertSobra, tempHoriz, tempVert, tempTotal;

    
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
        horizDivide = Math.floor(parseInt(largMatField.value) / parseInt(largProdField.value)); //quantas colunas cabem
        vertDivide = Math.floor(parseInt(altMatField.value) / parseInt(altProdField.value)); //quantos linhas
        tempTotal = horizDivide * vertDivide; //total peças sem aproveitamento final
        horizTotal = horizDivide * parseInt(largProdField.value); //uso da largura do material no aprov. cru
        vertTotal = vertDivide * parseInt(altProdField.value); //uso da altura do material no aprov. cru
        horizSobra = parseInt(largMatField.value) - parseInt(horizTotal); //sobra do material subtraindo quantidade de colunas
        vertSobra = parseInt(altMatField.value) - parseInt(vertTotal);// sobra do material subtraindo qunatidade de linhas
        if(horizSobra > parseInt(altProdField.value)) { //cabe mais de pé na horizontal
            tempHoriz = Math.floor(horizSobra / parseInt(altProdField.value)) * Math.floor(parseInt(altMatField.value) / parseInt(largProdField.value));
            tempTotal += tempHoriz;
        }
        if(vertSobra > parseInt(largProdField.value)) { //cabe mais deitado na vertical
            tempVert = Math.floor(vertSobra / parseInt(largProdField.value)) * Math.floor(parseInt(largMatField.value) / parseInt(altProdField.value));
            tempTotal += tempVert;
        }
    }
    qtdTotalField.value =  tempTotal;
    tamanhoFinalField.value = horizTotal + ' x ' + vertTotal;
    qtdObj = 0;
    qtdChapaField.value = Math.ceil(parseInt(totalEntregaField.value) / tempTotal);
    desenharAprov(horizDivide, vertDivide, tempHoriz, Math.floor(horizSobra / parseInt(altProdField.value)) ,tempVert, Math.floor(vertSobra / parseInt(largProdField.value)));
}
