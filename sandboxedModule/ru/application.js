// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

util = require('util');

// Вывод из глобального контекста модуля
console.log('From application global context');

myTimeout(function(){
  	console.log("Print use setTimeout.")
  }, 3500);
myInterval(function(){
	console.log("Print use setInterval.")
  }, 1000);

var obj = {
  	a: 5,
  	b: 6
  }
  obj.self = obj;
  console.log(util.inspect(obj, {colors: true}));

module.exports = function() {
  // Вывод из контекста экспортируемой функции
    console.log('From application exported function');

    console.log(util.inspect(global, {colors: true}));
};

module.exports.func = function(argument) {
  console.log('function with argument: ' + argument);
};