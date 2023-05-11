<template>
  <div
    class="px-4 py-8 md:px-6 lg:px-8 flex justify-content-center align-items-center"
  >
    <div v-if="isCompleted" class="surface-card border-round shadow-2 p-4">
      <div class="text-900 font-medium mb-2 text-xl">Submit</div>
      <p class="mt-0 mb-4 p-0 line-height-3">
        All Questions have been answered
      </p>
      <div class="flex justify-content-center gap-5">
        <Button
          label="Submit Answers"
          @click="complete"
          class="text-blue-400 hover:text-white"
        />
      </div>
    </div>
    <div v-else class="surface-card border-round shadow-2 p-4">
      <div class="text-900 font-medium mb-2 text-xl">
        {{ templateCategoryName }}
      </div>
      <p class="mt-0 mb-4 p-0 line-height-3">{{ "Qn: " + templateQuestion }}</p>
      <div class="flex justify-content-center gap-5">
        <Button
          label="No"
          @click="generateQuestions(averageAge, 'No')"
          class="text-blue-400 hover:text-white"
        />
        <Button
          label="Yes"
          @click="generateQuestions(averageAge, 'Yes')"
          class="text-blue-400 hover:text-white"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const allQuestions = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("category");
    allQuestions.value = response.data.map((el) => ({ ...el, userAnswer: "" }));
    generateQuestions(averageAge, "");
  } catch (error) {
    console.error(error);
  }
});

let templateCategoryName = ref("");
let templateQuestion = ref("");
const averageAge = 96;

let questionIndex = 0;
let categoryId = 1;
let answeredQuestions = [];
let categoriesQuestionNew = []; //all questions for specific category
let finalAnsweredArrayWithAnswers = [];
let questionsByCategoryWholeObject = [];
let isCompleted=ref(false)

/* Check consecutive Three No's */
function findFirstConsecutiveThreeNo(data) {
  if (data.length < 3) {
    return;
  }
  let consecutiveNoCount = 0;
  for (let i = data.length - 1; i >= data.length - 3; i--) {
    if (data[i].userAnswer === "No") {
      consecutiveNoCount++;
      if (consecutiveNoCount === 3) {
        return data[i];
      }
    } else {
      consecutiveNoCount = 0;
    }
  }
  return;
}

function findQuestionsByCaegoryId(categoryId) {
  return allQuestions.value.sort().filter((el) => el.id == categoryId);
}

