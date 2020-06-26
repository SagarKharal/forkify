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
	//const query = searchView.getInput();
	const query = 'pizza';
	
	if(query){
		//2 new search object and add to state 
		state.search = new Search(query);
		// 3prepare the UI for results 
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);
		try{

			
					// 4 search for the recipes 
					await state.search.getResults();
			
					//5 render results on UI
					clearLoader();
					searchView.renderResults(state.search.result);
		}catch(err){
			alert('something went wrong with search.. ')
			clearLoader();
		}





	}
	

}

elements.searchForm.addEventListener('submit', e =>{
	e.preventDefault();
	controlSearch();
});
//for testing 
window.addEventListener('load', e =>{
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
const controlRecipe = async ()=> {
	//get id from the url
	const id = window.location.hash.replace('#','');
	console.log(id);
	if(id){
		//prepare ui for the changes 
		//create new recipe object
		state.recipe = new Recipe(id);
		//for testing 
		window.r = state.recipe;
		//get recipe data 
		try{

			await state.recipe.getRecipe();
			//calculate calctime and servings 
			state.recipe.calcTime();
			state.recipe.calcServings();
	
			//render the recipe 
			console.log(state.recipe);
		}
		catch (error){
			alert('Error processing recipe!! ')
		}

	}

};


//window.addEventListener('hashchange',controlRecipe);
['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));

