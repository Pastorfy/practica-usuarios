<template>
  <div>
    <label>dasdaa</label>

    <pre>{{datos}}</pre>  
  </div>
  
</template>

<script lang="ts">
import Vue, { onMounted } from 'vue'
import { defineComponent } from 'vue';
import Usuario from '~/interfaces/Usuario';
import  UsuarioService  from '../services/UsuarioService'

export default Vue.extend({
  name: 'IndexPage',
  data(){
    return {
      datos:Array<Usuario>()
    }
  },
  async created(){
    const service = new UsuarioService();
    /*console.log(service)
    await service.fetchAll()

    console.log( service.getUsuarios())
    this.datos=service.getUsuarios();*/
  }
  /*setup(){
    
    const service = new UsuarioService();
    const usuarios=service.getUsuarios();
    onMounted(async () => {
      await service.fetchAll()
    })
    return {usuarios}
  }*/

  
})
</script>
