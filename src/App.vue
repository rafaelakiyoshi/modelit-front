<template>
  <div id="app">
    <Modal
        v-model="modalQuestionario"
        title="Responda o questionário Por Favor...."
        @on-ok="okQuestionario"
        @on-cancel="cancelQuestionario">
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdYiiHN1YGUXRcWueSa0EMyt76LwwZuTvgQD6ttUaa7yQ1tpg/viewform?embedded=true" width="500" height="520" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe>
    </Modal>
       <div v-if="isStore()" class="app-ceiling">
           <div class="app-ceiling-main">
              <a @click="modalQuestionario=true">RESPONDER QUESTIONÁRIO</a> |
               <a @click="router('/dashboard')">Início</a> |
               <a @click="router('/mydriagrams')">Meus Diagramas</a> |
               <a @click="router('/istar')">Novo Diagrama</a> |
               <a @click="logout()">Logout</a>
           </div>
       </div>
       <div class="app-header">
           <div class="layout-logo"></div>
       </div>
       <router-view></router-view>
       <div style="height: 20px"></div>
       <footer>
       <div class="app-copy">
           2017 &copy; Rafael Akiyoshi
       </div>
     </footer>
  </div>
</template>

<script>
export default {
  name: "app",
  data(){
    return {
      modalQuestionario: false,
    }
  },
vuex: {
    getters: {
      user: store => store.user
    },
    actions: {
      clearUser ({dispatch}) {
        dispatch('CLEAR_USER')
      }
    }
  },
  methods: {
    router(router){
      this.$router.push(router)
    },
    isStore() {
        if(this.$store.getters.returnUser.email != ""){
            return true;
        } else {
            return false;
        }
    }, logout() {
      this.$store.commit('CLEAR_USER')
      this.$router.push('/')
    }
  }
};
</script>

<style>
.app {
  background: url("") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.app {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.app-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.app-header {
  height: 0px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.app-copy {
  text-align: center;
  padding: 0px 0 0px;
  color: #77A38C;
}
.app-ceiling {
  background: #77A38C;
  padding: 0px 0;
  overflow: hidden;
}
.app-ceiling-main {
  float: right;
  margin-right: 15px;
}
.app-ceiling-main a {
  color: #ffff;
}
body,
html {
  height: 100%;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffff;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
