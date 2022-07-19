<template>
  <v-app id="inspire">
    <div class="login-box">
      <v-card class="login-form">
        <v-card-title class="login-title">Login</v-card-title>
        <v-card-subtitle>ユーザー情報をご入力下さい</v-card-subtitle>
        <v-btn color="light-blue" text to="/signup">新規登録はこちら</v-btn>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
          ></v-text-field>
          <v-btn
            color="success"
            class="login-btn"
            @click="submit"
            :disabled="isValid"
            >LOGIN</v-btn
          >
          <v-btn @click="reset">CLEAR</v-btn>
          <v-alert
            dense
            text
            type="success"
            class="success-message"
            v-if="message"
          >
            {{ message }}
          </v-alert>
          <v-alert
            class="error-message"
            dense
            outlined
            type="error"
            v-if="errorMessage"
          >
            {{ errorMessage }}
          </v-alert>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import firebase from "@/firebase/firebase";
export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "メールアドレスを入力して下さい",
      (v) => /.+@.+\..+/.test(v) || "メールアドレスが不正です",
    ],
    password: "",
    message: "",
    errorMessage: "",
  }),
  mounted() {
    if (localStorage.message) {
      this.message = localStorage.message;
      localStorage.message = "";
    }
  },
  computed: {
    isValid() {
      console.log("isValid", this.valid);
      return !this.valid;
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit() {
      console.log("submit call");
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          console.log("user", result.user);
          console.log("success");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("fail", error);
          this.errorMessage = "ログインに失敗しました。";
        });
    },
  },
};
</script>
<style scoped>
.login-form {
  margin: 150px;
  padding: 30px;
}
.login-box {
  width: 50%;
  margin: 0 auto;
  padding: 30px;
}
.login-title {
  display: inline-block;
}
.login-btn {
  margin-right: 20px;
}
.success-message,
.error-message {
  margin-top: 20px;
}
</style>
