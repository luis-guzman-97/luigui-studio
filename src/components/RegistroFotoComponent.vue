<template>
  <main class="container-fluid">
    <div class="row"></div>
    <form
      @submit.prevent="submitSave()"
      class="row p-2 needs-validation"
      novalidate
    >
      <div class="col-sm-12">
        <h2>Nuevo encargo</h2>
      </div>
      <div class="col-12">
        <div class="mt-1 mb-3 d-grid gap-2">
          <button class="btn btn-dark mb-1" type="submit">Salvar pedido</button>
        </div>
      </div>
      <div class="col-xs-12">
        <div class="mb-3">
          <label class="form-label">Nombre del cliente (*)</label>
          <input
            type="text"
            class="form-control"
            placeholder="Ingrese el nombre del cliente"
            v-model="state.cliente"
          />

          <div
            class="input-errors"
            v-for="error of v$.cliente.$errors"
            :key="error.$uid"
          >
            <div class="text-danger">
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12">
        <div class="mb-3">
          <label class="form-label">Whatsapp</label>
          <input
            type="tel"
            class="form-control"
            placeholder="+(503) 0000-0000"
            v-model="state.whatsapp"
          />
        </div>
      </div>
      <div class="col-8">
        <div class="mb-3">
          <label class="form-label">Codigo</label>
          <input
            type="tel"
            class="form-control"
            placeholder="000000"
            v-model="formularioAdd.codigo"
          />
        </div>
      </div>

      <div class="col-4">
        <div class="mb-3">
          <label class="form-label invisible"> Labe</label>
          <br />
          <button class="btn btn-dark mb-1" type="button" @click="addFoto">
            Agregar
          </button>
        </div>
      </div>
      <div class="col-12">
        <table class="table table-bordered table-striped">
          <caption>
            Fotografias encargadas
          </caption>
          <thead>
            <tr>
              <th scope="col">Foto</th>
              <th scope="col">Tamaño</th>
              <th scope="col">Cant.</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in state.encargos" :key="f">
              <td>{{ f.codigo }}</td>
              <td>
                <select v-model="f.tamanio" class="form-control">
                  <option value="4x6">4x6</option>
                  <option value="6x8">6x8</option>
                  <option value="8x10">8x10</option>
                  <option value="11x14">11x14</option>
                </select>
              </td>
              <td>
                <button
                  v-if="f.cantidad != 0"
                  class="btn btn-secondary mb-1"
                  type="button"
                  @click="addRes('-', f)"
                >
                  -
                </button>

                <button
                  v-if="f.cantidad == 0"
                  class="btn btn-danger mb-1"
                  type="button"
                  @click="addRes('-', f)"
                >
                  E
                </button>
                {{ f.cantidad }}
                <button
                  class="btn btn-secondary mb-1"
                  type="button"
                  @click="addRes('+', f)"
                >
                  +
                </button>
              </td>
            </tr>
            <tr v-if="state.encargos.length == 0">
              <td colspan="3" class="text-center">No hay pedidos.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-xs-12">
        <div class="mb-3">
          <label class="form-label">Nota</label>
          <textarea
            type="text"
            class="form-control"
            placeholder="Ingrese nota"
            v-model="state.nota"
          ></textarea>
        </div>
      </div>
      <div class="col-12">
        <div class="mt-3 d-grid gap-2">
          <button class="btn btn-dark mb-1" type="submit">Salvar pedido</button>
          <button
            v-if="id"
            class="btn btn-danger mb-1"
            type="button"
            @click="eliminar"
          >
            Eliminar
          </button>

          <button
            class="btn btn-secondary mb-1"
            type="button"
            @click="formulario"
          >
            Regresar
          </button>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { reactive } from "@vue/reactivity";
import swal from "sweetalert";
import { projectFirestore } from "@/firebase/config";

export default {
  name: "RegistroFotoComponent",
  props: {
    inputData: null,
  },
  mounted() {
    console.log("imputdata", this.inputData.data);

    if (this.inputData.data) {
      this.id = this.inputData.data.id;
      this.state.cliente = this.inputData.data.cliente;
      this.state.whatsapp = this.inputData.data.whatsapp;
      this.state.nota = this.inputData.data.nota;
      this.state.encargos = this.inputData.data.encargos;
    }
  },
  setup() {
    const formularioRegistro = reactive({
      cliente: "",
      whatsapp: "",
      encargos: [],
      nota: "",
    });
    const rules = {
      cliente: {
        required: helpers.withMessage(
          "El nombre del cliente es requerido",
          required
        ),
      },
    };
    const v$ = useVuelidate(rules, formularioRegistro);

    return { state: formularioRegistro, v$ };
  },
  data() {
    return {
      formularioAdd: {
        codigo: "",
        cantidad: 0,
        tamanio: "4x6",
      },
      id: null,
    };
  },
  methods: {
    async eliminar() {
      swal({
        title: "¿Estas seguro?",
        text: "Eliminaras un pedido!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          projectFirestore.collection("pedidos").doc(this.id).delete();
          swal("Pedido eliminado!", {
            icon: "success",
          }).then(() => {
            this.$emit("formulario", { pantalla: "list", data: {} });
          });
        }
      });
    },
    async submitSave() {
      this.v$.cliente.$touch();

      console.log(this.state);
      if (this.state.encargos.length !== 0) {
        console.log(this.state);
        if (this.id) {
          console.log(this.id);

          await projectFirestore
            .collection("pedidos")
            .doc(this.id)
            .update(this.state);
          this.$emit("formulario", { pantalla: "list", data: {} });
        } else {
          await projectFirestore.collection("pedidos").add(this.state);
          this.$emit("formulario", { pantalla: "list", data: {} });
        }
      } else {
        swal("Oops", "Por favor, ingresa almenos un encargo.", "error");
      }
    },
    addFoto() {
      if (this.formularioAdd.codigo != "") {
        this.state.encargos.push({
          ...this.formularioAdd,
          cantidad: 1,
          tamanio: "4x6",
        });
        this.fomularioAdd = {
          ...this.formularioAdd,
          cantidad: 0,
          tamanio: "4x6",
        };
      }
    },
    addRes(btn, item) {
      if (btn === "-") {
        if (item.cantidad != 0) {
          item.cantidad--;
        } else {
          swal({
            title: "¿Estas seguro?",
            text: "Eliminaras un pedido!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              var pos = this.state.encargos.indexOf(item);
              console.log(pos);
              // Si se encuentra el elemento, eliminarlo del array
              if (pos !== -1) {
                this.state.encargos.splice(pos, 1);
              }
              swal("Pedido eliminado!", {
                icon: "success",
              });
            }
          });
        }
      } else {
        item.cantidad++;
      }
    },

    formulario() {
      //console.log('Boton pulsado', pelicula);
      this.$emit("formulario", { pantalla: "list", data: {} });
    },
  },
};
</script>

<style>
</style>