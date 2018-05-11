<template>
<div id="register">
  <Card>
     <h2 style="color:black;" slot="title">Criação de Conta</h2>
     <h2 style="color:black;" slot="title">Não utilize suas informações oficiais de contas. Crie uma conta fictícia!</h2>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username" style="width: 500px">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        </br>
        <FormItem prop="email">
            <Input type="text" v-model="formInline.email" placeholder="E-mail" style="width: 500px">
                <Icon type="ios-email-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        </br>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password" style="width: 500px">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        </br>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password2" placeholder="Confirm Password" style="width: 500px">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        </br>        
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Registrar</Button>
        </FormItem>
    </Form>
    </Card>
    <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>
<script>
import oboe from "oboe";
export default {
  data() {
    return {
      spinShow: false,

      formInline: {
        user: "",
        email: "",
        password: "",
        password2: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Incorrect email format",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  vuex: {
    getters: {
      user: store => store.user
    },
    actions: {
      setUser({ dispatch }, obj) {
        dispatch("SET_USER", obj);
      }
    }
  },
  methods: {
    cleanForm() {
      this.formInline.email = ""
      this.formInline.user = "",
      this.formInline.password = "",
      this.formInline.password2 = ""
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.spinShow = true;
          oboe({
            url: `https://modelit-db.herokuapp.com/user`,
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: {
              email: this.formInline.email,
              nickname: this.formInline.user,
              password: this.formInline.password
            }
          })
            .done(res => {
              console.log(res);
              if (res.message == "user") {
                this.$Message.error("Email já cadastrado!!");
                this.cleanForm();
                this.spinShow = false;
              } else {
                this.$Message.success("Conta Criada com Sucesso!");
                let user = {
                  user: {
                    email: res.email,
                    nickname: res.nickname,
                    id: res.id
                  }
                };
                this.$store.state.user.email = res.email;
                this.$store.commit("SET_USER", user);
                this.$router.push("/dashboard");
                this.cleanForm();
                this.spinShow = false;
              }
            })
            .fail(errorReport => {
              console.log(errorReport);
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>