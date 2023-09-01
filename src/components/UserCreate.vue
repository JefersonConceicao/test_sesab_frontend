<template>
    <div>
        <form @submit.prevent="submitForm">
            <div class="card">
                <div class="card-header text-center">
                    <router-link to="/" class="float-start"> Voltar </router-link>
                    Informações Gerais
                </div>
                <div class="card-body">
                    <h4> Informações Gerais </h4>
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label> Nome Completo </label>
                                <input type="text" class="form-control" v-model="formUser.name" name="name" />

                                <div v-if="errors.name" class="error-message">
                                    {{ errors.name[0] }}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label> CPF </label>
                                <input type="text" class="form-control" v-model="formUser.cpf" name="cpf" />

                                <div v-if="errors.cpf" class="error-message">
                                    {{ errors.cpf[0] }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label> Perfil </label>

                                <select v-if="!!optionsPerfis" v-model="formUser.perfil_id" :disabled="loadingPerfis"
                                    class="form-select">
                                    <option v-for="perfil in optionsPerfis" :key="perfil.id" :value="perfil.id">
                                        {{ perfil.name }}
                                    </option>
                                </select>
                                <select v-else class="form-select">
                                    <option value="" disabled> Carregando... </option>
                                </select>

                                <div v-if="errors.perfil_id" class="error-message">
                                    {{ errors.perfil_id[0] }}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label> Email </label>
                                <input type="email" class="form-control" v-model="formUser.email" name="name" />

                                <div v-if="errors.email" class="error-message">
                                    {{ errors.email[0] }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-5">
                <div class="card-header">
                    Endereços
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label> CEP </label>
                                <input type="text" class="form-control" v-model="formEndereco.cep" />
                            </div>

                            <div v-if="errors.cep" class="error-message">
                                {{ errors.cep[0] }}
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label> Nome Logradouro </label>
                                <input type="text" class="form-control" v-model="formEndereco.nome_logradouro" />

                                <div v-if="errors.nome_logradouro" class="error-message">
                                    {{ errors.nome_logradouro[0] }}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label> Bairro </label>
                                <input type="text" class="form-control" v-model="formEndereco.bairro" />
                            </div>

                            <div v-if="errors.bairro" class="error-message">
                                {{ errors.bairro[0] }}
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label> Municipio </label>
                                <input type="text" class="form-control" v-model="formEndereco.municipio" />
                            </div>

                            <div v-if="errors.municipio" class="error-message">
                                {{ errors.municipio[0] }}
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12">
                            <button class="btn btn-success float-end" type="button" @click.prevent="addEnderecoTable">
                                Adicionar
                            </button>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-md-12">
                            <table class="table" v-if="enderecos.length">
                                <thead>
                                    <th> CEP </th>
                                    <th> Logradouro </th>
                                    <th> Bairro </th>
                                    <th> Municipio </th>
                                    <th> Ações </th>
                                </thead>
                                <tbody v-for="(endereco, index) in enderecos" :key="index">
                                    <td> {{ endereco.cep }} </td>
                                    <td> {{ endereco.nome_logradouro }} </td>
                                    <td> {{ endereco.bairro }} </td>
                                    <td> {{ endereco.municipio }} </td>
                                    <td>
                                        <button class="btn btn-danger btn-sm" type="button" @click.prevent="removeEnderecoTable(index)">
                                            Remover
                                        </button>
                                    </td>
                                </tbody>
                            </table>
                            <div v-else class="text-center alert alert-warning">
                                Sem registros
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <button class="btn btn-success btn-block" type="submit" :disabled="loadingSaveUser">
                    {{ loadingSaveUser ? "Carregando" : "Salvar" }}
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import api from '../api';

export default {
    name: "UsersCreate",
    data() {
        return {
            enderecos: [],
            formUser: {
                name: '',
                cpf: '',
                email: '',
                perfil_id: null,
            },
            formEndereco: {
                cep: '',
                nome_logradouro: '',
                bairro: '',
                municipio: '',
            },
            optionsPerfis: null,
            loadingPerfis: true,
            loadingSaveUser: false,
            errors: {},
        }
    },
    mounted() {
        this.getListPerfis();
    },
    methods: {
        getListPerfis() {
            api.get('/api/perfis/list')
                .then(({ data }) => {
                    this.optionsPerfis = data.map(value => ({ id: value.id, name: value.nome_perfil }))
                    this.loadingPerfis = false
                })
                .catch(err => {
                    console.log(err);
                })
        },
        submitForm() {
            this.loadingSaveUser = true;

            this.formUser['enderecos'] = this.enderecos;
            console.log(this.formUser); 

            api.post('/api/users/save', this.formUser)
                .then(response => {
                    if(response.status == 200 && !response.data.error){
                        this.$router.push({
                            name: 'usersList'
                        });
                    }else{
                        alert(response.data.msg);
                        return;
                    }
                })
                .catch(err => {
                    if (err.response.status == 422) {
                        this.errors = err.response.data.errors
                        console.log(this.errors)
                    }

                })
                .finally(() => {
                    this.loadingSaveUser = false;
                });
        },
        addEnderecoTable() {
            for (const endereco in this.formEndereco) {
                if (!this.formEndereco[endereco] || this.formEndereco[endereco] == "") {
                    this.errors = { [endereco]: ['Campo obrigatório'] }    
                    return;
                }
            }

            this.enderecos.push({...this.formEndereco});

            for (const endereco in this.formEndereco) {
                this.formEndereco[endereco] = "";
            }
            
        },
        removeEnderecoTable(id) {
            this.enderecos.splice(id, 1);
        }
    }
}
</script>
<style scoped>
.error-message {
    color: red;
}
</style>