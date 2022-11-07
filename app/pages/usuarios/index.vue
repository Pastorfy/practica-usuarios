<template>
<div>     
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Menu Principal</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    
                    <b-navbar-nav class="ml-auto">                                                
                        <b-nav-item-dropdown right>                            
                            <template #button-content>
                                <em>User</em>
                            </template>                            
                            <b-dropdown-item href="javascript:void(0)" v-on:click="logOut">Cerrar sessión</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
    </b-navbar>  
    <b-card title="Cátalogos de usuarios" >
        <b-card-text>
            listado de los usuarios del sistema
        </b-card-text>
        <div class="d-flex justify-content-end p-2">            
            <b-button variant="info" v-on:click="open()">Nuevo Usuario</b-button>
        </div>
        <div>
            <b-table striped hover 
                :items="tblUsuarios.data"
                :fields="tblUsuarios.fields">
                <template #cell(acciones)="{item}">
                    <b-dropdown id="dropdown-right" right :text="'Opciones'" size="sm" variant="primary" class="m-2">
                        <b-dropdown-item href="javascript:void(0)" v-on:click="open(item)">
                            <span style="color:cornflowerblue"> <b-icon icon="eye" style="color:cornflowerblue"></b-icon>&nbsp;Editar</span>
                        </b-dropdown-item>
                        <b-dropdown-item href="javascript:void(0)" v-on:click="eliminar(item)">
                            <span style="color:indianred"><b-icon icon="trash" style="color:indianred"></b-icon>&nbsp;Eliminar</span> 
                        </b-dropdown-item>
                    </b-dropdown>
                </template>
                
            ></b-table>
        </div>
        <template #footer>
            <small class="text-muted">...</small>
        </template>
    </b-card>          
    <registro-usuario v-model="registrousuario" @guardar="guardar"></registro-usuario>
   
</div>

</template>
<script lang="ts">
import Vue from 'vue'
import Usuario from '~/interfaces/Usuario';
import  UsuarioService  from '~/services/UsuarioService';
import Grid from '~/interfaces/util/Grid'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import RegistroUsuarioVue from '~/components/RegistroUsuario.vue';
Vue.use(BootstrapVue)
import UtilService from '~/services/UtilService'

Vue.use(BootstrapVueIcons)


export default Vue.extend({
    
    components:{
        'registro-usuario':RegistroUsuarioVue
    },
    name: 'IndexPage',
    data(){
        //const nombreUsuario=localStorage.getItem('nombreCompleto');
        const tblUsuarios: Grid={
            data:[],
            fields:[
                {"key":'username',"label":"usuario"},
                {"key":'nombreCompleto',"label":"Nombre de Completo"},
                {"key":'email',"label":"Email"},                
                {"key":'acciones','label':"*",thStyle:{"width":"50px"}},
            ],
            search:''
        }
       
        return {            
            tblUsuarios,
            datos:Array<Usuario>(),
            fields:Array<string>(),
            registrousuario:new UsuarioService(-1),

        }
    },    
    async mounted(){        
        try{
            const token:string|null=localStorage.getItem('token');        
            if(token){                
                UtilService.validateToken(token).then((f)=>{ console.log(f)}).catch((erro)=> {console.log("ffallo")});                
            }else{
                this.$router.push("/login");
            }            
        }catch(err)
        {
            this.$router.push("/login");
        }        
    },
    async created(){            
        await this.buscar();        
    },
    methods:{
        async buscar(){
            const service = new UsuarioService();            
            const respuesta= await service.get();
            if(respuesta.successful){
                this.tblUsuarios.data=respuesta.data;
            } else {
                this.$bvToast.toast(respuesta.message, {
                    title: `Información del sistema`,
                    toaster: 'b-toaster-bottom-full',
                    solid: true,
                    appendToast:true,
                    variant:'error'
                });
            }        
        },
        async guardar(){
            try{                                
                await this.buscar();        
            }catch(err){
                console.log(err);
            }
        },
        eliminar(item:UsuarioService){            
            this.$bvModal.msgBoxConfirm('¿Desea eliminar al usuario?.', {
                title: 'Please Confirm',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'YES',
                cancelTitle: 'NO',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            }).then(async (value) => {
                    console.log(value);
                    if(value)
                    {   
                        try {
                            const respuesta= await item.delete();
                            console.log(respuesta);
                            if(respuesta.successful)
                            {
                                this.$bvToast.toast(respuesta.message, {
                                    title: `Información del sistema`,
                                    toaster: 'b-toaster-bottom-full',
                                    solid: true,
                                    appendToast:true,
                                    variant:'success'                                    
                                });
                                this.buscar();
                            }else{
                                this.$bvToast.toast(respuesta.message, {
                                    title: `Información del sistema`,
                                    toaster: 'b-toaster-bottom-full',
                                    solid: true,
                                    appendToast:true,
                                    variant:'error'
                                });
                            }                                                       
                        }catch(err)
                        {
                            console.log(err);
                        }
                    }                
            })
            .catch(err => {
                console.log(err);                
            })
        },
        logOut(){
            localStorage.removeItem("token");
            this.$router.push("/login")
        },
        open(item:UsuarioService =new UsuarioService()){
            this.registrousuario=item            
        },                                      
    }  
})
</script>
