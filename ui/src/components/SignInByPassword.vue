<script>
import buxios from '../BubotCore/helpers/buxios'

export default {
  name: 'SignInByPassword',
  components: {
    'ExtExceotion': () => import('../BubotCore/components/Simple/ExtException'),
  },
  props: ['mode', 'active'],
  data () {
    return {
      valid0: false,
      valid1: false,
      showPassword: false,
      login: '',
      password: '',
      forgot: false,
      error: null,
      rules: {
        required: value => !!value || this.$t('Required'),
        min: v => v.length >= 1 || 'Min 8 characters',
        // emailMatch: () => ('The email and password you entered don\'t match'),
      },
    }
  },
  methods: {
    signIn: async function (event) {
      event.preventDefault()
      try {
        const config = {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        const data = `login=${this.login}&password=${this.password}`
        this.error = null
        const response = await buxios.post('/api/AuthService/User/sign_in_by_password', data, config)
        this.$emit('auth', response.data)
      } catch (err) {
        this.error = err.toDict();
      }
      return false
    },
    signUp: function () {

    }
  }
}
</script>

<template>
  <v-card
    flat
    class="pa-4"
  >
    <div
      :class="`subtitle-1 ${active?'':'primary--text withMethod'}`"
      @click="$emit('changeTab')"
    >
      {{ $t('auth.withPassword') }}
    </div>
    <v-form
      v-if="active"
      v-model="valid0"
      flat
    >
      <v-text-field
        v-model="login"
        :rules="[rules.required]"
        :label="$t('auth.Login')"
        required
      />
      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        :label="$t('auth.Password')"
        @click:append="showPassword = !showPassword"
      />
      <v-card-actions
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-btn
            color="primary"
            type="submit"
            :disabled="!valid0"
            @click.stop="signIn($event)"
          >
            {{ $t('auth.SignIn') }}
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-form>
    <v-row
      align="center"
      justify="center"
    >
      <p
        class="red--text caption"
      >
        <ext-exceotion :error="error"/>
      </p>
    </v-row>
  </v-card>
</template>

<style lang="scss">

  .withMethod:hover {
    cursor: pointer;
  }
</style>
