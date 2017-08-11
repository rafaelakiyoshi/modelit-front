<template>
  <div class="hello">
     <p class="script"><span>ModelIT</span></p>
     <h3 class="sub"> Modele seu software colaborativamente! </h3>

    <Button-group size="large" shape="circle">
        <Button type="info">Modelar i*</Button>
        <Button type="info">Modelar NFR</Button>
        <Button type="info">Modelar D. Classes</Button>
    </Button-group>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Bangers);
.script {
  font-family: 'Bangers', cursive;
  color: #fff;
  text-shadow: 2px 2px #5cadff;
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
 text-shadow: 1px 1px #5cadff;
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
