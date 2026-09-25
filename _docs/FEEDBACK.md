# Feedback dos clientes: o que o site espera do sistema

A página `feedback.html` já está pronta no site. Ela é de **link privado**: não entra
no menu nem no Google, e chega ao cliente por WhatsApp, com um código só dele:

```
https://soluterh.com.br/feedback.html?c=<codigo>
```

O objetivo declarado da Solute é **a avaliação no Google**. O depoimento escrito na
página vira o rascunho dessa avaliação: ao enviar, a pessoa recebe o próprio texto
pronto para copiar e o botão do Google ao lado.

Falta a parte do sistema: dois endereços públicos e uma tela para a equipe.

---

## 1. `GET /api/publico/feedback/<codigo>`

Serve para a página saber de quem é o link e não pedir nome e empresa de novo.

**Resposta (200):**

```json
{ "ok": true, "nome": "Marcos Dias", "empresa": "Solute RH" }
```

**Se o código não existir, já tiver sido usado ou estiver vencido:** qualquer coisa
diferente disso (404, ou `{"ok": false}`). A página segue funcionando e apenas pede
nome e empresa no formulário. **Não quebra nada.**

Deve devolver os mesmos cabeçalhos do blog: `Access-Control-Allow-Origin: *` e
`OPTIONS` respondido.

## 2. `POST /api/publico/feedback`

Recebe o feedback. Corpo em JSON:

| Campo | Tipo | Observação |
|---|---|---|
| `codigo` | string | o `?c=` da URL. Vazio quando a pessoa chega sem link |
| `nota` | número | de 1 a 5 |
| `texto` | string | 15 a 1500 caracteres |
| `nome` | string | 2 a 80 |
| `empresa` | string | 2 a 80 |
| `autoriza` | booleano | autorização para publicar como depoimento no site |
| `website` | string | campo-isca: se vier preenchido, é robô. Responder `{"ok":true}` e não gravar |

**Respostas:** `201 {"ok":true}` quando gravar. Em erro, `400` ou `429` com
`{"ok":false,"erro":"texto pronto para mostrar"}`, igual às Perguntas SoluteCast.

Vale repetir daquela rota: limite por IP, honeypot e a empresa resolvida pelo
domínio `soluterh.com.br`.

Se o endereço não existir ainda, a página continua funcionando: mostra o convite ao
Google e oferece enviar o mesmo texto pelo WhatsApp, já escrito. Nada se perde.

## 3. Tela para a equipe

No mesmo grupo **Site Solute**, ao lado de Blog e Perguntas SoluteCast:

- fila de feedbacks novos, com nota, texto, nome, empresa e data
- indicação de quem **autorizou publicar**
- ação **"Publicar como depoimento"**, que é o que alimenta a seção de depoimentos do site
- ação de arquivar, com possibilidade de restaurar, como nas Perguntas

Para gerar os links, o ideal é um botão por cliente na carteira: "Gerar link de
feedback", que cria o código e copia o link pronto para colar no WhatsApp.

---

## Uma regra do Google que não pode ser quebrada

O Google proíbe **escolher quem é convidado a avaliar com base na nota**. Convidar
só quem elogiou, e desviar quem reclamou para um canal privado, é motivo de punição,
incluindo a remoção das avaliações do perfil.

Por isso a página mostra o convite ao Google **para todo mundo**, com qualquer nota.
Se um dia alguém pedir para "só mostrar o Google para quem deu 5 estrelas", a
resposta é não.

## O link do Google

Fica em `SITE.googleReview`, em `_src/site.js`. Enquanto estiver vazio, o botão abre
a busca do perfil da Solute no Google Maps, o que funciona mas dá um passo a mais.

Para o link direto: **Perfil da Empresa no Google → Peça avaliações**. Ele tem o
formato `https://g.page/r/XXXXXXXX/review`.
