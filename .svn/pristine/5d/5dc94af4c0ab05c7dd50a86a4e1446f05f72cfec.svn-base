var usize = comp.getValue('usize'),
	mainColor = comp.getValue('mainColor'),
	name = comp.getValue('name') || 'Rack';

var width = rect.width,
	height = rect.height;

var uh = 20.8,
	U_GAP = 2,
	hh = 30,
	fh = 56;

// var childrenIndexs = [];
// data.getChildren().each(function(child) {
// 	childrenIndexs.push(child.a('uindex'));
// });

ht.Default.drawImage(g, ht.Default.getImage('./symbols/rack-header.json'), 0, 0, width, hh);
ht.Default.drawText(g, name, '16px sans-serif', '#ffffff', 0, 0, width, hh, 'center', 'middle');
//left rect
g.save();
g.fillStyle = mainColor;
g.fillRect(0, hh, uh, (uh+U_GAP) * usize);
g.restore();

//right rect
g.save();
g.fillStyle = mainColor;
g.fillRect(width - uh, hh, uh, (uh+U_GAP) * usize);
g.restore();
// u
var uy = hh;
for (var i = 0; i < usize; i++) {	
	// u rect
	g.save();
	g.fillStyle = '#7b7b7b';
	g.fillRect(uh, uy, width - uh * 2, (uh+U_GAP));
	g.strokeStyle = '#9d9d9d';
	g.strokeRect(uh, uy, width - uh * 2, (uh+U_GAP));
	g.restore();

	// u index
	// if (childrenIndexs.indexOf(usize - 1) < 0) {
		ht.Default.drawText(g, usize - i, '14px sans-serif', '#afafaf', uh, uy, width - uh * 2, (uh+U_GAP), 'center', 'middle');
	// }

	if ((usize - i) % 5 === 0) {
		g.save();
		g.fillStyle = '#ffffff';
		g.beginPath();
		g.arc(uh * 0.5, uy + (uh+U_GAP) * 0.5, 3, 0, 2 * Math.PI, false);
		g.fill();
		g.restore();

		g.save();
		g.fillStyle = '#ffffff';
		g.beginPath();
		g.arc(width - uh * 0.5, uy + (uh+U_GAP) * 0.5, 3, 0, 2 * Math.PI, false);
		g.fill();
		g.restore();
	}
	
	uy += (uh+U_GAP);
}

//footer
ht.Default.drawImage(g, ht.Default.getImage('./symbols/rack-footer.json'), 0, uy, width, fh);
