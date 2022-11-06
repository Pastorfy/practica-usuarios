<template>
<div>            
    <b-card title="Cátalogos de usuarios" >
        <b-card-text>
            listado de los usuarios del sistema
        </b-card-text>
        <div class="d-flex justify-content-between">
            <div>
                <b-form-input v-model="tblUsuarios.search" placeholder="Enter your name"></b-form-input>
            </div>            
            <b-button variant="light" v-on:click="open()">Añadir usuario</b-button>
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
    <b-modal id="modal-footer-sm" 
        :title="modalFormulario.title" 
        button-size="sm" 
        :visible="modalFormulario.visible"
        @hidden="modalFormulario.visible=false"
        @ok="guardar"
        >
            <b-form-group
                id="lbl-nombre"
                description="Ingrese el nombre de usuario."
                label="Enter your name"
                label-for="txt-usuario">
                <b-form-input id="txt-usuario" v-model="modalFormulario.model.name" trim></b-form-input>
            </b-form-group>
            <b-form-group
                id="lbl-password"
                description="Ingrese la contraseña."
                label="Enter your name"
                label-for="txt-password">
                <b-form-input id="txt-pasword" v-model="modalFormulario.model.password" trim></b-form-input>
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
Vue.use(BootstrapVueIcons)


export default Vue.extend({
    components:{
        
    },
    name: 'IndexPage',
    data(){
        const tblUsuarios: Grid={
            data:[],
            fields:[
                {"key":'name',"label":"Nombre de usuario"},
                {"key":'password','label':"Ingrese la contraseña"},
                {"key":'acciones','label':"*",thStyle:{"width":"50px"}},
            ],
            search:''
        }
        const modalFormulario={
            visible:false,
            title:'Nuevo Usuario',
            model: new UsuarioService()
        };
        return {
            modalFormulario,
            tblUsuarios,
            datos:Array<Usuario>(),
            fields:Array<string>()

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
                const respuesta=await this.modalFormulario.model.save();
                if(respuesta.successful){
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
            }catch(err){
                console.log(err);
            }
        },
        eliminar(item:UsuarioService){            
            this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everything.', {
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
        open(item:UsuarioService =new UsuarioService()){
            if(item.id)
            {
                this.modalFormulario.title='Nuevo Usuario';
            }else{
                this.modalFormulario.title='Editar Usuario';
            }
            this.modalFormulario.model=item;
            this.modalFormulario.visible=true;            
        },                                      
    }  
})
</script>
