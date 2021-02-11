<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <v-card class="mt-3" width="100%">
            <v-row>
              <v-card-title class="ml-4">Get Recipe JSON</v-card-title>
            </v-row>
            <v-row align="center" justify="center">
              <v-text-field
                class="ml-6"
                label="Enter Recipe URL"
                v-model="recipeURL"
              ></v-text-field>
              <v-btn
                @click="getRecipeJson"
                class="ma-8 pa-1"
                small
                color="primary"
                >Submit</v-btn
              >
            </v-row>
          </v-card>
        </v-row>
        <v-row>
          <v-card class="mt-6" width="100%">
            <v-card-title>{{ myrecipe.name }}</v-card-title>
            <v-card outlined class="ma-3 pa-4">
              <v-card-subtitle>Summary</v-card-subtitle>
              <p>
                {{ summary }}
              </p>
              <v-overlay :value="overlay">
                <v-sheet rounded class="pa-4" color="primary">
                  <v-card rounded class="pa-8">
                    <v-card-title>Enter New Summary</v-card-title>
                    <v-textarea v-model="summary"></v-textarea>
                    <v-btn @click="overlay = !overlay" color="success"
                      >Click here for new summary</v-btn
                    >
                  </v-card>
                </v-sheet>
              </v-overlay>
            </v-card>
            <v-btn
              class="ml-6 mt-2"
              @click="overlay = !overlay"
              small
              color="primary"
              >Edit Summary</v-btn
            >
            <v-card outlined class="ma-3 pa-4">
              <v-card-subtitle>Description</v-card-subtitle>
              <p>
                {{ description }}
              </p>
              <v-overlay :value="overlay1">
                <v-sheet rounded class="pa-4" color="primary">
                  <v-card rounded class="pa-8">
                    <v-card-title>Enter New Description</v-card-title>
                    <v-textarea v-model="description"></v-textarea>
                    <v-btn @click="overlay1 = !overlay1" color="success"
                      >Click here for new description</v-btn
                    >
                  </v-card>
                </v-sheet>
              </v-overlay>
            </v-card>
            <v-btn
              class="ml-6 mt-2 mb-2"
              @click="overlay1 = !overlay1"
              small
              color="primary"
              >Edit Description</v-btn
            >
            <v-row>
              <v-col>
                <v-select
                  :items="mealtype"
                  label="Meal Type"
                  outlined
                  class="ml-3"
                  v-model="currentType"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :items="role"
                  label="Role"
                  outlined
                  class="mr-3"
                  v-model="currentRole"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  :items="Category"
                  item-value="id"
                  item-text="text"
                  label="Category"
                  outlined
                  class="mx-6"
                  v-model="currentCategory"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-container class="ml-8 px-0" fluid>
                <v-switch
                  v-model="currentveg"
                  :label="`Is this Vegetarian: ${currentveg.toString()}`"
                ></v-switch>
              </v-container>
            </v-row>
            <v-row class="mb-4" align="center" justify="center">
              <v-btn @click="saveMealComponent" large color="primary"
                >Save Recipe</v-btn
              >
            </v-row>
          </v-card>
        </v-row>
      </v-col>
      <v-col>
        <v-col>
          <v-simple-table fixed-header max-height="870px">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">In Recipe?</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in ingredients" :key="item.name">
                  <td>{{ item }}</td>
                  <td>{{ item.recipe }}</td>
                  <td>
                    <v-btn @click="openOverlay(item)" small color="primary"
                      >manage ingredient</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col align="center" justify="center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
            v-if="isLoading"
          ></v-progress-circular>
        </v-col>
        <v-col align="center" justify="center">
          <v-card class="ma-2 pa-6" >
            <v-btn @click="attachIngredients" large color="success"
              >Add Your Ingredient</v-btn
            >
          </v-card>
        </v-col>
        <v-overlay :value="overlay2">
          <v-sheet rounded class="pa-4" color="primary">
            <v-card width="900px" rounded class="pa-8">
              <v-row>
                <v-card-title
                  >Search For {{ ingredientNameEditing }}</v-card-title
                >
              </v-row>
              <v-row>
                <v-col align="center" justify="center">
                  <v-card-title class="mx-8"
                    >Search Your Ingredient</v-card-title
                  >
                  <v-text-field
                    class="mx-8"
                    label="Enter Your Ingredient"
                    v-model="ingredientQuery"
                  ></v-text-field>
                  <v-btn
                    @click="searchIngredients"
                    class="ma-1 pa-2"
                    small
                    color="primary"
                    >Submit</v-btn
                  >
                  <v-row>
                    <v-col>
                      <v-select
                        :items="OTFingredients"
                        item-text="name"
                        item-value="id"
                        label="OTF Ingredients"
                        outlined
                        class="ma-2"
                        v-model="currentOTFingredient"
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-btn
                        class="ma-2"
                        @click="queryNSApi"
                        small
                        color="primary"
                        >Search Ingredient API</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-select
                      :items="NSAingredients"
                      item-text="food_name"
                      item-value="food_name"
                      label="Find Other Ingredients Here"
                      outlined
                      class="mx-5"
                      v-model="currentNSAingredient"
                    ></v-select>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-card-title>{{ currentName }}</v-card-title>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-simple-table fixed-header height="200px">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Quantity</th>
                            <th class="text-left">Measure</th>
                            <th class="text-left">Serving Weight</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in currentConversions"
                            :key="item.measure"
                          >
                            <td>{{ item.qty }}</td>
                            <td>{{ item.measure }}</td>
                            <td>{{ item.serving_weight }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-row>
                </v-col>
                <v-col>
                  <v-row align="center" justify="center">
                    <v-card-title class="mt-3">Amount for Recipe</v-card-title>
                  </v-row>
                  <v-row>
                    <v-select
                      label="Units Of Measure"
                      :items="measures"
                      v-model="unit"
                    >
                    </v-select>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-card-subtitle class="text-subtitle-1"
                        >Number Of Units</v-card-subtitle
                      >
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="Amount to two decimal places"
                        outlined
                        type="Number"
                        v-model="value"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col align="center" justify="center">
                      <v-btn
                        right
                        @click="addIngredient"
                        :disabled="
                          currentOTFingredient == null ||
                          unit == null ||
                          value == null
                        "
                        small
                        color="primary"
                        >{{ isInStore ? "Update" : "Add" }}</v-btn
                      >
                      <v-btn
                        right
                        @click="removeIngredient"
                        v-if="isInStore"
                        small
                        color="primary"
                        >Remove</v-btn
                      >
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-btn @click="closeOverlay" small right color="primary"
                      >Close</v-btn
                    >
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-btn
                      class="ma-4"
                      @click="createNewIngredient()"
                      color="success"
                      >Save Ingredient to OTF</v-btn
                    >
                  </v-row>
                  <v-row>
                    <v-progress-circular
                      :size="70"
                      :width="7"
                      color="primary"
                      indeterminate
                      v-if="isLoading"
                    ></v-progress-circular>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-sheet>
        </v-overlay>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      mealtype: ["Breakfast", "Lunch", "Supper"],
      currentType: null,
      role: ["Main Dish", "Side Dish"],
      currentRole: null,
      add: false,
      remove: false,
      update: false,
      overlay: false,
      overlay1: false,
      overlay2: false,
      currentveg: false,
      recipeURL: undefined,
      ingredientNameEditing: null,
      Category: [
        {text:"Vegetable",id:0},
        {text:"Fruit", id:1},
        {text:"Grains",id:2},
        {text:"Dairy",id:3},
        {text:"Meat", id:4},
        {text:"Eggs",id:5},
        {text:"Nuts",id:6},
      ],
      currentCategory: null,
      ingredientQuery: null,
      ingredient: null,
      ingredients: [],
      veg: null,
      myrecipe: [],
      measures: [
        
                "cup",
                "Tbsp",
                "tsp",
                "g",
                "kg",
                "lb",
                "liter",
                "ml",
                "fl oz",
                "oz",
                "qt",
                "gallon",
                "small",
                'medium',
                'large'
      ],
      currentOTFingredient: null,
      currentNSAingredient: null,
      description: null,
      summary: null,
      unit: null,
      value: null,
      otfComponent: null,
    };
  },
  computed: {
    confirmedIngred(context) {
      return context.$store.state.ingredients;
    },
    isInStore(context) {
      if (this.currentOTFingredient == null) {
        return false;
      } else {
        let index = context.$store.state.ingredients.findIndex((el) => {
          return el.id == this.currentOTFingredient;
        });
        if (index >= 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    OTFingredients(context) {
      return context.$store.state.OTFingredients;
    },
    NSAingredients(context) {
      return context.$store.state.NSAingredients;
    },
    currentName(context) {
      let ingredient = context.$store.state.OTFingredients.filter((item) => {
        return item.id == this.currentOTFingredient;
      });
      if (ingredient.length > 0) {
        let name = ingredient[0].name;
        console.log(name);
        return name;
      } else {
        return null;
      }
    },
    currentConversions(context) {
      let ingredient = context.$store.state.OTFingredients.filter((item) => {
        return item.id == this.currentOTFingredient;
      });
      if (ingredient.length > 0) {
        let conversions = JSON.parse(ingredient[0].conversions);
        console.log(conversions);
        return conversions;
      } else {
        return null;
      }
    },
  },
  methods: {
    openOverlay(str) {
      this.ingredientNameEditing = str;
      this.overlay2 = true;
    },
    closeOverlay() {
      this.currentOTFingredient = null;
      this.ingredientNameEditing = null;
      this.ingredientQuery = null;
      this.currentNSAingredient= null;
      this.value = null;
      this.overlay2 = false;
    },
    removeIngredient() {
      this.$store.commit("removeIngredient", {
        id: this.currentOTFingredient,
        amount: {
          unit: this.unit,
          value: this.value,
        },
      });
    },
    addIngredient() {
      this.$store.commit("addIngredient", {
        id: this.currentOTFingredient,
        amount: {
          unit: this.unit,
          value: this.value,
        },
      });
    },
    changeSummary() {
      this.overlay = !this.overlay;
      this.myrecipe.description = this.newsummary;
    },
    changeDescription() {
      this.overlay1 = !this.overlay1;
      this.myrecipe.description = this.newdescription;
    },
    getRecipeJson() {
      this.isLoading = true;
      this.$axios
        .$post(
          "https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi",
          this.recipeURL,
          {
            headers: {
              "x-rapidapi-host": "mycookbook-io1.p.rapidapi.com",
              "x-rapidapi-key":
                "84963ea5f7mshdff757e386ee4bap1be221jsn90125f74a6e6",
              "content-type": "text/plain",
            },
          }
        )
        .then((result) => {
          this.isLoading = false;
          console.log(result);
          this.myrecipe = result[0];
          this.ingredients = this.myrecipe.ingredients;
          this.description = this.myrecipe.description;
          this.summary = this.myrecipe.description;
          this.$store.commit("setRecipe", myrecipe);
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    searchIngredients() {
      this.isLoading = true;
      this.$axios
        .$post(
          "http://api.onetapfood.ca/api/v2/meal-builder/ingredients/search",
          {
            string: this.ingredientQuery,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((result) => {
          this.isLoading = false;
          // console.log(result);
          this.$store.commit("setOTFIngredients", result);
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },

    queryNSApi() {
      this.isLoading = true;
      this.$axios
        .$post(
          "https://nutri-s1.p.rapidapi.com/nutrients",
          {
            query:
              "100 grams " +
              this.ingredientQuery.replace(/ /g, "-").toLowerCase(),
          },
          {
            headers: {
              "x-rapidapi-host": "nutri-s1.p.rapidapi.com",
              "x-rapidapi-key":
                "84963ea5f7mshdff757e386ee4bap1be221jsn90125f74a6e6",
              "content-type": "application/json",
              accept: "application/json",
              useQueryString: true,
            },
          }
        )
        .then((result) => {
          this.isLoading = false;
          console.log(result);
          this.$store.commit("setNSAingredients", result.foods);
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err.reponse);
          this.disabled = false;
        });
    },
    createNewIngredient() {
      let ingredient = this.NSAingredients.filter((item) => {
        return item.food_name == this.currentNSAingredient;
      });
      if (ingredient.length > 0) {
        this.isLoading = true;
        this.$axios
          .$post(
            "http://api.onetapfood.ca/api/v2/meal-builder/ingredients/create",
            {
              ingredient: ingredient[0],
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((result) => {
            this.isLoading = false;
            console.log(result);
            this.$store.commit("pushOTFIngredient", result);
            this.currentOTFingredient = result.id;
          })
          .catch((err) => {
            this.isLoading = false;
            console.log(err.reponse);
          });
      }
    },

    saveMealComponent() {
      this.isLoading = true;
      const formValid =
        this.description != null &&
        this.summary != null &&
        this.currentType != null &&
        this.currentRole != null &&
        this.currentCategory != null;
      if (formValid) {
        this.$axios.$post("http://api.onetapfood.ca/api/v2/meal-builder/component", {
            raw: this.myrecipe,
            role: this.currentRole,
            type: this.currentType,
            category: this.currentCategory,
            veg: this.currentveg,
            summary: this.summary,
            description: this.description,
          })
          .then((result) => {
            console.log(result)
            this.isLoading = false;
            this.componentSave = false;
            this.otfComponent = result;
          })
          .catch((err) => {
            this.isLoading = false;
            console.log(err);
          });
      } else {
        console.log("validation failed");
      }
    },

    attachIngredients() {
      this.isLoading = true;
      console.log("lets go!");
      let ready = this.otfComponent != null && this.confirmedIngred.length > 0;
      if (ready) {
        this.$axios
          .$post("http://api.onetapfood.ca/api/v2/meal-builder/ingredients/attach", {
            ingredients: this.confirmedIngred,
            componentId: this.otfComponent.id,
          })
          .then((result) => {
            this.isLoading = false;
            console.log(result);
          })
          .catch((err) => {
            this.isLoading = false
          });
      } else {
        this.isLoading = false;
        console.log(err)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>