<template>
  <div class="add-smoothie container">
    <h2 class="center align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input
          type="text"
          name="title"
          v-model="title"
          placeholder="Enter title"
        />
      </div>
      <div class="field" v-if="ingredients.length">
        <label>Ingredients : </label>
        <span
          v-for="(ing, index) in ingredients"
          :key="index"
          class="ingredients"
        >
          <span class="chip ing" @click="editIng(index, ing)"
            >{{ ing }}<i class="material-icons">edit</i></span
          >
        </span>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient:</label>
        <input
          type="text"
          name="add-ingredient"
          v-model="another"
          @keydown.tab.prevent="addIngredient"
          placeholder="Enter a ingredient and press tab"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import dbGod from "@/firebaseGod/init";
import slugify from "slugify";
export default {
  name: "AddSmoothie",
  data() {
    return {
      title: "",
      another: "",
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    AddSmoothie() {
      if (this.title) {
        this.feedback = null;
        this.slug = slugify(this.title, {
          replacement: "-",
          lower: true
        });
        dbGod
          .collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => console.log(err));
      } else {
        this.feedback = "You need to add a title";
      }
    },
    addIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You should enter a ingredient";
      }
    },
    editIng(index, ing) {
      this.another = ing;
      this.ingredients.splice(index, 1);
    }
  }
};
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.add-smoothie .field {
  margin: 20px auto;
}

.add-smoothie .ingredients {
  display: inline-block;
}

.add-smoothie .ing {
  cursor: pointer;
}
</style>
