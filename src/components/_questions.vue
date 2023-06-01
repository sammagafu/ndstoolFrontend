<template>
  <Card>
    <template v-slot:content>
      <div>
        <!-- <TopNavigationBar/> -->
        <div v-for="(question, index) in questions" :key="index" class="m-4">
          <div v-if="question.id === currentPage">
            <h1 class="text-3xl font-bold mb-3">{{ question.category }}</h1>
            <div v-for="(quest, ind) in question.questions" :key="ind">
              <h3 class="text-xl font-semibold tracking-wide break-all">
                {{ ind + 1 }}.
                {{ quest.question }}
              </h3>
              <div class="bg-slate-200 hover:bg-cyan-600 m-2">
                <label :for="'yes' + ind">
                  <!-- <RadioButton v-model="value" inputId="ingredient1" name="pizza" value="Cheese" /> -->
                  <input type="radio" :name="quest.question" :id="'yes' + ind" value="yes" v-model="quest.userAnswer" />
                  Yes
                </label>
              </div>
              <div class="bg-slate-200 hover:bg-cyan-600 m-2">
                <label :for="'no' + ind">
                  <input type="radio" :name="quest.question" :id="'no' + ind" value="no" v-model="quest.userAnswer" />
                  No
                </label>
              </div>
            </div>
          </div>
          <div class="m-4" v-if="question.id === currentPage">
            <label for="">
              <Textarea v-model="question.comment" rows="" :placeholder="'Comment for '+question.category " class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </label>
          </div>
        </div>

        <div class="flex justify-between my-8 m-4">
          <button class="mx-2" @click="decrement()" :disabled="currentPage === 1">
            Previous
          </button>
          {{ currentPage }}/{{ questions.length }}
          <button class="mx-2" @click="incrementPage()" :disabled="currentPage === questions.length">
            Next 
          </button>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="flex justify-center gap-8">
        <!-- <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" class="p-button-info" /> -->
        <Button label="Submit" @click="complete()" class="p-button-success" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import TopNavigationBar from "/src/components/TopNavigationBar.vue";
import axios from "axios";
import { onMounted, ref, computed } from "vue";

const emit = defineEmits(["prev-page", "complete"]);

// const answer = ref('');


onMounted(() => {
  axios.get("category").then((response) => {
    // const { data } = response;
    response.data.forEach((el) => {
      el.questions.forEach((vv) => {
        vv.userAnswer = "";
      })
      el.comment = "";
    });
    questions.value = response.data;
    // console.log("vvv", questions.value);
  });
});

const questions = ref([]);

const currentPage = ref(1);

const decrement = () => {
  currentPage.value--;
  scrollToTop();
};

const incrementPage = () => {
  currentPage.value++;
  scrollToTop();
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
function prevPage() {
  emit("prev-page", { pageIndex: 1 });
}
function complete() {
  const isValid = validateForm();
  if (isValid) {
    emit("complete", { formData: { questions: questions.value } });
  }
}
function validateForm() {
  let isValid = true;

  questions.value.forEach((question) => {
    const comment = question.comment.trim();
    const answers = question.questions.filter((quest) => quest.userAnswer !== "");

    if (comment === "" && answers.length < 3) {
      isValid = false;
    } else if (comment !== "" && answers.length < 3) {
      isValid = false;
    } else if (comment === "" && answers.length >= 3) {
      isValid = false;
    }
  });

  return isValid;
}
</script>
