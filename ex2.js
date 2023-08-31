// Define um array de salários iniciais
const salarios = [1500, 1800, 2200, 1900, 2550, 1700, 2100, 3060, 1600, 2300];

// Utiliza o método map para criar um novo array com os salários após aplicar aumentos
const salarioComAumento = salarios.map(salario => {
  if (salario <= 2000) {
    return salario * 1.15; // Aumento de 15% para salários até 2000
  } else {
    return salario * 1.10; // Aumento de 10% para salários acima de 2000
  }
});

// Filtra salários superiores a 2500 no array de salários com aumento
const salariosSuperioresA2500 = salarioComAumento.filter(salario => salario > 2500);

// Calcula a soma dos salários filtrados e superiores a 2500
const somaSalarios = salariosSuperioresA2500.reduce((acumulador, salario) => {
  return acumulador + salario;
}, 0);

// Imprime a soma total dos salários após as operações
console.log(somaSalarios);