<template>
  <div class="hello">
     <p class="script"><span>ModelIT</span></p>
     <h3 class="sub"> Modele seu software colaborativamente! </h3>

    <Button-group size="large" shape="circle">
        <Button @click="redirect('/istar')"href="/istar" type="info">Modelar i*</Button>
        <Button type="info" disabled>Modelar NFR(INDISPONÍVEL)</Button>
        <Button type="info" disabled>Modelar D. Classes(INDISPONÍVEL)</Button>
    </Button-group>
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
body  {
    background-image: url("img_girl.jpg");
    background-color: #cccccc;
}

@import url(https://fonts.googleapis.com/css?family=Bangers);
.script {
  font-family: 'Bangers', cursive;
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

#app {
    /* The image used */
    background-image: url("img_girl.jpg");

    /* Full height */
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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
