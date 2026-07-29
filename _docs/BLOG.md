# Blog da Solute RH: integração com o sistema

O blog do site não tem banco de dados nem painel próprio. Ele lê uma **fonte JSON**
e monta as páginas sozinho. Isso permite que **o sistema da Solute seja o painel**:
vocês publicam lá, e o site reflete na hora.

```
Sistema da Solute  ──►  JSON  ──►  blog.html (listagem)
                                └► post.html?post=<slug> (artigo)
```

---

## 1. Onde se configura a origem

Um único lugar: `_src/site.js`, no objeto `BLOG`.

```js
const BLOG = {
  source: 'data/posts.json',        // <<< troque aqui
  perPage: 6,                       // quantos carregam por vez
  fallbackCover: '',                // capa usada quando o post nao tiver imagem
  author: 'Rosemeire Moreira',      // autor padrao do feed
  authorPhoto: 'media/time-rose.webp',
};
```

Depois é só rodar `node _tools/build-site.js`.

O valor de `source` pode ser:

| Cenário | Valor de `source` | Observação |
|---|---|---|
| Arquivo no próprio site | `data/posts.json` | O sistema sobrescreve esse arquivo via FTP/API de deploy |
| Endpoint do sistema | `https://sistema.soluterh.com.br/api/posts` | Precisa liberar CORS (ver seção 4) |
| Endpoint com caminho relativo | `/api/posts` | Se o sistema estiver no mesmo domínio, não precisa de CORS |

---

## 2. Formato do JSON

A resposta pode ser um **array direto** ou um objeto com a chave `posts`,
`data` ou `items`. Os três formatos abaixo funcionam:

```json
{ "posts": [ … ] }        // recomendado
{ "data":  [ … ] }
[ … ]
```

### Campos de cada post

| Campo | Tipo | Obrigatório | Descrição |
|---|---|:---:|---|
| `slug` | string | **sim** | Identificador na URL. Só letras minúsculas, números e hífen. Ex: `plano-de-cargos-2026` |
| `title` | string | **sim** | Título do artigo |
| `excerpt` | string | recomendado | Resumo de 1 a 3 linhas. Aparece no card e na prévia do WhatsApp/LinkedIn |
| `cover` | string | recomendado | **Foto de capa.** URL completa (`https://...`) ou caminho no site (`media/foto.webp`) |
| `coverAlt` | string | não | Texto alternativo da capa (acessibilidade e SEO) |
| `date` | string | **sim** | Data de publicação: `"2026-07-28"` ou `"2026-07-28T09:00:00Z"` |
| `updated` | string | não | Data da última edição, mesmo formato |
| `author` | string | não | Padrão: `"Solute RH"` |
| `category` | string | recomendado | Vira o filtro na listagem. Ex: `"Cargos e Salários"` |
| `tags` | array de strings | não | Usadas na busca e exibidas no rodapé do artigo |
| `readingMinutes` | número | não | Se ausente, é calculado pelo tamanho do texto |
| `type` | string | não | `post`, `video` ou `carousel`. Se ausente, é deduzido: tem `images` com mais de 1 vira carrossel, tem `video` vira vídeo |
| `images` | array de strings | não | **Carrossel.** Lista de URLs das imagens, na ordem |
| `video` | objeto ou string | não | **Vídeo do post.** Ver seção 3 |
| `button` | objeto | não | **Botão opcional** no card: `{ "label": "Quero saber mais", "url": "https://..." }` |
| `authorPhoto` | string | não | Foto redonda do autor. Padrão: a foto da Rose |
| `link` | string | não | **Link externo.** Se o post não tiver `body`, o card aponta direto para cá |
| `body` | string (HTML) | **sim*** | Conteúdo do artigo em HTML. *Opcional se houver `link` |
| `featured` | boolean | não | `true` coloca o post em destaque no topo da listagem |
| `published` | boolean | não | `false` esconde o post do site (padrão: `true`) |

### Os três formatos do feed

O blog é exibido como um feed, no estilo de uma rede social: cada publicação
mostra o autor com foto redonda, a data, a categoria e o formato.

| Formato | Como declarar | Como aparece |
|---|---|---|
| **Publicação** | `cover` com uma imagem | Foto única |
| **Vídeo** | `video` (YouTube ou mp4) | Player embutido no card |
| **Carrossel** | `images` com 2 ou mais URLs | Arrasta de lado, com setas, contador e pontinhos |

O campo `type` é opcional: se não vier, o formato é deduzido pelo conteúdo.

### Exemplo mínimo

```json
{
  "posts": [
    {
      "slug": "nova-regra-da-nr-01",
      "title": "O que muda na NR-01 em 2026",
      "excerpt": "As três alterações que exigem ação imediata do RH.",
      "cover": "https://sistema.soluterh.com.br/uploads/nr01-capa.jpg",
      "date": "2026-07-28",
      "author": "Rosemeire Moreira",
      "category": "Conformidade",
      "tags": ["nr-01", "conformidade"],
      "video": { "type": "youtube", "id": "ID_DO_VIDEO" },
      "link": "https://www.gov.br/trabalho/pt-br",
      "body": "<p>Texto do artigo em HTML.</p><h2>Subtítulo</h2><p>Mais texto.</p>",
      "featured": true,
      "published": true
    }
  ]
}
```

