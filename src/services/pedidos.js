import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

const getRegistros = () => {
  const registros = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const res = await projectFirestore.collection("pedidos").get();
      registros.value = res.docs.map((doc) => {
       // console.log(doc.id, doc.data());
        return { ...doc.data(), id: doc.id };
      });
    } catch (err) {
      error.value = err.message;
    }
  };

  return { registros, error, load };
};

export default getRegistros;
