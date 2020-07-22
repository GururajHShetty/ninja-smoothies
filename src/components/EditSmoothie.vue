<template>
  <div class="edit-smoothie container" v-if="smoothie">
    <h2>Edit {{ smoothie.title }} Smoothie</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <div class="field" v-if="smoothie.ingredients.length">
        <label>Ingredients : </label>
        <span
          v-for="(ing, index) in smoothie.ingredients"
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
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import dbGod from "@/firebaseGod/init";
import slugify from "slugify";
export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: "",
      feedback: null
    };
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          lower: true
        });
        dbGod
          .collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
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
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You should enter a ingredient";
      }
    },
    editIng(index, ing) {
      this.another = ing;
      this.smoothie.ingredients.splice(index, 1);
    }
  },
  created() {
    let ref = dbGod
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(response => {
      this.smoothie = response.docs[0].data();
      this.smoothie["id"] = response.docs[0].id;
    });
  }
};
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-smoothie .field {
  margin: 20px auto;
}

.edit-smoothie .ingredients {
  display: inline-block;
}

.edit-smoothie .ing {
  cursor: pointer;
}
</style>
