<template>
  <div id="app">
       <div v-if="isStore()" class="app-ceiling">
           <div class="app-ceiling-main">
               <a href="/">Início</a> |
               <a href="/istar">Meus Diagramas</a> |
               <a href="/istar">Novo Diagrama</a> |
               <a href="#">Logout</a>
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

  methods: {
    isStore() {
        console.log('deded', this.$store.getters.returnUser.email)
        if(this.$store.getters.returnUser.email != ""){
            return true;
        } else {
            return false;
        }
    }
  }
};
</script>

<style>
.app {
  background: url("img_girl.jpg") no-repeat center center fixed;
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
  color: #9ea7b4;
}
.app-ceiling {
  background: #464c5b;
  padding: 10px 0;
  overflow: hidden;
}
.app-ceiling-main {
  float: right;
  margin-right: 15px;
}
.app-ceiling-main a {
  color: #9ba4b5;
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
  color: #2c3e50;
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>
