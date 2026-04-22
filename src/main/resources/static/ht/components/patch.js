var start = comp.getValue('start'),
	end = comp.getValue('end'),
	portCount = comp.getValue('portCount'),
	deviceName = comp.getValue('deviceName'),
	deviceCellWidth = comp.getValue('deviceCellWidth'),
	cableCellWidth = comp.getValue('cableCellWidth'),
	oddBackground = comp.getValue('oddBackground'),
	evenBackground = comp.getValue('evenBackground');

var width = rect.width,
	height = rect.height;

var colCount = end - start + 1,
	colWidth = width / colCount,
	rowHeight = height / portCount;
// draw column bg
var cy = 0, colColor;
for (var i = 0; i < portCount; i++) {
	g.save();
	g.fillStyle = i % 2 === 0 ? oddBackground : evenBackground;
	g.fillRect(0, cy, width, rowHeight);
	g.restore();
	cy += rowHeight;
}
// column line
colWidth = deviceCellWidth;
var cx = colWidth;
for (var i = 1; i < colCount; i++) {
	colWidth = (i % 2 === 0)?deviceCellWidth:cableCellWidth;
	g.beginPath();
	g.strokeStyle = '#dfdfdf';
	g.moveTo(cx, 0);
	g.lineTo(cx, height);
	g.stroke();
	cx += colWidth;
}

// border
g.rect(0, 0, width, height);
g.stroke();
// row line port text
colWidth = deviceCellWidth;
var cy = 0, textX = (0 - start) * (colWidth+cableCellWidth)/2;
for (var i = 0; i < portCount; i++) {
	ht.Default.drawImage(g, ht.Default.getImage('patch.panel.port'), textX, cy, colWidth, rowHeight * 0.7);
	g.save();
	g.font = '14px sans-serif';
	g.textAlign = 'center';
	g.strokeStyle = '#999999';
	g.strokeText(i + 1, textX + (deviceCellWidth-cableCellWidth)/2 + colWidth * 0.32, cy + rowHeight * 0.5);

	g.fillStyle = '#ffffff';
	g.fillText(i + 1, textX  + (deviceCellWidth-cableCellWidth)/2 + colWidth * 0.32, cy + rowHeight * 0.5);
	g.restore();

	var deviceScale = 0.7;
	g.save();
	g.scale(deviceScale, deviceScale);
	g.font = '12px sans-serif';
	g.textAlign = 'center';
	g.fillStyle = '#000000';
	g.fillText(deviceName + '-' + ('0' + (i+1)).slice(-2), (textX  + (deviceCellWidth-cableCellWidth)/2 + colWidth * 0.32) / deviceScale, (cy + rowHeight * 0.92) / deviceScale);
	g.restore();
	// ht.Default.drawText(g, i + 1, '12px sans-serif', '#ffffff', textX + 9, cy, colWidth * 0.64, rowHeight * 0.64, 'center', 'middle');
	cy += rowHeight;
	if (i === portCount - 1) {
		continue;
	}
	g.beginPath();
	g.strokeStyle = '#dfdfdf';
	g.moveTo(0, cy);
	g.lineTo(width, cy);
	g.stroke();

}

