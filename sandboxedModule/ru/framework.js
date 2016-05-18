// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');

// Создаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = { 
	myTimeout: setTimeout,
	myInterval: setInterval,
	module: {}, 
	util: util,
	console: duplicateConsole(console),
	require: newRequire
};
context.global = context;
var sandbox = vm.createContext(context);

var keys = {};
for (var tmp in sandbox)
	keys[tmp] = sandbox[tmp];

// Читаем исходный код приложения из файла
var fileName = process.argv[2] || './application.js';
fs.readFile(fileName, function(err, src) {
  // Тут нужно обработать ошибки
  if (err) return console.log(err);
  
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);

  var newKeys = {};
  for (var tmp in sandbox)
	newKeys[tmp] = sandbox[tmp];

  console.log("New keys:");
  for (var tmp in newKeys) {
	if (!(tmp in keys))
		console.log(tmp);
  }
  
  for (var tmp in sandbox.module.exports) {
  	console.log(tmp + " -> " + typeof sandbox.module.exports[tmp]);
  }

  var functionString = sandbox.module.exports.func.toString();
  var argF = functionString.substring(functionString.indexOf('(') + 1, 
  									functionString.indexOf(')'));
  var pos = 0;
  var countArg = 0;
  while(true){
  	var found = argF.indexOf(' ');
  	if(found == -1) break;
  	else countArg++;
  	pos = found + 1;
  }
  console.log(functionString);
  console.log(countArg + 1);

  sandbox.module.exports();
  // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
  // сохранить в кеш, вывести на экран исходный код приложения и т.д.
});

function duplicateConsole(obj) {
	var result = {};
	for (var i in obj)
		result[i] = obj[i];
	return result;
}

function newRequire(module){
	var time = new Date().toLocaleTimeString();
	console.log(time + ' ' + module);
	return require(module);
}

context.console.log = function (message){
	var time = new Date().toLocaleTimeString();
	console.log(fileName+" "+time+" "+message);
	var out = fs.createWriteStream('output.txt', {flags: 'a+'});
	out.write(fileName+" "+time+" "+message+'\n');
}