### HTML aceito no `body`

Tags liberadas: `p`, `br`, `strong`, `b`, `em`, `i`, `u`, `s`, `small`,
`h2`, `h3`, `h4`, `ul`, `ol`, `li`, `blockquote`, `hr`, `a`, `img`,
`figure`, `figcaption`, `code`, `pre`, `table`, `thead`, `tbody`, `tr`, `th`, `td`,
`iframe` (só YouTube, Vimeo, Spotify e Google Maps), `video`, `source`, `span`, `div`.

Tudo o que estiver fora dessa lista é removido automaticamente, assim como
atributos `on*` e URLs `javascript:`. É uma proteção contra publicação acidental
de conteúdo colado de fora, não uma limitação do editor.

---

## 3. Vídeo no post

Três formas de informar, todas aceitas:

```jsonc
"video": { "type": "youtube", "id": "ID_DO_VIDEO" }

"video": { "type": "mp4", "src": "https://.../aula.mp4", "poster": "https://.../capa.jpg" }

"video": "https://www.youtube.com/watch?v=ID_DO_VIDEO"   // link puro também funciona
```

O vídeo aparece logo abaixo da capa, em 16:9, e o card na listagem ganha um
botão de play sobreposto.

Também dá para embutir vídeos **no meio do texto**, dentro do `body`:

```html
<p>Antes do vídeo.</p>
<iframe src="https://www.youtube-nocookie.com/embed/ID_DO_VIDEO" allowfullscreen></iframe>
<p>Depois do vídeo.</p>
```

---

## 3b. Carrossel

```jsonc
{
  "type": "carousel",
  "title": "5 sinais de que o seu RH está travado",
  "excerpt": "Arraste para ver todos.",
  "images": [
    "https://sistema.soluterh.com.br/uploads/slide-1.jpg",
    "https://sistema.soluterh.com.br/uploads/slide-2.jpg",
    "https://sistema.soluterh.com.br/uploads/slide-3.jpg"
  ]
}
```

No celular arrasta com o dedo. No computador aparecem setas ao passar o mouse,
mais um contador (`1/5`) e os pontinhos na base. Use imagens de mesma proporção,
senão o corte fica irregular entre os slides.

## 3c. Botão no card

```jsonc
"button": { "label": "Quero o diagnóstico gratuito", "url": "https://wa.me/5532999501615" }
```

O botão aparece no rodapé do card, ao lado do "Ler o artigo completo". Serve para
mandar direto ao WhatsApp, a uma página de venda ou a um formulário.

## 4. Se o sistema servir o JSON por API

O navegador do visitante vai buscar o JSON direto do sistema, então o endpoint
precisa devolver estes cabeçalhos:

```http
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Origin: https://soluterh.com.br
Cache-Control: public, max-age=300
```

O endpoint deve ser **público e somente leitura** (`GET`). Nunca exponha nele
dados de usuários, rascunhos ou qualquer informação interna: devolva apenas os
posts com `published: true`.

Se o sistema estiver no mesmo domínio do site (ex.: `soluterh.com.br/api/posts`),
o cabeçalho `Access-Control-Allow-Origin` é dispensável.

---

## 5. Alternativa: gerar arquivo no deploy

Se preferir não expor API, o sistema pode simplesmente **escrever o
`data/posts.json`** no servidor a cada publicação (via FTP, SFTP ou script).
Nada mais precisa mudar no site.

Essa opção tem duas vantagens: não depende do sistema estar no ar para o blog
funcionar, e é mais rápida para o visitante.

---

## 6. Sobre SEO

Hoje a listagem (`blog.html`) é indexável e cada artigo é renderizado em
`post.html?post=<slug>`, que define título, descrição, imagem e dados
estruturados dinamicamente. O Google executa JavaScript e indexa essas páginas,
mas com um atraso maior do que em páginas estáticas.

Se o volume de artigos crescer e o blog virar canal importante de busca
orgânica, o passo seguinte é gerar uma página estática por artigo no momento da
publicação. A estrutura já está preparada para isso: bastaria um script que lê o
mesmo `posts.json` e escreve `blog-<slug>.html`. Vale fazer quando houver
volume, não antes.

---

## 7. Checklist para quem for implementar no sistema

- [ ] Endpoint ou arquivo devolvendo o JSON no formato acima
- [ ] `slug` único e estável por post (não mudar depois de publicado, quebra links)
- [ ] `date` no formato ISO (`AAAA-MM-DD`)
- [ ] Imagens de capa em proporção **16:10 ou 16:9**, largura mínima de 1200px
- [ ] `published: false` para rascunhos
- [ ] Só posts publicados no retorno público
- [ ] CORS liberado, se for por API
- [ ] Atualizar `BLOG.source` em `_src/site.js` e rodar `node _tools/build-site.js`
