import Search from './models/Search';
import Recipe from './models/Recipe.js';
import * as searchView from './views/searchView';
import { elements,renderLoader, clearLoader } from './views/base';

//Global state of the application 
//search object 
//current recipe object 
//shoppling list object 
// liked recipes 
const state = {
 
};
//Search controller 

const controlSearch = async () => {  
	//1 get query from tehe view 
	const query = searchView.getInput();
	
	if(query){
		//2 new search object and add to state 
		state.search = new Search(query);
		// 3prepare the UI for results 
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes)


		// 4 search for the recipes 
		await state.search.getResults();

		//5 render results on UI
		clearLoader();
		searchView.renderResults(state.search.result);




	}
	

}

elements.searchForm.addEventListener('submit', e =>{
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener("click",e => {
	const btn = e.target.closest(".btn-inline");
	if(btn){
		const goToPage = parseInt(btn.dataset.goto,10);
		searchView.clearResults();
		searchView.renderResults(state.search.result,goToPage);
		
	}
;

});

//Recipe controller 
const controlRecipe = ()=> {
	const id = window.location.hash;
	console.log(id);

};


window.addEventListener('hashchange',controlRecipe);

