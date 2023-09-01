<template>
  <div>
    <div class="card mt-5 mb-5">
      <div class="card-header">
        <h4> Filtro de Pesquisa </h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="getUsuarios('/api/users/')">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label> Nome </label>
                <input type="text" class="form-control" name="name" v-model="formSearch.name"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label> CPF </label>
                <input type="text" class="form-control" name="cpf"  v-model="formSearch.cpf"/>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-6">
              <div class="form-group">
                <label> Data Inicio </label>
                <input type="date" class="form-control" name="data_inicio" v-model="formSearch.data_inicio"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label> CPF </label>
                <input type="date" class="form-control" name="data_fim" v-model="formSearch.data_fim"/>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
                <button class="btn btn-primary float-end" type="submit">
                  Pesquisar
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <h4> Listagem de Usuários
          <router-link to="/create" class="btn btn-success float-end">
            Novo
          </router-link>
        </h4>
      </div>
      <div class="card-body">
        <div v-if="loading"> Carregando...</div>

        <div v-else-if="!!dados">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">CPF</th>
                <th scope="col">Email</th>
                <th scope="col">Perfil</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user) in dados.data" :key="user.id">
                <th scope="row">{{ user.id }}</th>
                <td>{{ user.name }}</td>
                <td>{{ user.cpf }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.perfil.nome_perfil }}</td>
                <td>
                  <router-link :to="{ name: 'userUpdate', params: { id: user.id } }" class="btn btn-primary btn-sm"
                    @click="edit(user.id)">
                    Editar
                  </router-link>
                  <button class="btn btn-danger btn-sm" @click="deleteUsuario(user.id)">
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>

          </table>
          <div class="row">
            <div class="col-md-12 text-center">
              <button class="btn btn-primary mx-1 btn-sm" v-for="(link, index) in dados.links" :disabled="link.active"
                :key="index" @click="getUsuarios(link.url)">
                <span> {{ link.label }} </span>
              </button>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-warning"> Sem registros </div>
      </div>
    </div>
  </div>
</template>
  
<script>

import api from '../api';

export default {
  name: 'UsersList',
  data() {
    return {
      formSearch: {
        name:'',
        cpf:'',
        data_inicio: '',
        data_fim: ''
      },
      dados: null,
      loading: true,
      loadingDeleteUser: false,
    }
  },
  mounted() {
    this.getUsuarios();
  },
  methods: {
    getUsuarios(url = '/api/users/'){
      this.loading  = true;
      api.get(url, {params:this.formSearch})
        .then(({ data }) => {
          this.dados = data;
          this.loading = false;
        })
        .catch(error => {
          alert(`Ocorreu um erro ao buscar os usuários ${error}`)
        })
    },
    deleteUsuario(idUsuario) {
      this.loadingDeleteUser = true;

      api.delete(`/api/users/excluir/${idUsuario}`)
        .then(response => {
          if (response.status === 200) {
            let indexUserArray = this.dados.data.findIndex(value => value.id == idUsuario);
            this.dados.data.splice(indexUserArray, 1);
          }
        })
        .catch(error => {
          alert(error)
        })
        .finally(() => {
          this.loadingDeleteUser = false;
        });
    }
  },
}
</script>
  
<style scoped></style>
  