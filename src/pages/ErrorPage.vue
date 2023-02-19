<template>
  <NavbarComponent></NavbarComponent>
  <main class="container mt-5">
    <h1 class="text-center">La pagina no existe</h1>
  </main>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
export default {
  name: "ErrorPage",
  props: {},
  components: {
    NavbarComponent,
  },
};
</script>

<style>
</style>