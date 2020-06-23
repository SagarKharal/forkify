import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements,renderLoader, clearLoader } from './views/base';

//Global state of the application 
//search object 
//current recipe object 
//shoppling list object 
// liked recipes 
const state = {
 
};

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

