<template>
  <button type="button" @click="fetchData">Fetch Data</button>

  <pre>{{ data }}</pre>
</template>

<script setup lang="ts">
import { ref } from "vue";

const data = ref({ message: "Backend data not fetched yet." });

async function fetchData() {
  data.value.message = "Fetching...";

  try {
    await fetch("/api/some_endpoint")
      .then((response) => response.json())
      .then((json) => {
        data.value = json;
      });
  } catch (error) {
    data.value.message = error instanceof Error ? error.message : "Failed to fetch";
  }
}
</script>
