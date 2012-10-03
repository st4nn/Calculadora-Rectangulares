var Variables;
$(document).on("ready", arranque);

function arranque()
{
	$('#btnMatrizCalcular').on('click', btnMatrizCalcular_Click);
	$('#btnMatrizMostrar').on('click', btnMatrizMostrar_Click);

	$('#frmPaR').on('submit', frmPaR_Submit);
	$('#frmRaP').on('submit', frmRaP_Submit);
	
	$('#frmOperaciones').on('submit', frmOperaciones_Submit);
}
function btnMatrizCalcular_Click()
{
	var Columnas = $('#txtMatrizM').val();
	var Filas = $('#txtMatrizN').val();
	
	var obj1, obj2, obj3;
	obj3=0;
	$('#mao').text('');
	var tabla = document.getElementById('tblMatriz');
	for (var i=0; i < Filas; i++)
	{
		$('#mao').text($('#mao').text() + '(');	
		obj1 = i +1;
		for (var j=0; j < Columnas; j++)
		{
			obj2 = j + 1;
			obj3++;
			if (obj2 == Columnas)
			{
				$('#mao').text($('#mao').text() + obj2 + obj3);		
			}
			else
			{
				$('#mao').text($('#mao').text() + obj2 + obj3 + ' + ');		
			}
			
			if (obj3 == Filas)
			{
				obj3 = 1;
			}
		}
		$('#mao').text($('#mao').text() + ')	');	
	}
	
	for (var i=0; i < Filas; i++)
	{
		$('#mao').text($('#mao').text() + ' - (');	
		obj1 = i +1;
		obj3 = Math.round(Columnas) + 1;
		for (var j=0; j < Columnas; j++)
		{
			obj2 = j + 1;
			obj3--;
			if (obj2 == Columnas)
			{
				$('#mao').text($('#mao').text() + obj2 + obj3);		
			}
			else
			{
				$('#mao').text($('#mao').text() + obj2 + obj3 + ' + ');		
			}
			
			if (obj3 == 0)
			{
				obj3 = Columnas + 1;
			}
		}
		$('#mao').text($('#mao').text() + ')	');	
	}
}
function btnMatrizMostrar_Click()
{
	$("#tblMatriz td").remove();
	
	var Columnas = $('#txtMatrizM').val();
	var Filas = $('#txtMatrizN').val();
	
	var obj1, obj2;
	
	var tabla = document.getElementById('tblMatriz');
	for (var i=0; i < Filas; i++)
	{
		var row = tabla.insertRow(i);
		obj1 = i +1;
		for (var j=0; j < Columnas; j++)
		{
			obj2 = j + 1;
			var cell1 = row.insertCell(j);		
			cell1.innerHTML = "<input type='text' id='txtMatrizA" + obj1 + obj2 + "' value='" + obj1 + obj2 + "'/> " +
							  "<label> j </label>" +
							  "<input type='text' id='txtMatrizB" + obj1 + obj2 + "' value='" + obj1 + obj2 + "'/>";
		}	
			var cell1 = row.insertCell(j);		
			cell1.innerHTML = " = <input type='text' id='txtMatrizR" + obj1 + obj2 + "' value='R" + obj1 + "' />";
	}
}
function frmPaR_Submit(evento)
{
	evento.preventDefault();
	$('#PaRResultado').text(PolarRectangular($('#txtPaRValor').val(), $('#txtPaRAngulo').val()));
}
function frmRaP_Submit(evento)
{
	evento.preventDefault();
	$('#RaPResultado').text(RectangularPolar($('#txtRaPValorA').val(), $('#txtRaPValorB').val(), $('#cboRaPSigno').val()));	
}
function PolarRectangular(magnitud,angulo)
{
	var a =  magnitud * Math.cos(GradRad(angulo));
	var b =  magnitud * Math.sin(GradRad(angulo));
	var signo = '+';
	if (b<0)
	{	signo = '-';}
	//a = maquillarNumero(a);
	//b = maquillarNumero(b);
	return (a + ' ' + signo + ' j' + Math.abs(b));
}
function RectangularPolar(a, b, signo)
{
	var obj = Math.sqrt((Math.pow(a, 2)) + (Math.pow(b, 2))); // sqrt(a^2+b^2)
	
	b= GradRad(b);
	a= GradRad(a);
	//a = b/a;
	//var angulo = Math.atan2(b,a) //tan^(-1)(b/a)
	var angulo = Math.atan2(b,a) //tan^(-1)(b/a)
	angulo = RadGrad(angulo) * (Math.pow('-1', signo));
	//obj = maquillarNumero(obj);
	//angulo = maquillarNumero(angulo);
	return (obj + ' |_' + angulo + 'º');
}
function GradRad(Valor) //Convertir de Grados a Radianes
{
	Valor = (Valor* Math.PI)/180;
	return Valor;
}
function RadGrad(Valor) //Convertir de Radianes a Grados
{
	Valor = (Valor* 180)/Math.PI;
	return Valor;
}
function maquillarNumero(Num)
{
	if (((Math.round(Num)-Math.abs(Num)) > 0.0001) && ((Math.round(Num)-Math.abs(Num)) < 0.1))
	{Num = Math.round(Num);}
	Num = Num.toFixed(3);
	return Num;
}

function frmOperaciones_Submit(evento)
{
	evento.preventDefault();
	
	var a1 = parseFloat($('#txtA1').val());  
	var b1 = parseFloat($('#txtB1').val());
    var a2 = parseFloat($('#txtA2').val());  
    var b2 = parseFloat($('#txtB2').val());

    $('#txtSumaA').val(a1+a2); $('#txtSumaB').val(b1+b2);     
    $('#txtRestaA').val(a1-a2);  $('#txtRestaB').val(b1-b2);
    $('#txtMultiplicacionA').val(a1*a2-b1*b2);  $('#txtMultiplicacionB').val(a1*b2+b1*a2);
    $('#txtDivisionA').val((a1*a2)/(a2*a2+b2*b2));  $('#txtDivisionB').val((b1*a2-a1*b2)/(a2*a2+b2*b2));
}
