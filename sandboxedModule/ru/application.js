// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

// Вывод из глобального контекста модуля
console.log('From application global context');

module.exports = function() {
  // Вывод из контекста экспортируемой функции

  setTimeout(function(){
  	console.log("Print use setTimeout.")
  }, 3500);
  setInterval(function(){
	console.log("Print use setInterval.")
  }, 1000);

  var util = require('util');
  var obj = {
  	a: 5,
  	b: 6
  }
  obj.self = obj;
  console.log(util.inspect(obj));

  console.log('From application exported function');
};
