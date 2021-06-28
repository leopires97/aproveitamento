

var largMatField = document.getElementById('largMat');
var altMatField = document.getElementById("altMat");
var largProdField = document.getElementById("largProd");
var altProdField = document.getElementById("altProd");
var qtdTotalField = document.getElementById("qtdTotal");
var tamanhoFinalField = document.getElementById("tamanhoFinal");
var canvasAprov = document.getElementById("canvasAprov");

function desenharAprov(qtdHoriz, qtdVert, qtdGiraHoriz, qtdGiraVert)    {
    var larguraObj = parseInt(largProdField.value) / 3;
    var alturaObj = parseInt(altProdField.value) / 3;
    var ctx = canvasAprov.getContext("2d");

    canvasAprov.width = parseInt(largMatField.value) / 3;
    canvasAprov.height = parseInt(altMatField.value) / 3;

    for(var a = 0; a < qtdHoriz; a++)  { //loop para criação na largura
        if(a == 0)  {
            ctx.beginPath();
            ctx.rect(0, 0, larguraObj, alturaObj);
            ctx.stroke();
        }   else if(a > 0)   {
                ctx.beginPath();
                ctx.rect(larguraObj * a, 0, larguraObj, alturaObj);
                ctx.stroke();
        }
        if(qtdVert > 1)    {
            for(var b = 0; b < qtdVert; b++)    { //b = vertical; c = horizontal
                for(var c = 0; c < qtdHoriz; c++)   {
                    if(b == 0 && c == 0)  {
                        ctx.beginPath();
                        ctx.rect(0, alturaObj, larguraObj, alturaObj);
                        ctx.stroke();
                    }   else if(c > 0)   {
                            ctx.beginPath();
                            ctx.rect(larguraObj * c, alturaObj, larguraObj, alturaObj);
                            ctx.stroke();
                    }   
                    if(b > 0)  {
                        ctx.beginPath();
                        ctx.rect(larguraObj * c, alturaObj * b, larguraObj, alturaObj);
                        ctx.stroke();
                    }
                }
            }
        }
    }
    if(qtdGiraVert > 1)    { //loop pra girar na horizontal dependendo do aproveitamento
        for(var d = 0; d < qtdGiraVert; d++)   {
            if(d == 0)  {
                ctx.beginPath();
                ctx.rect(0, alturaObj * qtdVert, alturaObj, larguraObj);
                ctx.stroke();
            }   else if(d > 0)  {
                ctx.beginPath();
                ctx.rect(alturaObj * d, alturaObj * qtdVert, alturaObj, larguraObj);
                ctx.stroke();
            }
        }
    }
    if(qtdGiraHoriz > 1)    { //loop pra girar na horizontal dependendo do aproveitamento
        for(var e = 0; e < qtdGiraHoriz; e++)   {
            if(e == 0)  {
                ctx.beginPath();
                ctx.rect(larguraObj * qtdHoriz, 0, alturaObj, larguraObj);
                ctx.stroke();
            }   else if(e > 0)  {
                ctx.beginPath();
                ctx.rect(larguraObj * qtdHoriz, larguraObj * e, alturaObj, larguraObj);
                ctx.stroke();
            }
        }
    }
}

function inverter() {
    var tempAltProd = altProdField.value;
    var tempLargProd = largProdField.value;

    largProdField.value = tempAltProd;
    altProdField.value = tempLargProd;

    calculoTotal();
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
        horizDivide = Math.floor(parseInt(largMatField.value) / parseInt(largProdField.value));
        vertDivide = Math.floor(parseInt(altMatField.value) / parseInt(altProdField.value));
        tempTotal = horizDivide * vertDivide;
        horizTotal = horizDivide * parseInt(largProdField.value);
        vertTotal = vertDivide * parseInt(altProdField.value);
        horizSobra = parseInt(largMatField.value) - parseInt(horizTotal);
        vertSobra = parseInt(altMatField.value) - parseInt(vertTotal);
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
    desenharAprov(horizDivide, vertDivide, tempHoriz, tempVert);
}

