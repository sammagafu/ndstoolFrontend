<template>
    <TopNavigationBar></TopNavigationBar>
    <div class="container mx-auto">
        <div class="py-3">
        <h3 class="text-2xl py-3">My Recorded Patinets</h3>

<DataTable :value="tableData" tableStyle="min-width: 50rem">
    <Column field="patient" header="Patient" sortable style="width: 25%"></Column>
    <Column field="region" header="Region" sortable style="width: 25%"></Column>
    <Column field="weight" header="Weight" sortable style="width: 25%"></Column>
    <Column field="height" header="Height" sortable style="width: 25%"></Column>
</DataTable>

    </div>
    </div>
</template>
<script setup>
import { onMounted,ref } from "vue";
import TopNavigationBar from "../../components/TopNavigationBar.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from "axios";
import { userStore } from '@/stores/counter'

const userstore = userStore()
const tableData = ref([])

onMounted(() => {
  axios
    .get("patient",{
        headers:{
            'Authorization' : "Token " + userstore.authToken   
        }
    })
    .then((response) => {
        tableData.value = response.data.map(row=>{
            return {
                patient:row.full_name,
                region:row.region,
                weight:row.weight,
                height:row.height
            }
        })
    console.log('response :>> ', response);
    });
});

</script>