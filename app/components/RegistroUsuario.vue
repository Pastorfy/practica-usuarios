<template>
  <div>
     <b-modal id="modal-footer-sm" 
        :title="title" 
        button-size="sm" 
        :visible="visible"
        
        @hidden="onHidden"
        @ok="guardar"
        >
        <b-form-group
            id="lbl-nombre"
            description="Ingrese el nombre de usuario."
            label="Nombre de usuario"
            label-for="txt-usuario">
            <b-form-input id="txt-usuario" v-model="usuario.username" trim></b-form-input>
        </b-form-group>            
        <b-form-group
            id="lbl-email"
            description="Email"
            label="Email"
            label-for="txt-email">
            <b-form-input id="txt-email" v-model="usuario.email" trim></b-form-input>
        </b-form-group>
        <b-form-group
            id="lbl-nombre-completo"
            description="Nombre completo"
            label="Nombre Completo"
            label-for="txt-nombre-completo">
            <b-form-input id="txt-nombre-completo" v-model="usuario.nombreCompleto" trim></b-form-input>
        </b-form-group>
        <b-form-group
            id="lbl-password"
            description="Password"
            label="Password"
            label-for="txt-password">
            <b-form-input id="txt-pasword" type="password" v-model="usuario.password" trim></b-form-input>
        </b-form-group>
        <b-form-group
            id="lbl-password"
            description="Confirmar password"
            label="Confirmar password"
            label-for="txt-confirm-password">
            <b-form-input id="txt-confirm-pasword" type="password" v-model="txtconfirmPassword" trim></b-form-input>
        </b-form-group>
        
  </b-modal>     
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Usuario from '~/interfaces/Usuario';
import  UsuarioService  from '~/services/UsuarioService';
import Grid from '~/interfaces/util/Grid'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue)
import UtilService from '~/services/UtilService'

Vue.use(BootstrapVueIcons)
export default Vue.extend({    
    components:{        
    },
    props:['usuario'],
    model:{
      prop:'usuario',
      event:'setShow'
    },
    name: 'IndexPage',
    data(){                        
        return {
            visible:false,
            title:'Nuevo Usuario',            
            txtconfirmPassword:'',
        }
    },           
    watch:{
      usuario(){
        if(this.usuario.id!==-1){
            this.txtconfirmPassword='';
            this.visible=true;
        }        
      }
    },
    async created(){                   
        console.log("created");
    },
    methods:{        
      onHidden(){
        this.visible=false;
        
      },
      async guardar(bvModalEvent:any){
        try{                       
          bvModalEvent.preventDefault();
            if(!this.usuario.username){
                this.$bvToast.toast("Debe ingresar el nombre de usuario", {
                    title: `Información del sistema`,
                    toaster: 'b-toaster-bottom-full',
                    solid: true,
                    appendToast:true,
                    variant:'danger'
                });                 
                
                return;
            }
            if(!this.usuario.email){
                this.$bvToast.toast("Debe ingresar el email.", {
                    title: `Información del sistema`,
                    toaster: 'b-toaster-bottom-full',
                    solid: true,
                    appendToast:true,
                    variant:'danger'
                });                                 
                return;
            }
            
            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;  
            const formatEmail:boolean =expression.test(this.usuario.email);

            if(!formatEmail){
              this.$bvToast.toast("El correo tiene un formato invalido.", {
                    title: `Información del sistema`,
                    toaster: 'b-toaster-bottom-full',
                    solid: true,
                    appendToast:true,
                    variant:'danger'
                });                                 
                return;
            }
            if(!this.usuario.nombreCompleto){
                this.$bvToast.toast("Debe ingresar el nombre completo.", {
                    title: `Información del sistema`,
                    toaster: 'b-toaster-bottom-full',
                    solid: true,
                    appendToast:true,
                    variant:'danger'
                });                                 
                return;
            }
            if(this.usuario.password!=this.txtconfirmPassword){
              this.$bvToast.toast("Las contraseñas debe coincidir.", {
                    title: `Información del sistema`,
                    toaster: 'b-toaster-bottom-full',
                    solid: true,
                    appendToast:true,
                    variant:'danger'
                });                                 
                return;
            }
            if(!this.usuario.password){
                this.$bvToast.toast("Debe ingresar la contraseña.", {
                    title: `Información del sistema`,
                    toaster: 'b-toaster-bottom-full',
                    solid: true,
                    appendToast:true,
                    variant:'danger'
                });                                 
                return;
            }

            const respuesta=await this.usuario.save();                            
            if(respuesta.successful){
                this.$bvToast.toast(respuesta.message, {
                    title: `Información del sistema`,
                    toaster: 'b-toaster-bottom-full',
                    solid: true,
                    appendToast:true,
                    variant:'success'
                }); 
                this.visible=false;
                this.$emit("guardar",true);                             
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
                console.log(err);
            }
        },      
         
    }  
})
</script>
