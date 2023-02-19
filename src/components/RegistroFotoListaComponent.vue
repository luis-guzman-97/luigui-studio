<template>
  <main class="container-fluid">
    <div action="" class="row p-2">
      <div class="col-12">
        <div class="mt-1 mb-3 d-grid gap-2">
          <button class="btn btn-dark mb-1" type="button" @click="formulario">Nuevo pedido</button>
        </div>
      </div>
      <div class="col-sm-12">
        <h2>Mis Pedidos</h2>
        <hr />
      </div>

      <div class="col-12">
        <table class="table table-bordered table-striped">
          <caption>
            Pedidos
          </caption>
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Pedidos</th>
              <th scope="col">Opcion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in registros" :key="p.id">
              <td>
                <p class="mb-0">{{ p.cliente }}</p>
                <p>{{ p.whatsapp }}</p>
              </td>
              <td>{{ p.encargos.length }}</td>
              <td>
                <button class="btn btn-secondary mb-1" @click="formularioVer(p)">Ver</button>
              </td>
            </tr>
            <tr v-if="registros.length == 0">
              <td colspan="3" class="text-center">No hay pedidos.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import getRegistros from "@/services/pedidos";

export default {
  name: "RegistroFotoListaComponent",
  props: [],
  setup() {
    const { registros, load } = getRegistros();

    load();

    return { registros };
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {
    formulario(){
        //console.log('Boton pulsado', pelicula);
        this.$emit('formulario', {pantalla:'form', data:null});
    },
    formularioVer(ver){
        //console.log('Boton pulsado', pelicula);
        this.$emit('formulario', {pantalla:'form', data:ver});
    }
  },
};
</script>

<style>
</style>