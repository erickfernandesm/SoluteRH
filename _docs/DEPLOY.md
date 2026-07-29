# Publicar o site novo em soluterh.com.br

Objetivo: colocar o site novo no domínio principal e mover o site atual
(WordPress) para um endereço reservado, onde ele continue acessível.

## O cenário hoje

| | |
|---|---|
| Domínio | `soluterh.com.br` |
| Hospedagem | TurboCloud, painel cPanel, servidor LiteSpeed |
| Site atual | WordPress 7.0.2 + Elementor, PHP 8.4 |
| Sistema | `sistema.soluterh.com.br` (Next.js, não é afetado por nada aqui) |

O site novo é estático: só arquivos. Não usa PHP, banco de dados nem WordPress.

---

## Antes de qualquer coisa: backup

Faça **os dois**, e confirme que baixou:

1. **cPanel → Backup → Baixar backup completo.** Guarde o arquivo fora do servidor.
2. **cPanel → phpMyAdmin →** selecione o banco do WordPress **→ Exportar → Rápido → SQL.**

Sem isso, um passo errado significa reconstruir o site antigo do zero.

---

## Passo 1: criar o endereço do site antigo

cPanel → **Domínios → Criar um subdomínio**

- Subdomínio: `desativado`
- Domínio: `soluterh.com.br`
- Raiz do documento: **aponte para a pasta onde o WordPress está hoje**
  (normalmente `public_html`)

O endereço fica: **`https://desativado.soluterh.com.br`**

> Se você preferir o endereço `desativadosoluterh.com.br`, ele é um domínio
> diferente e precisa ser registrado e pago à parte. O subdomínio acima não
> tem custo e cumpre a mesma função.

Depois de criar, vá em **SSL/TLS Status**, marque o subdomínio e rode
**Run AutoSSL**, senão ele abre com aviso de segurança.

---

## Passo 2: avisar o WordPress do novo endereço

Este passo é obrigatório. O WordPress guarda o próprio endereço no banco de
dados. Sem trocar, ele vai redirecionar `desativado.soluterh.com.br` de volta
para `soluterh.com.br` e você não consegue mais acessá-lo.

phpMyAdmin → banco do WordPress → tabela `wp_options` → edite duas linhas:

| option_name | valor novo |
|---|---|
| `siteurl` | `https://desativado.soluterh.com.br` |
| `home` | `https://desativado.soluterh.com.br` |

Ou, pelo Terminal do cPanel, dentro da pasta do WordPress:

```bash
wp option update siteurl "https://desativado.soluterh.com.br"
wp option update home    "https://desativado.soluterh.com.br"
```

**Confira agora:** abra `https://desativado.soluterh.com.br`. O site antigo
tem que aparecer. Só siga adiante se ele abrir.

---

## Passo 3: impedir que o site antigo apareça no Google

Se os dois ficarem indexados, eles competem entre si pelas mesmas buscas e o
Google pode preferir o antigo. É o erro mais comum nesse tipo de troca.

WordPress → **Configurações → Leitura → marque "Sugerir aos mecanismos de busca
que não indexem este site" → Salvar.**

E crie um `robots.txt` na raiz do subdomínio:

```
User-agent: *
Disallow: /
```

---

## Passo 4: separar as pastas

O site novo precisa da raiz do domínio, e o WordPress precisa continuar onde
está para o subdomínio funcionar.

1. cPanel → **Gerenciador de Arquivos**
2. Crie a pasta `site-antigo` fora de `public_html`
3. Mova **todo** o conteúdo de `public_html` para `site-antigo`
4. Volte no subdomínio criado no passo 1 e aponte a raiz dele para `site-antigo`
5. Confira de novo se `desativado.soluterh.com.br` continua abrindo

Agora `public_html` está vazia e pronta para receber o site novo.

---

## Passo 5: subir o site novo

Envie para `public_html` **o conteúdo da pasta do projeto**, não a pasta em si.

Precisa subir:

