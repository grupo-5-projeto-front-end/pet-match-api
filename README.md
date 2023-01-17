# PetMatch API

Api construida com o objetivo de gerenciar usuarios e suas informações, além das informações do seus pets, usada na plataforma oficial do PetMatch.</p>

[Link para o repositório](https://github.com/grupo-5-projeto-front-end/pet-match-api)

- Versão do node usada: **v18.12.1**.
- Versão do yarn usada: **v1.22.19**.

# Rota de Login

## POST /login - Logar com usuário

#

#### Não precisa de autenticação.

##### Campos que você deve passar:

- email - Deve ser uma string e ser um email
- password - Deve ser uma string

#### Retorno esperado

##### Status 200 ok

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbnppbmhvQG1haWwuY29tIiwiaWF0IjoxNjczNTQyNTg2LCJleHAiOjE2NzM2Mjg5ODYsInN1YiI6ImYyZDE4NjI5LWJkMGEtNDE0OS04NWMxLTliMzA5YzgwNWVjYiJ9.DiD53VhBXgBNwagZ_feONii53rnyT8QdcI2pUd2NzUQ"
}
```

# Rotas de usuário

## POST /users - Criar um usuário

#

#### Não precisa de autenticação.

##### Campos que você deve passar:

- name - Deve ser uma string
- email - Deve ser uma string e ser um email
- password - Deve ser uma string
- phone - Deve ser um string
- avatar - Deve ser uma string e url de uma imagem válida
- address - Deve conter o obejeto com as seguintes informações:
  - city - Deve conter uma string
  - state - Deve conter uma string com 2 caracteres
  - street - Deve conter uma string
  - number - Deve conter uma string
  - zipCode - Deve conter uma string com 8 caracteres

#### Retorno esperado

##### Status 201 created

```json
{
  "updatedAt": "2023-01-12T02:54:08.442Z",
  "createdAt": "2023-01-12T02:54:08.442Z",
  "isActive": true,
  "address": {
    "id": "71fe93d5-f057-4041-94cd-dd457e54c814",
    "city": "Coritiba",
    "state": "PR",
    "street": "Rua da Kenzie",
    "number": "140",
    "zipCode": "00000000"
  },
  "avatar": "img",
  "phone": "21971717171",
  "email": "kenzinho3@mail.com",
  "name": "Kenzinho3",
  "id": "f88a2de8-ccf0-43e7-86dd-9280b4f3d20d"
}
```

#

## GET /users - Pegar todos os usuários

#

#### Não precisa de autenticação.

##### Essa rota não possui body.

#### Retorno esperado

##### Status 200 ok

```json
[
	{
		"updatedAt": "2023-01-12T02:52:54.492Z",
		"createdAt": "2023-01-12T02:52:54.492Z",
		"isActive": true,
		"address": {
			"id": "b1180465-87d2-4442-b9f8-1daef79c93f1",
			"city": "Coritiba",
			"state": "PR",
			"street": "Rua da Kenzie",
			"number": "140",
			"zipCode": "00000000"
		},
		"avatar": "img",
		"phone": "21971717171",
		"email": "kenzinho@mail.com",
		"name": "Kenzinho",
		"id": "f2d18629-bd0a-4149-85c1-9b309c805ecb"
	},
	...
]
```

#

## GET /users/:id - Pegar um usuário pelo id

#

#### Não precisa de autenticação.

##### Essa rota não possui body.

#### Retorno esperado

##### Status 200 ok

```json
{
  "updatedAt": "2023-01-12T02:52:54.492Z",
  "createdAt": "2023-01-12T02:52:54.492Z",
  "isActive": true,
  "address": {
    "id": "b1180465-87d2-4442-b9f8-1daef79c93f1",
    "city": "Coritiba",
    "state": "PR",
    "street": "Rua da Kenzie",
    "number": "140",
    "zipCode": "00000000"
  },
  "avatar": "img",
  "phone": "21971717171",
  "email": "kenzinho@mail.com",
  "name": "Kenzinho",
  "id": "f2d18629-bd0a-4149-85c1-9b309c805ecb"
}
```

#

## PATCH /users/:id - Atualizar informações de um usuário

#

#### Precisa de autenticação.

##### Campos que você deve passar:

Todos os campos são opcionais.

- name - Deve ser uma string
- email - Deve ser uma string e ser um email
- password - Deve ser uma string
- phone - Deve ser um string
- avatar - Deve ser uma string e url de uma imagem válida

#### Retorno esperado

##### Status 200 ok

```json
{
  "createdAt": "2023-01-12T02:52:54.492Z",
  "updatedAt": "2023-01-12T02:53:15.662Z",
  "avatar": "img",
  "phone": "21971717171",
  "email": "kenzinho@mail.com",
  "name": "Kenzinho"
}
```

#

## DELETE /users - Deletar um usuário

#

#### Precisa de autenticação.

##### Essa rota não possui body.

#### Retorno esperado

##### Status 204 No content

Não possui body de retorno.

# Rotas de Pet

## POST /pets - Criar um pet

#

#### Precisa de autenticação.

##### Campos que você deve passar:

- name - Deve ser uma string
- sex - Deve ser uma string
- category - Deve ser uma string
- breed - Deve ser uma string
- age - Deve ser uma string
- bio - Deve ser uma string
- avatar - Deve ser uma string com url de imagem válida

#### Retorno esperado

##### Status 201 created

```json
{
  "createdAt": "2023-01-12T17:54:01.390Z",
  "updatedAt": "2023-01-12T17:54:01.390Z",
  "isActive": true,
  "avatar": "img",
  "bio": "Biografia de teste do pet",
  "age": "5",
  "breed": "Pinscher",
  "category": "Cachorro",
  "sex": "Macho",
  "name": "petTeste2",
  "id": "9bd32422-e3ce-4099-9115-fdbd99539c55"
}
```

#

## GET /pets - Pegar todos os pets

#

#### Não precisa de autenticação.

##### Essa rota não possui body.

#### Retorno esperado

##### Status 200 ok

```json
[
	{
		"id": "0a09db1e-7c26-4f00-bbc7-0365a919f253",
		"name": "petTeste",
		"sex": "Macho",
		"category": "Cachorro",
		"breed": "Pinscher",
		"age": "5",
		"bio": "Biografia de teste do pet",
		"avatar": "img",
		"isActive": true,
		"createdAt": "2023-01-12T02:54:24.260Z",
		"updatedAt": "2023-01-12T02:54:24.260Z",
		"deletedAt": null
	},
	...
]
```

#

## GET /pets/:id - Pegar um pet pelo id

#

#### Não precisa de autenticação.

##### Essa rota não possui body.

#### Retorno esperado

##### Status 200 ok

```json
{
  "createdAt": "2023-01-12T02:54:24.260Z",
  "updatedAt": "2023-01-12T02:54:24.260Z",
  "isActive": true,
  "avatar": "img",
  "bio": "Biografia de teste do pet",
  "age": "5",
  "breed": "Pinscher",
  "category": "Cachorro",
  "sex": "Macho",
  "name": "petTeste",
  "id": "0a09db1e-7c26-4f00-bbc7-0365a919f253"
}
```

#

## PATCH /pets/:id - Atualizar informações de um pet

#

#### Precisa de autenticação.

##### Campos que você deve passar:

Todos os campos são opcionais.

- name - Deve ser uma string
- sex - Deve ser uma string
- category - Deve ser uma string
- breed - Deve ser um string
- age - Deve ser um string
- bio - Deve ser um string
- avatar - Deve ser uma string e url de uma imagem válida

#### Retorno esperado

##### Status 200 ok

```json
{
  "createdAt": "2023-01-12T02:54:24.260Z",
  "updatedAt": "2023-01-12T17:51:26.096Z",
  "isActive": true,
  "avatar": "img",
  "bio": "Biografia de teste do pet",
  "age": "5",
  "breed": "Pinscher",
  "category": "Cachorro",
  "sex": "Macho",
  "name": "Pet alterado",
  "id": "0a09db1e-7c26-4f00-bbc7-0365a919f253"
}
```

#

## DELETE /pets/:id - Deletar um pet

#

#### Precisa de autenticação.

##### Essa rota não possui body.

#### Retorno esperado

##### Status 204 No content

Não possui body de retorno.

# Rotas de Comentário

## POST /comments/:id - Criar um comentário

#

O id passado no paramêtro, deve ser do usuário que vai receber o comentário.

#### Precisa de autenticação.

##### Campos que você deve passar:

- comment - Deve ser uma string

#### Retorno esperado

##### Status 201 created

```json
{
  "updatedAt": "2023-01-12T17:10:36.325Z",
  "createdAt": "2023-01-12T17:10:36.325Z",
  "userId": "f2d18629-bd0a-4149-85c1-9b309c805ecb",
  "comment": "Novo comentário 3",
  "id": "18b1b9db-f457-49ee-9e12-0afaeaa24288"
}
```

#

## GET /comments/:id - Pegar todos os comentários de um usuário

#

#### Precisa de autenticação.

##### Essa rota não possui body.

#### Retorno esperado

##### Status 200 ok

```json
{
  "updatedAt": "2023-01-12T02:54:08.442Z",
  "createdAt": "2023-01-12T02:54:08.442Z",
  "isActive": true,
  "comments": [
    {
      "updatedAt": "2023-01-12T13:47:11.582Z",
      "createdAt": "2023-01-12T02:54:43.222Z",
      "userId": "f2d18629-bd0a-4149-85c1-9b309c805ecb",
      "comment": "Novo comentário alterado",
      "id": "14e9a578-c696-46c8-93e3-6dfafdc1e765"
    },
    {
      "updatedAt": "2023-01-12T17:04:35.548Z",
      "createdAt": "2023-01-12T17:04:35.212Z",
      "userId": "f2d18629-bd0a-4149-85c1-9b309c805ecb",
      "comment": "Novo comentário 2",
      "id": "53ab5bb7-0954-470d-a2a3-0a83705fdff3"
    }
  ],
  "address": {
    "id": "71fe93d5-f057-4041-94cd-dd457e54c814",
    "city": "Coritiba",
    "state": "PR",
    "street": "Rua da Kenzie",
    "number": "140",
    "zipCode": "00000000"
  },
  "avatar": "img",
  "phone": "21971717171",
  "email": "kenzinho3@mail.com",
  "name": "Kenzinho3",
  "id": "f88a2de8-ccf0-43e7-86dd-9280b4f3d20d"
}
```

#

## PATCH /comments/:id - Atualizar um comentário

#

#### Precisa de autenticação.

##### Campos que você deve passar:

Campo opcional.

- comment - Deve ser uma string

#### Retorno esperado

##### Status 200 ok

```json
{
  "updatedAt": "2023-01-12T13:47:11.582Z",
  "createdAt": "2023-01-12T02:54:43.222Z",
  "userId": "f2d18629-bd0a-4149-85c1-9b309c805ecb",
  "comment": "Novo comentário alterado",
  "id": "14e9a578-c696-46c8-93e3-6dfafdc1e765"
}
```

#

## DELETE /comments/:id - Deletar um comentário

#

#### Precisa de autenticação.

##### Essa rota não possui body.

#### Retorno esperado

##### Status 204 No content

Não possui body de retorno.

# Rotas de Like

## POST /likes/:id - Criar um like

#

O id passado no paramêtro, deve ser do pet que vai receber o like.

#### Precisa de autenticação.

##### Essa requesição não possui body.

#### Retorno esperado

##### Status 201 created

```json
{
  "likes": [
    {
      "id": "07b2946e-182f-4a43-ad55-ce4f5479555a"
    }
  ],
  "createdAt": "2023-01-13T17:25:11.732Z",
  "updatedAt": "2023-01-13T17:25:11.732Z",
  "isActive": true,
  "avatar": "img",
  "bio": "Biografia de teste do pet",
  "age": "5",
  "breed": "Pinscher",
  "category": "Cachorro",
  "sex": "Macho",
  "name": "petTeste3",
  "id": "6d61e788-7d53-4357-9eac-4d7dfc19a100"
}
```

#

## GET /likes/:id - Pegar todos os likes de um pet

#

O id passado no paramêtro, deve ser do pet que você quer ver os likes.

#### Precisa de autenticação.

##### Essa rota não possui body.

#### Retorno esperado

##### Status 200 ok

```json
[
  {
    "id": "a5a84074-9b6f-4fe5-ae02-50129133adf5"
  },
  {
    "id": "8e8e7b02-be3c-446d-a863-63b08dc31c59"
  }
]
```

#

## DELETE /likes/:id - Deletar um like

#

O id passado deve ser de um like.

#### Precisa de autenticação.

##### Essa rota não possui body.

#### Retorno esperado

##### Status 204 No content

Não possui body de retorno.
