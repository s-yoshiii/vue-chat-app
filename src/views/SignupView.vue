<template>
  <v-app id="inspire">
    <div class="login-box">
      <v-card class="login-form">
        <v-card-title class="login-title">SignUp</v-card-title>
        <v-card-subtitle>ユーザー情報をご入力下さい</v-card-subtitle>
        <v-btn color="light-blue" text to="/login">ログインはこちら</v-btn>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="User Name"
            required
          ></v-text-field>
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
            :disabled="isValid"
            @click="submit"
            >SIGN UP</v-btn
          >
          <v-btn>CLEAR</v-btn>
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
    name: "",
    nameRules: [
      (v) => !!v || "名前を入力して下さい",
      (v) => (v && v.length <= 10) || "名前は10文字以内で入力して下さい",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "メールアドレスを入力して下さい",
      (v) => /.+@.+\..+/.test(v) || "メールアドレスが不正です",
    ],
    password: "",
    errorMessage: "",
  }),
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
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (result) => {
          console.log("successs", result);
          await result.user.updateProfile({
            displayName: this.name,
          });
          console.log("updateuser", this.user);
          localStorage.message = "新規作成に成功しました";
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log("fail", error);
          this.errorMessage = "ユーザーの新規作成に失敗しました。";
        });
    },
  },
};
</script>
<style scoped>
.login-form {
  margin: 50px;
  padding: 30px;
}
.login-box {
  width: clamp(600px, 50%, 1000px);
  margin: 0 auto;
  padding: 30px;
}
.login-title {
  display: inline-block;
}
.login-btn {
  margin-right: 20px;
}
.error-message {
  margin-top: 30px;
}
</style>
