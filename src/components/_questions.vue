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
                :name="question.id"
                :id="'true' + index"
                value="true"
                v-model="question.userAnswer"
              />
              Yes
            </label>
          </div>
          <div class="bg-slate-200 hover:bg-cyan-600 m-2">
            <label :for="'false' + index">
              <input
                type="radio"
                :name="question.id"
                :id="'false' + index"
                value="false"
                v-model="question.userAnswer"
              />
              No
            </label>
          </div>
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
    .get("question")
    .then((response) => {
      // const { data } = response;
      response.data.forEach((el) => {
        el.userAnswer = "";
      });
      questions.value = response.data;
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
  // console.log('question.id :>> ', questions.id);
  emit("complete",{formData:{patientQuestion:questions.value}});
}
</script>