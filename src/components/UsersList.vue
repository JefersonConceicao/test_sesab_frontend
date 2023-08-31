<template>
  <div>
    <div class="card mt-5 mb-5">
      <div class="card-header">
        <h4> Filtro de Pesquisa </h4>
      </div>
      <div class="card-body">
        <form>
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                  <label> Nome </label>
                  <input type="text" class="form-control" name="name"/>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                  <label> CPF </label>
                  <input type="text" class="form-control" name="cpf"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="card mb-3">
      <div class="card-header">
        <h4> Listagem de Usuários 
          <button class="btn btn-success float-end">
            Novo
          </button>
        </h4>
      </div>
      <div class="card-body">
        <div v-if="loading" > Carregando...</div>
        
        <table v-else-if="!!dados" class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">CPF</th>
              <th scope="col">Email</th>
              <th scope="col">Perfil</th>
              <th scope="col" width="2%">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user) in dados.data" :key="user.id">
              <th scope="row">{{ user.id }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.cpf }}</td>
              <td>{{ user.perfil.nome_perfil }}</td>
              <td>
                <button class="btn btn-primary btn-sm" @click="edit(user)">
                  Editar
                </button>
                <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Excluir</button>
              </td>
            </tr>
          </tbody>

          <div class="row">
              <div class="col-md-12 text-center">
                  <button 
                    class="btn btn-primary btn-sm" 
                    :disabled="link.active" 
                    v-for="(link, index) in dados.links" :key="index"
                    @click="getUsuarios(link.url)"
                  >
                      <span> {{ link.label }} </span>
                  </button>
              </div>
          </div>
        </table>

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
      dados: null,
      loading: true
    }
  },
  mounted(){
    this.getUsuarios();
  },
  methods:{
    getUsuarios(url = '/api/users/'){
      api.get(url)
        .then(({ data }) => {
          this.dados = data;
          this.loading = false;
        })  
        .catch(error => {
          alert(`Ocorreu um erro ao buscar os usuários ${error}`)
        })
    },
  }
}
</script>
  
<style scoped></style>
  