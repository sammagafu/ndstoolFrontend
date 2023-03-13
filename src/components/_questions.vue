<template>
  <Card>
    <template v-slot:content>
      
        <div
          v-for="(question, index) in displayedQuestions"
          :key="index"
          class="m-4"
        >
          <h3 class="text-xl font-semibold tracking-wide break-all">
            {{ (currentPage - 1) * itemsPerPage + index + 1 }}.
            {{ question.question }}
          </h3>
          <div class="bg-slate-200 hover:bg-cyan-600 m-2">
            <label :for="'true' + index">
              <input
                type="radio"
                :name="question.question"
                :id="'true' + index"
                value="true"
                v-model="question.userAnswer"
              />
              True
            </label>
          </div>
          <div class="bg-slate-200 hover:bg-cyan-600 m-2">
            <label :for="'false' + index">
              <input
                type="radio"
                :name="question.question"
                :id="'false' + index"
                value="false"
                v-model="question.userAnswer"
              />
              False
            </label>
          </div>
          <div class="bg-slate-200 hover:bg-cyan-600 m-2">
            <label :for="'dont-know' + index">
              <input
                type="radio"
                :name="question.question"
                :id="'dont-know' + index"
                value="dont-know"
                v-model="question.userAnswer"
              />
              Don't know
            </label>
          </div>
        </div>
        <div class="flex justify-center my-8">
          <button
            class="mx-2"
            @click="currentPage--"
            :disabled="currentPage === 1"
          >
            Previous
          </button>
          <button
            class="mx-2"
            @click="currentPage++"
            :disabled="currentPage === pageCount"
          >
            Next
          </button>
        </div>
      
    </template>
    <template v-slot:footer>
      <div class="flex justify-center gap-8">
        <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" class="p-button-info" />
        <Button
          label="Complete"
          @click="complete()"
          icon="pi pi-check"
          iconPos="right"
          class="p-button-success"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
// import TopNavigationBar from '/src/components/TopNavigationBar.vue';
import axios from "axios";
import { onMounted, ref, computed } from "vue";

const itemsPerPage = 5;

onMounted(() => {
  axios
    .get("https://opentdb.com/api.php?amount=20&type=boolean")
    .then((response) => {
      const { data } = response;
      data.results.forEach((el) => {
        el.userAnswer = "";
      });
      questions.value = data.results;
    });
});

const emit = defineEmits(["prev-page", "complete"]);

const questions = ref([]);

const currentPage = ref(1);

const pageCount = computed(() =>
  Math.ceil(questions.value.length / itemsPerPage)
);

const displayedQuestions = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return questions.value.slice(startIndex, endIndex);
});

function prevPage() {
  emit("prev-page", { pageIndex: 1 });
}
function complete() {
  emit("complete",{formData:{questions:questions.value}});
}
</script>