function generateQuestions(age, selectedValue) {
  let patientAge = age; // Should be accesable from entered patient data
  questionsByCategoryWholeObject = findQuestionsByCaegoryId(categoryId);
  const [question] = questionsByCategoryWholeObject;

  categoriesQuestionNew = question?.questions.sort((a, b) => a.age - b.age); // Sorting all questions in by age

  // Checking if there is questions on that category
  if (answeredQuestions.length === 0) {
    if (question?.questions.length === 0) {
      categoryId = categoryId + 1;
      templateCategoryName.value = question.category; //setting category name
      templateQuestion.value = "No questions under this category"; //settign question in template
      //  if is't Show message no questions under this category and show next button
    } else {
      // if there is questions ==>Continue
      categoriesQuestionNew?.forEach((el, index) => {
        if (el.age == patientAge) {
          //filter question by age of patient
          answeredQuestions.push({ ...el }); // Push first item in array that match age of patient
          questionIndex = index;
          templateQuestion.value = el.question;
          templateCategoryName.value = question.category;
        }
      });
    }
  }

  if (answeredQuestions.length > 0) {
    if (selectedValue == "Yes") {
      answeredQuestions.forEach((el, index) => {
        if (index == answeredQuestions.length - 1) {
          el.userAnswer = "Yes";
        }
      });

      if (questionIndex <= categoriesQuestionNew?.length) {
        // Checking if that question is answered or not
        let lastMatchIndex = -1;

        for (let i = 0; i < answeredQuestions.length; i++) {
          const item = answeredQuestions[i];
          const index = categoriesQuestionNew.findIndex(
            (x) => x.id === item.id
          );
          if (index !== -1 && index > lastMatchIndex) {
            lastMatchIndex = index;
          }
        }

        if (
          lastMatchIndex !== -1 &&
          lastMatchIndex < categoriesQuestionNew.length - 1
        ) {
          if (
            Object.keys({
              ...Object(categoriesQuestionNew[lastMatchIndex + 1]),
            }).length === 0
          ) {
            finalAnsweredArrayWithAnswers.push(answeredQuestions.at(-1));
            categoryId = categoryId + 1;
            answeredQuestions.length = 0;
            questionsByCategoryWholeObject =
              findQuestionsByCaegoryId(categoryId);

            const [question] = questionsByCategoryWholeObject;

            categoriesQuestionNew = question?.questions.sort((a,b)=>a.age-b.age);

            if (question?.questions.length === 0) {
              categoryId = categoryId + 1;
              templateCategoryName.value = question.category; //setting category name
              templateQuestion.value = "No questions under this category"; //settign question in template
              //  if is't Show message no questions under this category and show next button
            } else {
              // if there is questions ==>Continue
              categoriesQuestionNew?.forEach((el, index) => {
                if (el.age == patientAge) {
                  answeredQuestions.push({ ...el }); // Push first item in array that match age of patient
                  questionIndex = index;
                }
                templateQuestion.value = el.question;
                templateCategoryName.value = question.category;
              });
            }
          } else {
            answeredQuestions.push({
              ...Object(categoriesQuestionNew[lastMatchIndex + 1]),
            });
            questionIndex = lastMatchIndex + 1;
            answeredQuestions.forEach((el,index)=>{
              if (index == answeredQuestions.length - 1) {
             templateQuestion.value = el.question;
          }
            })
          }
        } 
        else {
          if (
            Object.keys({
              ...Object(categoriesQuestionNew[lastMatchIndex + 1]),
            }).length === 0
          ) {
            finalAnsweredArrayWithAnswers.push(answeredQuestions.at(-1));
            categoryId = categoryId + 1;
            answeredQuestions.length = 0;

            if(categoryId==5){
                isCompleted.value=true
              }
            questionsByCategoryWholeObject =findQuestionsByCaegoryId(categoryId);

            const [question] = questionsByCategoryWholeObject;

            categoriesQuestionNew = question?.questions.sort((a,b)=>a.age-b.age);

            if (question?.questions.length === 0) {
              categoryId = categoryId + 1;
              templateCategoryName.value = question.category; //setting category name
              templateQuestion.value = "No questions under this category"; //settign question in template
              //  if is't Show message no questions under this category and show next button
            } else {
              // if there is questions ==>Continue
              categoriesQuestionNew?.forEach((el, index) => {
                if (el.age == patientAge) {
                  answeredQuestions.push({ ...el }); // Push first item in array that match age of patient
                  questionIndex = index;
                  templateQuestion.value = el.question;
                  templateCategoryName.value = question.category;
                }
              });
            }
          } else {
            answeredQuestions.push({
              ...Object(categoriesQuestionNew[questionIndex + 1]),
            });
            questionIndex = questionIndex + 1;
            answeredQuestions.forEach((el,index)=>{
              if (index == answeredQuestions.length - 1) {
             templateQuestion.value = el.question;
          }
            })
          }
        }
      }
    }

    if (selectedValue == "No") {
      answeredQuestions.forEach((el, index) => {
        if (index == answeredQuestions.length - 1) {
          el.userAnswer = "No";
          templateQuestion.value = el.question;
        }
      });
      if (findFirstConsecutiveThreeNo(answeredQuestions) !== undefined) {
        finalAnsweredArrayWithAnswers.push(
          findFirstConsecutiveThreeNo(answeredQuestions)
        );
        categoryId = categoryId + 1;
        answeredQuestions.length = 0;
        if(categoryId==5){
          isCompleted.value=true
        }

        questionsByCategoryWholeObject = findQuestionsByCaegoryId(categoryId);

        const [question] = questionsByCategoryWholeObject;

        categoriesQuestionNew = question?.questions.sort((a,b)=>a.age-b.age);

        if (question?.questions.length === 0) {
          categoryId = categoryId + 1;
          templateCategoryName.value = question.category; //setting category name
          templateQuestion.value = "No questions under this category"; //settign question in template
          //  if is't Show message no questions under this category and show next button
        } else {
          // if there is questions ==>Continue
          categoriesQuestionNew?.forEach((el, index) => {
            if (el.age == patientAge) {
              answeredQuestions.push({ ...el }); // Push first item in array that match age of patient
              questionIndex = index;
            }
            templateQuestion.value = el.question;
            templateCategoryName.value = question.category;
          });
        }
      }

      /**
       * Checking for index vs availableQuestions
       */
      if (questionIndex <= categoriesQuestionNew?.length) {
        let firstMatchIndex = categoriesQuestionNew.length - 1;

        for (let i = 0; i < answeredQuestions.length; i++) {
          const item = answeredQuestions[i];
          const index = categoriesQuestionNew.findIndex(
            (x) => x.id === item.id
          );
          if (index !== -1 && index < firstMatchIndex) {
            firstMatchIndex = index;
          }
        }
          
        if (
          firstMatchIndex !== categoriesQuestionNew.length - 1 &&
          firstMatchIndex >= 0
        ) {
          
          if( firstMatchIndex - 1==-1){
            finalAnsweredArrayWithAnswers.push(answeredQuestions.slice(-3).find(el=>el.userAnswer=='No'));
            categoryId = categoryId + 1;
            answeredQuestions.length = 0;
            questionsByCategoryWholeObject =
              findQuestionsByCaegoryId(categoryId);

              const [question] = questionsByCategoryWholeObject;

            categoriesQuestionNew = question?.questions.sort((a,b)=>a.age-b.age);
            answeredQuestions.length=0

            if (question?.questions.length === 0) {
              categoryId = categoryId + 1;
              templateCategoryName.value = question.category; //setting category name
              templateQuestion.value = "No questions under this category"; //settign question in template
              //  if is't Show message no questions under this category and show next button
            } else {
              if(categoryId==5){
                isCompleted.value=true
              }else{
                categoriesQuestionNew?.forEach((el, index) => {
                  if (el.age == patientAge) {
                    answeredQuestions.push({ ...el }); // Push first item in array that match age of patient
                    questionIndex = index;
                    templateQuestion.value = el.question;
                    templateCategoryName.value = question.category;
                  }
                });
              }
            }
          }else{
            answeredQuestions.push({
              ...Object(categoriesQuestionNew[firstMatchIndex - 1]),
            });
            questionIndex = firstMatchIndex - 1;
            answeredQuestions.forEach((el, index) => {
          if (index == answeredQuestions.length - 1) {
            templateQuestion.value = el.question;
          }
        });
          }
        } else {
          answeredQuestions.push({
            ...Object(categoriesQuestionNew[questionIndex - 1]),
          });
          questionIndex = questionIndex - 1;
          answeredQuestions.forEach((el, index) => {
        if (index == answeredQuestions.length - 1) {
          templateQuestion.value = el.question;
        }
      });
        }
      }
    }
  }
}


const emit = defineEmits(["complete"]);
function complete() {
  emit("complete", {
    formData: { patientQuestion: [...finalAnsweredArrayWithAnswers] },
  });
}
complete();
</script>
