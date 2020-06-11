# Firebird API

Uma API Rest NodeJS que recebe um SQL, envia para um banco de dados Firebird e retorna um JSON.

## Instalação


```bash
npm install 
```

Você também precisa criar as variáveis de ambiente com usuário e senha do seu banco de dados:
```bash
FIREBIRDAPI_USER: SYSDBA
FIREBIRDAPI_PASSWORD: masterkey
```


Você também precisa criar o arquivo `src/config.json` com a seguinte estrutura:

```
{
    "connection": {
        "database": "C:/dados/database.fdb",
        "host":     "127.0.0.1",
        "port":     "3050"
    },
    "secret": "minha_chave_secreta",
    "cors": {
        "allowServerToServerAccess": false,
        "whitelist": ["meusite.com.br"]
    }
}
```

* `connection.database`: O endereço físico do seu banco de dados.
* `connection.host`: A URL ou IP do seu banco de dados.
* `connection.port`: A porta do firebird no seu servidor.
* `secret`: A chave secreta que foi utilizada para gerar o token JWT
* `cors.allowServerToServerAccess`: *Opcional* Default `false`. Se `true` o cors permite que a API seja acessada diretamente de outros servidores ou de ferramentas REST como Postman, Insomnia, dentre outros.
* `cors.whitelist`: Uma lista de domínios a partir de onde é permitido acessar a API. Há duasformas possíveis de uso:

1. **Recomendado** ["meusite.com.br", "meusite2.com.br"] permitirá que sua API seja acessada apenas de dentro de páginas destes domínios.
2. ["*"] permite acesso a partir de qualquer domínio da WEB.

## Endpoint

Acessando o recurso principal:
```
POST /query
Content-Type: application/json
Authorization: seu_token

{
   "sql": "select * from MY_TABLE"
}
```

O retorno será um JSON: 

```
[
  {
    "ID": 6,
    "NOME": "José",
    "CIDADE": "São Paulo",
    "ESTADO": "SP"
  },
  {
    "ID": 2,
    "NOME": "Paulo",
    "CIDADE": "Palmas",
    "ESTADO": "TO"
  }
]
 ```

A resposta contém um header X-Total-Count com o total de registros retornados.


## Dependências
Esta API utiliza o pacote [node-firebird](https://www.npmjs.com/package/node-firebird) na sua versão mais estável (0.8.9). Atualizações para versões posteriores podem não se comportar corretamente.