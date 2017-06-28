var costable=[],sintable=[];

for (var i = 0; i <= 360; i++) {
  costable[i] = Math.cos(i * (Math.PI / 180));
  sintable[i] = Math.sin(i * (Math.PI / 180));
}

function cos(teta) {
  teta = Math.floor(Math.abs(teta)) % 360;
  return (costable[teta]);
}

function sin(teta) {
  teta = Math.floor(Math.abs(teta)) % 360;
  return (sintable[teta]);
}
