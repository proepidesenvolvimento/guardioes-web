# Guardiões da Saúde - Dashboards

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Os guardiões da saúde é um projeto de vigilância ativa e participativa na área da saúde de mentoria da PROEPI e agora está sendo desenvolvido em participação com a UnB. 

A parte web do projeto é onde é analisado e mostrado os dados obtidos na vigilância ativa/participativa. É possível ver vários gráficos e informações melhor organizadas a fim de facilitar o processo da vigilância ativa/participativa.

## Como rodar o Guardiões da Saúde - Dashboards

Para rodar os serviços basta digitar o comando a seguir:

```shell
docker-compose up
```

Por padrão já está configurado para subir o ambiente com configurações de usuário. Caso deseja terminar essa configuração, siga este tutorial: [link](https://github.com/lappis-unb/rasa-ptbr-boilerplate/blob/v4.3.x/docs/setup_user_elasticsearch.md). Caso contrário, comente a seguinte linha do arquivo /elasticsearch/elasticsearch.yml:

```shell
...
#xpack.security.enabled: true
...
```

Portas:

| Serviço | Porta |
| ------------- | ------------- |
| Elastic | 9200 |
| Kibana | 5601 |
| Site React | 8080 |

## Como rodar apenas o site com React:

Rode o seguinte comando para instalar as dependêmcias. Caso de erro rode novamente com permissão de admininstrador. 

~~~Shell
npm install
~~~

O próximo comando é para subir o programa localmente:

~~~shell
npm start
~~~

## Possíveis erros

### Versão do NPM e do NODE:

Antes de fazer a instalação tenha certeza que o seu node e o npm estejam atualizado, e que sejam compatíveis entre sí. Neste [link](https://nodejs.org/pt-br/download/releases/) Você poderá checar as versões de cada npm para cada node. Essas versões caso não estejam certas podem gerar conflitos.

### Npm install:

Pode dar erro logo quando se roda o comando npm install e nesse caso uma possível solução é rodar os seguintes comandos:

~~~Shell
sudo rm -rf node_modules
npm cache clean --force
~~~

Após isso repita o processo do início. 

## Stack de monitoramento

A stack de monitoramento utiliza o ElasticSearch e o Kibana.

### Como criar usuário no Kibana com permissão de visualização

Para conseguir executar os passos a seguir, é necessário que o xpack.security esteja habilitado (olhar subseção anterior).

Criando usuário: 
* Acesse o Kibana com um superuser
* Vá nas configurações (canto inferior esquerdo)
* Clique em Users (Security)
* Preencha os campos requeridos
* No campo de roles adicione as seguintes:
  * apm_system
  * kibana_dashboard_only_user
  * watcher_user

## Como contribuir

Ficaremos muito felizes de receber e incorporar suas contribuições. Tem algumas informações adicionais sobre o estilo do código e a documentação.

Em geral o processo é bem simples:

- Crie uma issue descrevendo uma feature que você queira trabalhar (ou olhe as issues com o label help-wanted e good-first-issue)
- Escreva seu código, testes e documentação
- Abra um pull request descrevendo as suas alterações propostas
- Seu pull request será revisado por um dos mantenedores, que pode levantar questões para você sobre eventuais mudanças necessárias ou questões.

## Como conseguir ajuda

Caso seja dúvida técnica sobre a _stack_ do projeto, siga os passos descritos acima de como executar em modo desenvolvimento. Caso a duvida persista ou seja sobre outro assunto, abra uma _issue_ com uma **TAG** no nome ```[duvida]``` que tentaremos responder o mais rápido possível.

Em caso de dúvidas em relação às tecnologias que utilizamos, sugerimos as suas próprias documentações e fóruns. Porém, sempre estamos abertos para ajudar, então comente a dificuldade que está passando na _issue_ que está resolvendo que iremos auxiliar.  

## License & copyright

ProEpi, Associação Brasileira de Profissionais de Epidemiologia de Campo

Licensed under the [Apache License 2.0](LICENSE.md).
