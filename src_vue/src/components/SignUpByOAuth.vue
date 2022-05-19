<script>
export default {
  name: 'SignUpByOAuth',
  components: {},
  props: ['mode', 'active', 'params'],
  data () {
    return {
      showPassword: false,
      login: '',
      password: '',
      forgot: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        // emailMatch: () => ('The email and password you entered don\'t match'),
      },
    }
  },
}
</script>

<template>
  <v-card
    flat
    class="pa-4 d-flex d-inline-block"
  >
    <div
      v-for="service in params.services"
      :key="service.id"
      :class="`oauth-icon oauth-icon-position-${service.id}`"
    >
    </div>
  </v-card>
</template>

<style lang="scss">
  .oauth-icon {
    background: url("../assets/img/OAuthIcons.svg");
    background-repeat: no-repeat;
    width: 32px;
    height: 32px;
    margin-right: 6px;
  }

  .oauth-icon-position-VK {
    background-position: -80px 0;
  }

  .oauth-icon-position-Facebook {
    background-position: -40px 0;
  }

  .oauth-icon-position-Apple {
    background-position: 0 0;
  }

  .oauth-icon-position-Yandex {
    background-position: -160px 0;
  }

  .oauth-icon-position-Google {
    background-position: -120px 0;
  }

  .oauth-icon-position-Odnoklassniki {
    background-position: -240px 0;
  }

  .oauth-icon-position-MailRu {
    background-position: -200px 0;
  }

  .oauth-icon-position-Saby {
    background-position: -440px 0;
  }


</style>
