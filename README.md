# OdontoControl

**OdontoControl** é um software desktop para gerenciamento de estoque e agendamentos projetado especialmente para dentistas. Com funcionalidades intuitivas, ele facilita o controle de produtos utilizados no dia a dia das clínicas odontológicas, permitindo o registro, edição, exclusão e visualização de itens e também funções para agendamentos de pacientes. O sistema também conta com autenticação para garantir a segurança dos dados.

## **Funcionalidades**

### 1. **Gerenciamento de Produtos**
- **Registrar novos produtos:** Adicione informações detalhadas como nome, descrição, quantidade, preço e categoria.
- **Editar produtos:** Atualize os detalhes e as quantidades de produtos já registrados.
- **Excluir produtos:** Remova itens que não são mais necessários.
- **Visualizar produtos:** Consulte todos os itens registrados com filtros por nome, categoria e quantidade disponível.

### 2. **Sistema de Login** (Não implementado)
- **Cadastro de usuários:** Permite criar contas para controlar o acesso ao sistema.
- **Autenticação segura:** Utilize credenciais únicas com senhas protegidas por hash.
- **Gestão de sessões:** Controle de login/logout para evitar acessos não autorizados.

### 3. **Interface Intuitiva**
- Interface moderna e fácil de usar, projetada para dentistas e suas equipes.
- Navegação simples entre as funcionalidades principais.

## **Tecnologias Utilizadas**

### **Frontend**
- [React](https://reactjs.org/) para desenvolvimento da interface do usuário.

### **Backend**
- [Node.js](https://nodejs.org/) com [Express.js](https://expressjs.com/) para gerenciamento de requisições.
- [JWT](https://jwt.io/) para autenticação segura.
- [TypeScript](https://www.typescriptlang.org/) linguagem usada para o backend.

### **Banco de Dados**
- [MySQL](https://www.mysql.com/) Banco de dados relacional e local para armazenar as informações de produtos e usuários.

## **Como Executar**

### **Pré-requisitos**
- [Node.js](https://nodejs.org/) instalado.
- Gerenciador de pacotes `npm` ou `yarn`.

### **Passos**
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/OdontoControl.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd OdontoControl
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie a aplicação:
   ```bash
   npm start
   ```
5. O software será iniciado em uma janela desktop.

## **Contribuição**
Contribuições são bem-vindas! Siga os passos abaixo para colaborar:
1. Faça um fork do repositório.
2. Crie uma branch para a sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça o commit das suas alterações:
   ```bash
   git commit -m "Adiciona nova feature"
   ```
4. Envie as alterações para o repositório principal:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.
