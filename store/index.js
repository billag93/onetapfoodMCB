export const state = () => ({
    recipes: [],
    OTFingredients: [],
    NSAingredients: [],
    ingredients: []
})

export const mutations = {
    setRecipe(state, myrecipe) {
        state.recipes = myrecipe
    },
    setOTFIngredients(state, Ingredients) {
        state.OTFingredients = [...state.OTFingredients, ...Ingredients]
    },
    pushOTFIngredient(state, ingredient){
        state.OTFingredients.push(ingredient)
    },
    setNSAingredients(state, NSAingredients) {
        state.NSAingredients = NSAingredients
    },
    addIngredient(state, ingredient) {
        let index = state.ingredients.findIndex((el)=>{
            return el.id == ingredient.id
        })
        if(index>=0){
            state.ingredients.splice(index,1,ingredient)
        }
        else{
            state.ingredients.push(ingredient)
        }
    },
    removeIngredient(state, ingredient) {
        let index = state.ingredients.findIndex((el)=>{
            return el.id == ingredient.id
        })
        if(index>=0){
            state.ingredients.splice(index,1)
        }
    },
    clearIngredients(state){
        state.ingredients = []
    }
}


export const actions = {
   

}