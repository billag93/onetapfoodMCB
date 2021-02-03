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
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  :items="role"
                  label="Role"
                  outlined
                  class="mr-3"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-container class="ml-8 px-0" fluid>
                <v-switch
                  v-model="switch1"
                  :label="`Is this Vegetarian: ${switch1.toString()}`"
                ></v-switch>
              </v-container>
            </v-row>
            <v-row class="mb-4" align="center" justify="center">
              <v-btn large color="primary">Save</v-btn>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
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
                  <v-btn @click="overlay2 = !overlay2" small color="primary"
                    >manage ingredient</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-overlay :value="overlay2">
          <v-sheet rounded class="pa-4" color="primary">
            <v-card rounded class="pa-8">
              <v-row>
                  <v-col>
                <v-card-title>Search Your Ingredient</v-card-title>
                <v-text-field
                  class="ml-6"
                  label="Enter Your Ingredient"
                  v-model="ingredientQuery"
                ></v-text-field>
                <v-btn
                  @click="searchIngredients"
                  class="ma-8 pa-1"
                  small
                  color="primary"
                  >Submit</v-btn
                >
                <v-card-title>Ingredient Name</v-card-title>
                <v-row>
                  <v-simple-table fixed-header max-height="200px">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Quantity</th>
                          <th class="text-left">Value</th>
                          <th class="text-left">Measurement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Medium</td>
                          <td>200g</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-row>
                </v-col>
                <v-col>
                <v-row align="center" justify="center">
                  <v-card-title>Amount for Recipe</v-card-title>
                </v-row>
                <v-row>
                  <v-select
                    label="Units Of Measure"
                    :items="measures"
                    v-model="measurement"
                  >
                  </v-select>
                </v-row>
                <v-row>
                  <v-col>
                    <v-card-subtitle>Number Of Units</v-card-subtitle>
                  </v-col>
                  <v-col>
                    <v-text-field
                      label="Amount to two decimal places"
                      outlined
                      type="Number"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-btn right v-if="add" small color="success">Add</v-btn>
                  <v-btn right v-if="update" small color="primary"
                    >Update</v-btn
                  >
                  <v-btn
                    @click="overlay2 = !overlay2"
                    x-small
                    left
                    color="success"
                    >Close</v-btn
                  >
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
      mealtype: ["Breakfast", "Lunch", "Supper"],
      role: ["Main Dish", "Side Dish"],
      add: true,
      update: false,
      switch1: true,
      overlay: false,
      overlay1: false,
      overlay2: false,
      recipeURL: undefined,
      ingredientQuery: null,
      measurement: undefined,
      newsummary: undefined,
      newdescription: undefined,
      myrecipe: [],
      measures: [
        "g",
        "cup",
        "teaspoon",
        "tablespoon",
        "ml",
        "L",
        "mg",
        "fluid ounce",
        "lb",
      ],
      ingredients: [],
      description: null,
      summary: null,
    };
  },
  methods: {
    changeSummary() {
      this.overlay = !this.overlay;
      this.myrecipe.description = this.newsummary;
    },
    changeDescription() {
      this.overlay1 = !this.overlay1;
      this.myrecipe.description = this.newdescription;
    },
    getRecipeJson() {
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
          console.log(result);
          this.myrecipe = result[0];
          this.ingredients = this.myrecipe.ingredients;
          this.description = this.myrecipe.description;
          this.summary = this.myrecipe.description;
          //save result to vuex
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchIngredients() {
      this.disabled = true;
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
          console.log(result);
          if (result.data.length <= 0) {
            this.queryNSApi();
          } else {
            // set returned ingredients to a var
            // save otf results to vuex
          }
        })
        .catch((err) => {
          console.log(err.reponse);
          this.disabled = false;
        });
    },

    queryNSApi() {
      this.$axios
        .$post(
          "https://nutri-s1.p.rapidapi.com/nutrients",
          {
            query: "100 grams " + this.ingredientQuery.replace(/ /g, "-").toLowerCase(),
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
          console.log(result.data);
          //save to vuex
        })
        .catch((err) => {
          console.log(err.reponse);
          this.disabled = false;
        });
    },
    createNewIngredient(item) {
           axios
               .post(
                   "/api/v2/meal-builder/ingredients/create",
                   {
                       ingredient: item,
                   },
                   {
                       headers: {
                           "Content-Type": "application/json",
                       },
                   }
               )
               .then((result) => {
                   console.log(result.data);
                   if (result.status == 200) {
                       this.ingredIndex++;
                       this.disabled = false;
                       this.searchResult = false;
                       this.otfResults.push(result.data);
                   }
               })
               .catch((err) => {
                   console.log(err.reponse);
               });
       },

  },
};
</script>

<style lang="scss" scoped>
</style>