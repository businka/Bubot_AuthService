import urllib.parse

from Bubot.Core.DataBase.Mongo import Mongo as Storage
from Bubot.Helpers.ExtException import Unauthorized
from BubotObj.OcfDevice.subtype.WebServer.WebServer import WebServer
from BubotObj.User.extension.AuthService.User import User
from aiohttp import FormData
from aiohttp.test_utils import AioHTTPTestCase


class TestAuthByPassword(AioHTTPTestCase):
    test_login = 'test_add_password'
    test_password = 'password'

    async def get_application(self):
        self.user = User(Storage.connect())
        device = WebServer.init_from_file()
        app = await device.run_web_server()
        return app.result

    async def delete_user_by_login(self, login):
        await self.user.find_user_by_auth('password', login)
        await self.user.delete_one()

    async def test_sign_up_by_password(self):
        try:
            await self.delete_user_by_login(self.test_login)
        except Unauthorized:
            pass

        data = FormData({'login': self.test_login, 'password': self.test_password})
        resp = await self.client.request(
            "POST",
            "/public_api/AuthService/User/sign_up_by_password",
            data=data
        )
        resp_data = await resp.json()
        self.assertEqual(200, resp.status, 'response status')

        # повторный вызов должен вернуть исключение что пользователь уже зарегистрирован

        data = FormData({'login': self.test_login, 'password': self.test_password})
        resp = await self.client.request(
            "POST",
            "/public_api/AuthService/User/sign_up_by_password",
            data=data
        )
        resp_data = await resp.json()
        self.assertEqual(500, resp.status, 'response status')
        self.assertEqual(resp_data['message'], 'Такой пользователь уже зарегистрирован', 'error_message')

    async def test_sign_in_by_password_good_password(self):
        param = FormData({'login': self.test_login, 'password': self.test_password})
        resp = await self.client.request(
            "POST",
            "/public_api/AuthService/User/sign_in_by_password",
            data=param
        )
        if resp.status != 200:
            print(await resp.text())
        self.assertEqual(200, resp.status, 'response status')
        set_cookie = resp.headers.get('Set-Cookie')
        session = urllib.parse.unquote(set_cookie).split(';')
        self.assertEqual('session', session[0][:7], 'set session')
        session = session[0][8:]
        data = await resp.json()
        self.assertEqual(session, data['session'])

        resp = await self.client.request(
            "POST",
            "/public_api/AuthService/User/sign_in_by_password",
            data=param
        )

        set_cookie2 = resp.headers.get('Set-Cookie')
        data2 = await resp.json()

        if resp.status != 200:
            print(await resp.text())
        self.assertEqual(200, resp.status, 'response status')
        self.assertIsNone(set_cookie2, 'don\'t new session')
        self.assertEqual(session, data['session'], 'return first session')
        self.assertEqual(session, data2['session'])

        resp = await self.client.request(
            "POST",
            "/api/AuthService/User/sign_out",
            data=param
        )
        set_cookie3 = resp.headers.get('Set-Cookie')
        session2 = urllib.parse.unquote(set_cookie3).split(';')
        self.assertEqual('session', session2[0][:7], 'set session')
        session2 = session2[0][8:]
        data3 = await resp.json()
        if resp.status != 200:
            print(await resp.text())
        self.assertEqual('""', session2, 'new_session')
        self.assertEqual(200, resp.status, 'response status')
        self.assertEqual({}, data3)

    async def test_get_current_user(self):
        data = FormData({'login': self.test_login, 'password': self.test_password})
        resp = await self.client.request(
            "POST",
            "/public_api/AuthService/User/auth_by_password",
            data=data
        )
        resp = await self.client.request(
            "GET",
            "/public_api/AuthService/User/read_session_info",
        )
        print(await resp.text())
        self.assertEqual(200, resp.status, 'response status')
