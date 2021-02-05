export const state = () => ({
   recipes : [],
   OTFingredients:[],
   NSAingredients:[],
})

export const mutations = {
    setRecipe(state,myrecipe){
        state.recipes = myrecipe
    },
    setOTFIngredients(state,OTFIngredients){
        console.log(OTFIngredients)
        state.OTFingredients = OTFIngredients
    },
    setNSAingredients(state,NSAingredients){
        state.NSAingredients = NSAingredients
    }
}

export const actions = {
  

}