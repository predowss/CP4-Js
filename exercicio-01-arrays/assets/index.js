    // Obtém uma referência ao elemento do formulário de tarefas
    const taskForm = document.getElementById("taskForm");

    // Obtém referências aos elementos de entrada do formulário
    const descriptionInput = document.getElementById("descriptionInput");
    const authorInput = document.getElementById("authorInput");
    const departmentInput = document.getElementById("departmentInput");
    const importanceInput = document.getElementById("importanceInput");
    const valueInput = document.getElementById("valueInput");
    const durationInput = document.getElementById("durationInput");

    // Obtém uma referência à tabela de tarefas
    const taskList = document.querySelector("#taskList tbody");

    // Obtém uma referência à lista de tarefas importantes
    const importantTasksList = document.getElementById("importantTasks");

    // Obtém uma referência ao botão para limpar tarefas concluídas
    const clearCompletedButton = document.getElementById("clearCompleted");

    // Cria uma matriz vazia para armazenar as tarefas
    const tasks = [];


    // Adiciona um evento de escuta ao formulário com o ID 'taskForm'
    taskForm.addEventListener("submit", function(event) {
        // Impede o comportamento padrão de submissão do formulário (evita recarregar a página)
        event.preventDefault();
    
        // Cria um novo objeto 'newTask' com informações do formulário
        const newTask = {
        description: descriptionInput.value,// Obtém o valor do campo de descrição
        author: authorInput.value,          // Obtém o valor do campo de autor
        department: departmentInput.value,  // Obtém o valor do campo de departamento
        importance: importanceInput.value,  // Obtém o valor do campo de importância
        value: valueInput.value,            // Obtém o valor do campo de valor
        duration: durationInput.value       // Obtém o valor do campo de duração
        };
    
        // Adiciona o novo objeto 'newTask' ao array 'tasks'
        tasks.push(newTask);
    
        // Chama a função para atualizar a lista de tarefas
        updateTaskList();
    
        // Chama a função para atualizar a lista de tarefas importantes
        updateImportantTasksList();
    
        // Chama a função para redefinir os campos do formulário
        resetForm();
    });
  

    // Adiciona um evento de escuta ao botão com o ID 'clearCompletedButton'
    clearCompletedButton.addEventListener("click", function() {
        // Percorre o array de tarefas de trás para frente
        // para garantir a remoção segura dos elementos durante o loop
        for (let i = tasks.length - 1; i >= 0; i--) {
        // Verifica se a tarefa atual está marcada como concluída
        if (tasks[i].completed) {
            // Remove a tarefa do array usando 'splice' no índice 'i'
            tasks.splice(i, 1);
        }
        }
        
        // Chama a função para atualizar a lista de tarefas após a remoção
        updateTaskList();
    
        // Chama a função para atualizar a lista de tarefas importantes após a remoção
        updateImportantTasksList();
    });
  

        // Função que atualiza a lista de tarefas na interface
    function updateTaskList() {
        // Limpa o conteúdo atual da lista de tarefas
        taskList.innerHTML = "";
    
        // Percorre o array de tarefas e cria elementos HTML para cada tarefa
        for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
    
        // Cria uma nova linha (elemento <tr>) para a tarefa
        const row = document.createElement("tr");
    
        // Define o conteúdo HTML da linha usando template literals
        row.innerHTML = `
            <td>${task.description}</td>
            <td>${task.author}</td>
            <td>${task.department}</td>
            <td>${task.importance}</td>
            <td>${task.value || ""}</td>
            <td>${task.duration || ""}</td>
            <td><button class="completeButton">Concluir</button></td>
        `;
    
        // Encontra o botão de conclusão dentro da linha
        const completeButton = row.querySelector(".completeButton");
    
        // Adiciona um ouvinte de evento para o botão de conclusão
        completeButton.addEventListener("click", function() {
            // Marca a tarefa como concluída
            task.completed = true;
            
            // Chama a função para atualizar a lista de tarefas após a marcação
            updateTaskList();
        });
    
        // Adiciona a linha (tarefa) à lista de tarefas na interface
        taskList.appendChild(row);
        }
    }
  

    // Função para atualizar a lista de tarefas importantes na interface
    function updateImportantTasksList() {
        importantTasksList.innerHTML = ""; // Limpa o conteúdo da lista

        // Filtra tarefas com importância alta, média e baixa (nessa ordem)
        const importantTasks = tasks
            .filter(task => task.importance !== "baixa") // Filtra tarefas com importância diferente de "baixa"
            .concat(tasks.filter(task => task.importance === "baixa")); // Adiciona tarefas com importância "baixa" no final

        // Percorre o array de tarefas importantes e cria elementos HTML para cada uma
        for (let i = 0; i < importantTasks.length; i++) {
            const listItem = document.createElement("li");

            // Define o texto do item da lista como a descrição da tarefa
            listItem.textContent = importantTasks[i].description;

            // Adiciona o item à lista de tarefas importantes na interface
            importantTasksList.appendChild(listItem);
        }
    }



    // Função para redefinir os campos do formulário
    function resetForm() {
        // Limpa os valores dos campos de entrada
        descriptionInput.value = "";       // Limpa o campo de descrição
        authorInput.value = "";            // Limpa o campo de autor
        departmentInput.value = "";        // Limpa o campo de departamento
        importanceInput.value = "alta";    // Define a importância como "alta" por padrão
        valueInput.value = "";             // Limpa o campo de valor
        durationInput.value = "";          // Limpa o campo de duração
    }
