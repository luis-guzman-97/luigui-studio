<template >
  <main class="bg-light">
    <NavbarComponent></NavbarComponent>
    <aside class="container">
      <RegistroFotoListaComponent
        class="mt-3"
        @formulario="formulario"
        v-if="pantalla == 'list'"
      ></RegistroFotoListaComponent>
      <RegistroFotoComponent
        class="mt-3"
        :inputData="dataOutput"
        @formulario="formulario"
        v-if="pantalla == 'form'"
      ></RegistroFotoComponent>
    </aside>
  </main>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import RegistroFotoComponent from "@/components/RegistroFotoComponent.vue";
import RegistroFotoListaComponent from "@/components/RegistroFotoListaComponent.vue";
export default {
  name: "EncargosPage",
  props: [],
  mounted() {},
  data() {
    return {
      pantalla: "list",
      dataOutput:null
    };
  },
  methods: {
    formulario(evt) {
      console.log(evt);
      this.pantalla = evt.pantalla;
      this.dataOutput={...evt};
    },
  },
  components: {
    NavbarComponent,
    RegistroFotoComponent,
    RegistroFotoListaComponent,
  },
};
</script>

<style>
</style>