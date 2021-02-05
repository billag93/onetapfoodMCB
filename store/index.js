export const state = () => ({
   recipes : [],
   OTFingredients:[],
   NSAingredients:[] 
})

export const mutations = {
    setRecipe(state,myrecipe){
        state.recipes = myrecipe
    },
    setOTFIngredient(state,OTFIngredient){
        state.OTFIngredient = OTFIngredient
    },
    setNSAingredients(state,NSAingredients){
        state.NSAingredients = NSAingredients
    }
}

export const actions = {
  

}