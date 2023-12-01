// Define values.
const {StreamChat} = require("stream-chat");
const koa = require('koa')
const router = require('koa-router')();
const app = new koa();

const api_key = '95yk9fe5a4gb'
const api_secret = 'abp7mrpj4hwgs4qdnez7p65nc2ythdgxr3dsy25w9db5s9hb4m65j5pkmpjcrb32'
const user_id = 'xiyexi'

// Initialize a Server Client
const serverClient = StreamChat.getInstance( api_key, api_secret);



router.post('/token', async (ctx, next) => {
    // Create User Token
    const token = serverClient.createToken(user_id);
    console.log('token: \n', token , '\n')
    ctx.response.body = token
});


app.use(router.routes());

app.listen(4000, () => {
    console.log('koa start in port: 4000...');
})
