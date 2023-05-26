<template>
  <div>
    <!-- <TopNavigationBar/> -->
    <div v-for="(question, index) in questions" :key="index" class="m-4">
      <div v-if="question.id === currentPage">
        <h1 class=" text-3xl">{{ question.category }}</h1>
        <v-for v-for="(quest, ind) in question.questions" :key="ind">
          <h3 class="text-xl font-semibold tracking-wide break-all">
            <!-- {{ (currentPage - 1) * question.questions.length + ind + 1 }}. -->
             {{ quest.question }}
          </h3>
          <div class="bg-slate-200 hover:bg-cyan-600 m-2">
            <label :for="'true' + index">
              <input type="radio" :name="quest.question" :id="'true' + index" value="true" v-model="quest.userAnswer" />
              True
            </label>
          </div>
          <div class="bg-slate-200 hover:bg-cyan-600 m-2">
            <label :for="'false' + index">
              <input type="radio" :name="quest.question" :id="'false' + index" value="false" v-model="quest.userAnswer" />
              False
            </label>
          </div>
        </v-for>
      </div>
    </div>
    <div class="flex justify-center my-8">
      <button class="mx-2" @click="decrementPage()" :disabled="currentPage === 1">
        Previous
      </button>
      <button class="mx-2" @click="currentPage= currentPage+1" :disabled="currentPage === questions.length">
        Next {{ currentPage }}/{{ questions.length }}
      </button>
    </div>
  </div>
</template>

<script setup>
import TopNavigationBar from "/src/components/TopNavigationBar.vue";
import axios from "axios";
import { onMounted, ref, computed } from "vue";

onMounted(() => {
  axios.get("category").then((response) => {
    // const { data } = response;
    response.data.forEach((el) => {
      el.userAnswer = "";
    });
    questions.value = response.data;
    // console.log("vvv", questions.value);
  });
});

const questions = ref([]);

const currentPage = ref(1);

const decrementPage = () => {
  currentPage.value--;
};

// const pageCount = computed(() => Math.ceil(questions.value.length / itemsPerPage));

// const displayedQuestions = computed(() => {
//   const startIndex = (currentPage.value - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   return questions.value.slice(startIndex, endIndex);
// });
</script>
