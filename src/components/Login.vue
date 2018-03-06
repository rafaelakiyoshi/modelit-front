<template>
    <div id="login">
       <Card>
      <img slot="title" src="../assets/logo.png">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Email..." style="width: 300px">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
            </br>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Senha..." style="width: 300px">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        </br>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" style="width: 300px">Logar</Button>
        </FormItem>
    </Form>
        <a @click="redirect('/register')">Criar Conta</a>
         <Spin size="large" fix v-if="spinShow"></Spin>
            </Card>
    </div>
</template>
<script>
import router from '../router'
import oboe from 'oboe'
export default {
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [{ required: true, message: 'Campo Obrigatório', trigger: 'blur' }],
        password: [
          { required: true, message: 'Campo Obrigatório', trigger: 'blur' },
          { type: 'string', min: 3, message: 'O comprimento da senha não pode ser inferior a 3 dígitos', trigger: 'blur' }
        ]
      },
      spinShow: false
    }
  },
  vuex: {
    getters: {
      user: store => store.user
    },
    actions: {
      setUser ({dispatch}, obj) {
        dispatch('SET_USER', obj)
      }
    }
  },
  methods: {
    redirect (path) {
      router.push(path)
    },
    confirm () {
      this.$Modal.warning({
        title: '<center>Atenção!</center>',
        content: '<center>Email ou senha Incorretas!</center>'
      })
      this.spinShow = false
      this.formInline.user = ''
      this.formInline.password = ''
    },
    tryLogin () {
      oboe({
        url: `//localhost:3000/user/${this.formInline.user}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .done((res) => {
        if(res[0].password){
          if(res[0].password == this.formInline.password){
            let user = {
              user: {
                email: res[0].email,
                nickname: res[0].nickname,
                id: res[0].id
              }
            }
            this.$store.state.user.email = res[0].email
            this.$store.commit('SET_USER', user)
            this.$router.push('/dashboard')
          } else {
            this.confirm()
          }
        } else {
          this.confirm()
        }
        console.log(res)
      })
      .fail((errorReport) => {
        this.confirm2()
        console.log(errorReport)
      })
      console.log(this.formInline.user)
      console.log(this.formInline.password)
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.spinShow = true
          this.tryLogin()
        } else {
          this.$Message.error('Falha na validação do formulário!')
        }
      })
    }
  }
}
</script>
<style>
.center {
  text-align: center;
}
</style>