<template>
  <div class="hello">
    </br>
    <img src="./logo.png" alt="Paris" class="center">
     <h3 class="sub"> Software modeling with goals! </h3>
    <div style="height: 370px"></div>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    redirect (path) {
      router.push(path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background: url('') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;
}
@import url(https://fonts.googleapis.com/css?family=Saira+Semi+Condensed);
.script {
  font-family: 'Saira Semi Condensed', cursive;
  color: #fff;
  text-shadow: 2px 2px black;
  font-size: 150px;
  position: relative;
  margin-bottom: -50px;
}
.sub {
  font-family: "Lucida Grande", Tahoma;
 font-size: 20px;
 font-weight: lighter;
 font-variant: normal;
 text-transform: uppercase;
 color: white;
 text-shadow: 1px 1px black;
        margin-top: 10px;
 text-align: center!important;
 letter-spacing: 0.3em;
}


ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
