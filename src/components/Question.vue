<template>
    <label for="Question" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        <slot name="question"></slot>
    </label>
    <label>
          <input type="radio" v-model="answer" answer="true">
          True
        </label>
        <label>
          <input type="radio" v-model="answer" answer="false">
          False
        </label>
</template>

<script setup>
    defineProps({
        question:{
            type:String,
            default: 'Do you see this question?',
        },

        answer: {
            type: Boolean,
            required: true
        },

        questionID:{
            type:Number,
            default:0
        }


    })
</script>