/* Projeto de API do GitHub 
Neste projeto, você criará uma página que usa a API do GitHub para listar os repositórios de um usuário do GitHub.

Este projeto não exige que você faça login e autentique com a API do GitHub. No entanto, a API tem um limite de 60 solicitações por minuto. Portanto, se você receber um erro dizendo: You have triggered an abuse detection mechanism. Please wait a few minutes before you try again., deverá aguardar cerca de um minuto antes de tentar novamente.

O objetivo deste projeto é permitir que o usuário insira um nome de usuário do GitHub (por exemplo, jadjoubranou sindresorhus) e, quando o usuário enviar o formulário, o aplicativo mostrará a lista de repositórios do GitHub para esse usuário usando a API do GitHub.

Descrição não guiada
Experimente usar a descrição não guiada primeiro. Se você estiver travado, experimente a descrição guiada abaixo.

A API do Github está localizada em docs.github.com/en/rest . Navegando pela documentação, você poderá encontrar o URL base .

Em seguida, você precisa procurar a página Repositórios para encontrar o endpoint específico. O ponto de extremidade deve permitir que você liste os repositórios para um usuário específico (por nome de usuário) (não uma org/organização).

Para obter o estilo CSS adequado, você precisa inserir um <li>para cada repositório no arquivo <ul>. O nome completo do repositório deve estar em um <h2>, e a descrição do repositório deve estar em um <p>.

Opcional 1: você pode tornar cada repositório clicável em uma nova janela, levando o usuário ao repositório GitHub.

Opcional 2: você pode usar as funções existentes startLoadere stopLoaderexportadas helpers.jspara mostrar/ocultar um carregador no botão enviar.

Descrição guiada
Você pode encontrar a URL base para a API do GitHub nesta página .

A URL base é https://api.github.com. O FetchWrapperfunciona da mesma forma com a API do GitHub. Portanto, comece importando o FetchWrappere crie uma nova instância dele e passe a URL base para a API do GitHub.

O endpoint específico de que precisamos está localizado repos#list-repositories-for-a-user .

O endpoint é /users/{username}/repose o método é GET. Isso {username}significa que você precisa substituí-lo pelo nome de usuário do usuário (o nome de usuário {}desaparecerá, isso apenas informa que você deve substituir {username}por um nome de usuário real).

Encontre no DOM o formulário, o campo de nome de usuário e ulonde os repositórios serão renderizados.

Adicione um submitouvinte de evento no formulário e impeça a ação padrão.

Use a instância de FetchWrapperpara fazer uma getsolicitação para /users/{username}/repos. Recomendamos que você comece com um nome de usuário codificado (por exemplo, jadjoubranou sindresorhus).

console.logo dataque você recebe de volta. Qual é o tipo de dados que você recebe de volta? Em quais imóveis você está interessado?

Você precisa percorrer os resultados (uma vez que contém uma lista de repositórios). Para cada repositório, você precisa usar insertAdjacentHTMLo <ul>que você selecionou anteriormente.

Para cada repositório, você precisa de full_name(nome do repositório) e description(descrição do repositório). Renderize o nome completo em um <h2>e a descrição em <p>. Ambos devem ser agrupados em um arquivo <li>.

Se você usou um nome de usuário codificado na etapa 7, certifique-se de atualizar o código para usar o nome de usuário fornecido pelo usuário no github-usernamecampo.

Opcional 1: Torne o repositório clicável agrupando o <li>com uma extensão <a href="..." target="_blank">...</a>.

Opcional 2: Importe startLoadere stopLoaderchame startLoader()no início do manipulador de eventos de envio. O startLoaderdeve receber o buttonassim, você precisará encontrá-lo no DOM. Em seguida, chame a stopLoader()função sempre que a resposta da API for concluída (seja com êxito ou com um erro). O stopLoader()deve receber o buttone, em seguida, o texto para o qual deve reverter. No nosso caso, isso é "Get repos".
 */
// Importing necessary modules
import FetchWrapper from './fetch-wrapper.js';
import { startLoader, stopLoader } from './helpers.js';

// Getting references to HTML elements
const list = document.querySelector('#repos-list'); // List to display repositories
const form = document.querySelector('#repos-form'); // Form to input username
const username = document.querySelector('#github-username'); // Input field for GitHub username
const button = document.querySelector('#get-repos'); // Button to fetch repositories

// Creating an instance of FetchWrapper for GitHub API
const API = new FetchWrapper('https://api.github.com/');

// Function to render repositories based on the provided username
const render = (username) => {
	// Fetching user repositories from GitHub API
	API.get(`users/${username}/repos`)
		.then((data) => {
			// Clearing the previous list content
			list.innerHTML = '';
			// Iterating through each repository and rendering its information
			data.forEach((repo) => {
				list.insertAdjacentHTML(
					'beforeend',
					`<li>
                        <a href="${repo.html_url}" target="_blank">
                            <h2>${repo.full_name}</h2>
							<!--Retorna vazio se o retorno for nulo -->
                            <p>${repo.description ?? ''}</p>
                        </a>
                    </li>`,
				);
			});
		})
		.catch((error) => console.log(error)) // Handling errors
		.finally(() => stopLoader(button, 'Buscar')); // Stopping loader and updating button text
};

// Adding an event listener to the form for username submission
form.addEventListener('submit', (event) => {
	startLoader(button); // Starting loader animation
	event.preventDefault(); // Preventing form submission
	render(username.value); // Rendering repositories based on the provided username
});

// Initial rendering of repositories (you might want to specify a default username)
render();
