<script>
// import { get_user } from '../BubotCore/components/Session/session'
// import CertSelect from '../BubotCore/components/Cert/CertSelect'
// import cades from '../BubotCore/components/Cert/cades.mixin'
import UrlParam, {navigate} from '../Helpers/UrlParam'

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
    'CurrentUser': () => import('../BubotCore/components/Session/CurrentUserInToolbar')
  },
  // mixins: [cades],
  data () {
    return {
      mode: 0,
      data: {
        'Auth': {
          methods: [
            {
              id: 'Password',
            },
            {
              id: 'Cert',
            },
            {
              id: 'OAuth',
              services: [
                {
                  id: 'Apple'
                },
                {
                  id: 'Facebook'
                },
                {
                  id: 'VK'
                },
                {
                  id: 'Saby'
                },
                {
                  id: 'Yandex'
                },
                {
                  id: 'Google'
                },
                {
                  id: 'Odnoklassniki'
                },
                {
                  id: 'MailRu'
                },
              ]
            }
          ],
          active: 0
        },
        'Reg': {
          methods: [
            {
              id: 'Password',
            },
            {
              id: 'Cert',
            },
            {
              id: 'OAuth',
              services: [
                {
                  id: 'Saby'
                }
              ]
            }
          ],
          active: 0
        }
      },
      cookie: null,
    }
  },

  computed: {
    modeName () {
      return this.mode ? 'Reg' : 'Auth'
    },
    actionsMethods () {
      return this.data[this.modeName]['methods']
    },
    user () {
      try {
        return this.$store.state['Session']['user']['title']
      } catch (e) {
        return ''
      }

    }
  },
  watch: {
    user (value) {
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
  methods: {
    async onAuth () {
      const urlParam = new UrlParam()
      const redirect = urlParam.get('redirect')
      if (redirect)
        navigate(redirect)
      await this.$store.dispatch('Session/signIn', null, { root: true })
    }
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
      style="border-bottom: thin solid #f0f0f0;"
    >
      <v-toolbar-title>Bubot</v-toolbar-title>
      <v-spacer />
      <CurrentUser
        hide-no-user
      />
      <v-divider vertical />
      <LangSelector class="d-flex flex-row-reverse" />
    </v-toolbar>
    <v-tabs
      v-model="mode"
      centered
      class="bordered pt-5"
    >
      <v-tab>{{ $t('auth.Entry') }}</v-tab>
      <v-tab>{{ $t('auth.Registration') }}</v-tab>
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
  </v-card>
</template>

<style lang="scss">
  .bordered {
    border-bottom: thin solid #f0f0f0;
  }
</style>
