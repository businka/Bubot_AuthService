<script>
// import { get_user } from '../BubotCore/components/Session/session'
// import CertSelect from '../BubotCore/components/Cert/CertSelect'
// import cades from '../BubotCore/components/Cert/cades.mixin'
// import {objHasOwnProperty} from '../Helpers/BaseHelper'
import UrlParam, {navigate} from '../Helpers/UrlParam'
import buxios from '../Helpers/buxios'

export default {
    name: 'Auth',
    components: {
        'LangSelector': () => import('../BubotCore/components/Simple/LangSelector'),
        'AuthWithPassword': () => import('./SignInByPassword'),
        'AuthWithCert': () => import('./SignInByCert'),
        'AuthWithOAuth': () => import('./SignInByOAuth'),
        'RegWithPassword': () => import('./SignUpByPassword'),
        'RegWithCert': () => import('./SignUpByCert'),
        'RegWithOAuth': () => import('./SignUpByOAuth'),
        'CurrentUser': () => import('../BubotCore/components/Session/CurrentUserInToolbar'),
        'UserProfile': () => import('./UserProfile')
    },
    // mixins: [cades],
    data() {
        return {
            mode: 0,
            uid: 'OcfDevice/AuthService/Auth',
            data: null,
            cookie: null,
        }
    },

    computed: {
        modeName() {
            if (this.data && this.mode && this.data['Reg']) {
                return 'Reg'
            } else {
                return 'Auth'
            }
        },
        actionsMethods() {
            return this.data ? this.data[this.modeName]['methods']: null
        },
        session() {
            try {
                return this.$store.state['Session']
            } catch (e) {
                return ''
            }
        },
    },
    watch: {
        user(value) {
            if (value) {
                this.onAuth()
            }
        }
    },
    // watch: {
    //   $route: {
    //     handler: function (route) {
    //       const query = route.query
    //       if (query) {
    //         this.redirect = query.redirect
    //       }
    //       this.onAuth()
    //     },
    //     immediate: true
    //   }
    // },
    mounted() {
        this.readAuthMethods()
    },

    methods: {
        onAuth: async function () {
            const urlParam = new UrlParam()
            const redirect = urlParam.get('redirect')
            if (redirect)
                navigate(redirect)
            await this.$store.dispatch('Session/onSignIn', null, {root: true})
        },
        readAuthMethods: async function () {
            let resp = await buxios.get('/AuthService/public_api/OcfDevice/AuthService/read_auth_methods')
            this.data = resp.data
            return resp.data
        },
    }

}
</script>

<template>
  <v-card
    flat
  >
    <v-toolbar
      flat
      dense
      tile
      class="auth-toolbar"
    >
      <v-toolbar-title>Bubot</v-toolbar-title>
      <v-spacer/>
      <CurrentUser
        v-if="session._id"
        large
      />
      <v-divider vertical></v-divider>
      <LangSelector large class="d-flex flex-row-reverse"></LangSelector>
    </v-toolbar>
    <UserProfile
      v-if="session._id"
    ></UserProfile>
    <v-container
      v-else-if="data"
    >
      <v-tabs
        v-model="mode"
        centered
        class="bordered pt-5"
      >
        <v-tab>{{ $t('auth.Entry') }}</v-tab>
        <v-tab
          v-if="data.Reg"
        >{{ $t('auth.Registration') }}</v-tab>
      </v-tabs>
      <v-container>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            xl="3"
            lg="4"
            md="5"
            sm="6"
          >
            <component
              :is="`${modeName}With${actionsMethods[data[modeName]['active']].id}`"
              :params="actionsMethods[data[modeName]['active']]"
              :mode="mode"
              :active="true"
              @auth="onAuth"
            />
            <div
              v-for="(elem, index) in actionsMethods"
              :key="index"
            >
              <component
                :is="`${modeName}With${actionsMethods[index].id}`"
                v-if="data[modeName]['active']!==index"
                :params="elem"
                :mode="mode"
                :active="false"
                @changeTab="data[modeName]['active']=index"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-container
      v-else
    >

    </v-container>
  </v-card>
</template>

<style lang="scss">
  .bordered {
    border-bottom: thin solid #f0f0f0;
  }

  .auth-toolbar {
    .v-toolbar__content {
      padding-right: 0;
      padding-top: 0;
      padding-bottom: 0;
      border-bottom: thin solid #f0f0f0;
    }
  }
</style>