```
.htaccess          <- importante, começa com ponto e costuma ficar oculto
favicon.ico
robots.txt
sitemap.xml
site.webmanifest
todos os arquivos .html
css/
js/
fonts/
media/
data/
```

**Não precisa subir:** `_src/`, `_tools/`, `_docs/`, `assets/`, `.git/`,
`.gitignore`, `.gitattributes`.

> Atenção ao `.htaccess`: no Gerenciador de Arquivos do cPanel, ative
> **Configurações → Mostrar arquivos ocultos**, senão ele não aparece e você
> pode achar que não subiu.

---

## Passo 6: conferir

Abra e confirme cada um:

- [ ] `https://soluterh.com.br` abre o site novo
- [ ] `https://soluterh.com.br/quem-somos.html` abre
- [ ] `https://soluterh.com.br/quem-somos/` **redireciona** para a versão nova
- [ ] `https://soluterh.com.br/pcs/` cai em Plano de Cargos e Salários
- [ ] `https://soluterh.com.br/pagina-que-nao-existe` mostra o 404 do site novo
- [ ] `https://desativado.soluterh.com.br` abre o site antigo
- [ ] `https://sistema.soluterh.com.br` continua funcionando
- [ ] O blog carrega as publicações (ele busca do sistema)

Se algo ficar com a cara antiga, limpe o cache: cPanel → **LiteSpeed Web Cache
Manager → Flush All**.

---

## Passo 7: avisar o Google

1. **Search Console → Sitemaps →** envie `https://soluterh.com.br/sitemap.xml`
2. **Inspeção de URL →** teste a home e peça indexação
3. Nas semanas seguintes, acompanhe **Páginas → Não indexadas**. É normal ver
   as URLs antigas como "Página com redirecionamento": significa que o 301
   está funcionando.

---

## Sobre os redirecionamentos

O arquivo `.htaccess` já leva cada URL antiga para a correspondente nova:

| Endereço antigo | Vai para |
|---|---|
| `/quem-somos/` | `/quem-somos.html` |
| `/contato/` | `/contato.html` |
| `/blog/` e `/noticias/` | `/blog.html` |
| `/rh-estrategico/` | `/consultoria-rh-estrategico.html` |
| `/pcs/` | `/consultoria-plano-de-cargos-e-salarios.html` |
| `/nr-01/` | `/consultoria-nr-01-riscos-psicossociais.html` |
| `/academia-de-lideres/` | `/consultoria-desenvolvimento-de-lideranca.html` |
| `/avd/` | `/consultoria-avaliacao-de-desempenho.html` |
| `/pesquisa-de-clima/` | `/consultoria-pesquisa-de-clima.html` |
| `/fit-cultural/` | `/consultoria-fit-cultural-e-perfil-comportamental.html` |
| `/rs/` | `/consultoria-recrutamento-e-selecao.html` |
| `/politica-de-privacidade` | `/politica-de-privacidade.html` |
| `/2025/...` e `/2026/...` | os artigos correspondentes |

**Por que isso importa:** essas URLs já aparecem no Google e estão em links de
outros sites, no Instagram e em materiais enviados a clientes. Sem o 301, todas
viram erro 404 e o ranqueamento conquistado se perde. Com o 301, o Google
transfere esse histórico para o endereço novo.

Não apague essas linhas do `.htaccess` com o tempo. Elas custam nada e
continuam salvando quem clica em link antigo.

---

## Se algo der errado

Para voltar tudo como estava:

1. Gerenciador de Arquivos → esvazie `public_html`
2. Mova de volta o conteúdo de `site-antigo` para `public_html`
3. phpMyAdmin → devolva `siteurl` e `home` para `https://soluterh.com.br`
4. WordPress → Configurações → Leitura → desmarque o bloqueio de indexação
5. LiteSpeed Cache Manager → Flush All

O site antigo volta ao ar em poucos minutos. Por isso o backup do passo zero
não é formalidade.

---

## Recomendação de horário

Faça a troca **em um dia útil, pela manhã**, nunca numa sexta à noite. Se
aparecer algum problema, você tem o dia inteiro e o suporte da hospedagem
disponível para resolver.
