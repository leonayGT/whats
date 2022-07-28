const { Client, LocalAuth, List } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const express = require('express');
const router = express.Router()

router.use(
    express.urlencoded({
      extended: true,
    })
  );
  const client = new Client({
    authStrategy: new LocalAuth(),
});
client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});
router.use(express.json());
client.on("ready", () => {
    console.log('ok')
 })
router.post('/send-list', async (req, res) => {
  
var numero = 55 + req.body.numero + '@c.us'
var titulo_opcao = req.body.titulo
var mensagem = req.body.mensagem
var nomeBotao = req.body.nomeBotao
var opcao1 = req.body.opcao1
var descricao1 = req.body.descricao1
var tituloCorpo = req.body.tituloCorpo

        console.log("Client is ready!");
        const productsList = new List(
            mensagem,
            nomeBotao,
            [
                {
                    title: titulo_opcao,
                    rows: [
                        { id: "opcao1", title: opcao1, description: descricao1 }
                        
                    ],
                },
            ],
           tituloCorpo
        );
        client.sendMessage(numero, productsList).then(() => {
            res.status(200).json({
                status: true,
                response: "Mensagem enviada com sucesso!"
            })
        }).catch((err) => {
            res.status(500).json({
                status: false,
                response: "Erro ao envia mensagem"
            })
        }) 
        client.on("message", (message) => {
            if(message.type === 'list_response'){
              
            }
          });
})
router.post('/send-message', async (req, res) => {
    var numero = 55 + req.body.numero + '@c.us'
    var message = req.body.message
            client.sendMessage(numero, message).then(() => {
                res.status(200).json({
                    status: true,
                    response: "Mensagem enviada com sucesso!"
                })
            }).catch((err) => {
                res.status(500).json({
                    status: false,
                    response: "Erro ao envia mensagem"
                })
            }) 
            client.on("message", (message) => {
                if(message.type === 'list_response'){
                  
                }
              });
    })
client.initialize();

module.exports = router