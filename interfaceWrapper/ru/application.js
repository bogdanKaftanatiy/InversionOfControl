// Вывод из глобального контекста модуля
//console.log('From application global context');

// Объявляем функцию для события таймера
// function timerEvent() {
//   console.log('From application timer event');
// }

// Устанавливаем функцию на таймер
//setTimeout(timerEvent, 1000);


var fileName = './README.md';
var countIteration = 10;
console.log('Application going to read ' + fileName);
setTimeout(function f(){
	countIteration--;

	fs.readFile(fileName, function(err, src) {
		console.log('File ' + fileName + ' size ' + src.length);
	});

	if (countIteration>0) {
		setTimeout(f, 2500);
	}
}, 1000);

setInterval(function(){
	printInformation();
}, 3000);