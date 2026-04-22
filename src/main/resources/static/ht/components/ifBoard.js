var rxRate = comp.getValue('rxRate'),
	txRate = comp.getValue('txRate'),
	rxUtil = comp.getValue('rxUtil'),
	txUtil = comp.getValue('txUtil'),
	mainColorRx = comp.getValue('mainColorRx'),
	mainColorTx = comp.getValue('mainColorTx'),
	mainFont = comp.getValue('mainFontBold') + ' '+ comp.getValue('mainFontSize') + 'px ' + comp.getValue('mainFontFamily'),
	mainFontColor = comp.getValue('mainFontColor'),
	boxWidth = comp.getValue('boxWidth'),
	boxHeight = comp.getValue('boxHeight');

//var width = rect.width,
//	height = rect.height;

//var uh = 150,
//	hh = 30;
/*
mainColorRx = '#11e806';
if(rxUtil > 80){
	mainColorRx =  '#e81506';
}else if(rxUtil > 60){
	mainColorRx =  '#b706e8';
}else if(rxUtil > 40){
	mainColorRx =  '#91e806';
}
mainColorTx = '#11e806';
if(txUtil > 80){
	mainColorTx =  '#e81506';
}else if(txUtil > 60){
	mainColorTx =  '#b706e8';
}else if(txUtil > 40){
	mainColorTx =  '#91e806';
}*/

//RX bg color
g.save();
g.fillStyle = '#ffffff';
g.fillRect(0, 0, boxWidth+2, (boxHeight/2)+2);
g.fillStyle = mainColorRx;
g.fillRect(1, 1, boxWidth, boxHeight/2);
g.restore();

//TX bg color
g.save();
g.fillStyle = '#ffffff';
g.fillRect(0, boxHeight/2, boxWidth+2, (boxHeight/2)+2);
g.fillStyle = mainColorTx;
g.fillRect(1, (boxHeight/2)+1, boxWidth, boxHeight/2);

g.restore();
ht.Default.drawText(g, '  Rx', mainFont, mainFontColor, 0, 0, boxWidth, boxHeight/2, 'left', 'middle');
ht.Default.drawText(g, rxRate + '  ' , mainFont, mainFontColor, 0, 0, boxWidth, boxHeight/2, 'right', 'middle');
ht.Default.drawText(g, '  Tx'  , mainFont, mainFontColor, 0, boxHeight/2, boxWidth, boxHeight/2, 'left', 'middle');
ht.Default.drawText(g, txRate + '  ' , mainFont, mainFontColor, 0, boxHeight/2, boxWidth, boxHeight/2, 'right', 'middle');