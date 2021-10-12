<script setup>
const { data } = await useFetch(
  "https://api-football-v3.herokuapp.com/api/v3/fixtures?date=2021-10-13&timezone=Europe%2FBerlin"
);

setInterval(async () => {
  $fetch(
    "https://api-football-v3.herokuapp.com/api/v3/fixtures?date=2021-10-13&timezone=Europe%2FBerlin"
  );
}, 15000);

console.log(data.value);
</script>

<template>
  <O-CalendarBar />
  <div v-for="(item, index) in data" :key="index">{{ item.country }}</div>
</template>
