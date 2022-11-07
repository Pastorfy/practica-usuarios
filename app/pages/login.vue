<template>
    <div class="d-flex justify-content-center pt-5">
      <b-card title="Iniciar sesión" style="width: 500px;">
          <b-card-text>
              Bienvenido
          </b-card-text>          
          <b-form-group
                  id="lbl-nombre"
                  description="ingrese su nombre de usuario."
                  label="Nombre de usuario"
                  label-for="txt-usuario">
                  <b-form-input id="txt-usuario"  v-model="usuario.username" trim></b-form-input>
              </b-form-group>
            <b-form-group
                id="lbl-password"
                description="ingrese su contraseña."
                label="Passoword"                
                label-for="txt-password">
                <b-form-input id="txt-pasword" type="password" v-model="usuario.password" trim></b-form-input>
            </b-form-group>
        
            <div class="d-flex justify-content-end">
                <a href="javascript:void(0)" v-on:click="open">Registrarse</a>
            </div>                      
          <template #footer>
            <div class="d-flex justify-content-end">              
                <b-button variant="info" v-on:click="logIn(usuario.username,usuario.password)">Ingresar</b-button>
            </div>
            
          </template>
      </b-card>      
      <registro-usuario v-model="registrousuario" @guardar="saveUsuario"></registro-usuario>
    </div>
    
  </template>
  
  <script lang="ts">
  import Vue, { onMounted } from 'vue'
  import { defineComponent } from 'vue';
  import Usuario from '~/interfaces/Usuario';
  import  UsuarioService  from '../services/UsuarioService'
  import RegistroUsuarioVue from '~/components/RegistroUsuario.vue';
  export default Vue.extend({
    components:{        
        'registro-usuario':RegistroUsuarioVue
    },
    name: 'IndexPage',
    data(){
        
      return {
        usuario:new UsuarioService(),
        registrousuario:new UsuarioService(-1),
      }
    },
    async created(){            
        
    },
    methods:{
        saveUsuario(resp:Boolean){            
            this.logIn(this.registrousuario.username,this.registrousuario.password);  
        },
        open(){
            this.registrousuario = new UsuarioService(0);
        },
        async logIn(usuario:string,password:string){
            try{
                
                this.usuario.username=usuario;
                this.usuario.password=password;
                console.log(this.usuario);
                if(!usuario){
                    this.$bvToast.toast("Debe ingresar el nombre de usuario.,", {
                        title: `Información del sistema`,
                        toaster: 'b-toaster-bottom-full',
                        solid: true,
                        appendToast:true,
                        variant:'warning'
                    });
                    return;
                }
                if(!password){
                    this.$bvToast.toast("Debe ingresar una contraseña,", {
                        title: `Información del sistema`,
                        toaster: 'b-toaster-bottom-full',
                        solid: true,
                        appendToast:true,
                        variant:'warning'
                    });
                    return;
                }
                const respuesta= await this.usuario.logIn();                 ;
                localStorage.setItem('token',respuesta.data.access_token);                                
                if(respuesta.successful){
                    this.$bvToast.toast(respuesta.message, {
                        title: `Información del sistema`,
                        toaster: 'b-toaster-bottom-full',
                        solid: true,
                        appendToast:true,
                        variant:'success'
                    });                    
                    await this.$router.push("/usuarios/");
                                        
                }else{
                    this.$bvToast.toast(respuesta.message, {
                        title: `Información del sistema`,
                        toaster: 'b-toaster-bottom-full',
                        solid: true,
                        appendToast:true,
                        variant:'danger'
                    });                    
                }                                
            }catch(err){
                this.$bvToast.toast("Ha ocurrido un error inesperado.", {
                    title: `Información del sistema`,
                    toaster: 'b-toaster-bottom-full',
                    solid: true,
                    appendToast:true,
                    variant:'danger'
                });
                console.log(err);
            }
        }
    }          
  })
  </script>
  