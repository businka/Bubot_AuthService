<script>
import buxios from '../Helpers/buxios'

export default {
    name: 'UserProfile',
    components: {
        'ExtException': () => import('../BubotCore/components/Simple/ExtException'),
    },
    props: ['mode', 'active'],
    data() {
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
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }
                const data = `login=${this.login}&password=${this.password}`
                this.error = null
                const response = await buxios.post('/AuthService/public_api/User/sign_in_by_password', data, config)
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
    <v-form
      v-if="active"
      v-model="valid0"
      flat
    >
    </v-form>
    <v-row
      align="center"
      justify="center"
    >
      <p
        class="red--text caption"
      >
        <ext-exception :value="error"/>
      </p>
    </v-row>
  </v-card>
</template>

<style lang="scss">

  .withMethod:hover {
    cursor: pointer;
  }
</style>
