<script setup>
    import TopNavigationBar from '../components/TopNavigationBar.vue';
    import Chart from 'primevue/chart';
    import { ref, onMounted } from "vue";

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0.4
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

</script>
<template>
    <TopNavigationBar></TopNavigationBar>
    <div class="container mx-auto py-4">
        <div class="mt-5 grid grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:px-5">
            <div class="relative flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-blue-900 p-3.5">
                <p class="text-xs uppercase text-blue-100">Total Registered</p>
                <div class="flex items-end justify-between space-x-2">
                  <p class="mt-4 text-2xl font-medium text-white">$12,556</p>
                  <!-- <a href="#" class="border-b border-dotted border-current pb-0.5 text-xs font-medium text-pink-100 outline-none transition-colors duration-300 line-clamp-1 hover:text-white focus:text-white">Get Report
                  </a> -->
                </div>
                <div class="mask absolute top-10 right-10 -m-3 h-16 w-16">
                <img src="../assets/img/baby.svg" alt="">
                </div>
              </div>

              <div class="relative flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-red-600 to-red-900 p-3">
                <p class="text-xs uppercase text-amber-50">Undergoing Delay</p>
                <div class="flex items-end justify-between space-x-2">
                  <p class="mt-4 text-2xl font-medium text-white">$61,556</p>
                </div>
                <div class="mask absolute top-10 right-10 -m-3 h-16 w-16">
                <img src="../assets/img/mother.svg" alt="">
                </div>
              </div>

              <div class="relative flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-blue-900 p-3.5">
                <p class="text-xs uppercase text-blue-100">Premature Babies</p>
                <div class="flex items-end justify-between space-x-2">
                  <p class="mt-4 text-2xl font-medium text-white">$12,556</p>
                  <!-- <a href="#" class="border-b border-dotted border-current pb-0.5 text-xs font-medium text-pink-100 outline-none transition-colors duration-300 line-clamp-1 hover:text-white focus:text-white">Get Report
                  </a> -->
                </div>
                <div class="mask absolute top-10 right-10 -m-3 h-16 w-16">
                <img src="../assets/img/newborn.svg" alt="">
                </div>
              </div>
            </div>  
    </div>

    <div class="container mx-auto py-4">
        <h2 class="text-xl font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100">
                Graph of Patient Registered vs Region
              </h2>
        <Chart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
    </div>

</template>
