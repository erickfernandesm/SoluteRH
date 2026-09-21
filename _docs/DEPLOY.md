# Publicar o site novo em soluterh.com.br

Objetivo: o site novo passa a ser `soluterh.com.br`, e o WordPress atual continua
inteiro, acessível em `antigo.soluterh.com.br`. **Nada é excluído**: tudo o que
sai da raiz vai para a pasta do antigo.

Hospedagem: TurboCloud, conta `soluterh` no cPanel (IP 170.81.43.111).

---

## O que mora hoje em `public_html` e não pode ser mexido

| Item | O que é |
|---|---|
| `certificacao-remuneracao/` | WordPress próprio da Certificação em Remuneração, **no ar** |
| `curso/`, `megacomborh/` | WordPress próprios |
| `ponto.soluterh.com.br/`, `sistema.soluterh.com.br/` | atalhos para as pastas dos sistemas |
| `.well-known/` | renovação automática do certificado de segurança |
| `cgi-bin/` | pasta do servidor |
| `google*.html` (7 arquivos) | verificação do Google Search Console |
| `.user.ini`, `php.ini` | configurações do PHP (as instalações acima usam) |

O `.htaccess` do site novo foi escrito para não encostar em nenhum deles.

---

## Etapa 1: preparar, sem tirar nada do ar (15 min)

### 1.1 Backup do banco do WordPress

1. Gerenciador de Arquivos → `public_html` → botão direito em `wp-config.php` → **Exibir**.
2. Anote o valor de `DB_NAME` e o de `$table_prefix` (ex.: `wp_`).
3. Aproveite e veja se existe `define('WP_HOME'` ou `define('WP_SITEURL'`. Se existir, anote: vai precisar mudar na etapa 3.
4. **phpMyAdmin** → clique no banco anotado → **Exportar** → Rápido → SQL → **Executar**. Guarde o arquivo.

Só esse banco. Os outros bancos da conta não mudam.

### 1.2 Criar o endereço do antigo

1. cPanel → **Domínios** → **Criar um novo domínio**.
2. Domínio: `antigo.soluterh.com.br`.
3. **Desmarque** "compartilhar a raiz do documento com soluterh.com.br".
4. Raiz do documento: `antigo.soluterh.com.br` (fica em `/home/soluterh/antigo.soluterh.com.br`, **fora** do `public_html`, igual aos outros subdomínios da conta).
5. **Enviar**.

### 1.3 Certificado de segurança do antigo

cPanel → **SSL/TLS Status** → marque `antigo.soluterh.com.br` → **Run AutoSSL**.

Espere até abrir `https://antigo.soluterh.com.br` sem aviso de segurança (a página vai estar vazia, é normal). Pode levar alguns minutos.

### 1.4 Deixar o site novo esperando

1. Gerenciador de Arquivos → **Configurações** (canto superior direito) → marque **Mostrar arquivos ocultos**. Sem isso o `.htaccess` fica invisível.
2. Vá para `/home/soluterh` (a pasta acima de `public_html`) → **+ Pasta** → `site-novo`.
3. Entre em `site-novo` → **Carregar** → envie `C:\SiteSoluteRH\publicar\soluterh-site.zip`.
4. Botão direito no zip → **Extrair** → extrair ali mesmo. Depois apague o zip.
5. Confira que o `.htaccess` apareceu dentro de `site-novo`.

Até aqui, ninguém percebeu nada: o site antigo segue no ar.

---

## Etapa 2: a troca (10 min, faça sem pausa)

### 2.1 O WordPress sai da raiz

Em `public_html`, selecione **só estes itens** e use **Mover** para `/antigo.soluterh.com.br`:

**Pastas:** `wp-admin` · `wp-content` · `wp-includes` · `.wp-cli` · `css` · `js` · `fonts` · `img` · `font-awesome` · `COPYRIGHT`

**Arquivos:** todos os que começam com `wp-` · `index.php` · `xmlrpc.php` · `.htaccess` · `.htaccess.bk` · `.htaccess-bk2` · `index.html_` · `readme.html` · `license.txt` · `LICENSE.txt` · `sitemap.xml` · `error_log`

`css`, `js` e `fonts` são de um modelo antigo e precisam sair: o site novo tem pastas com esses nomes.

### 2.2 Copiar (não mover) a configuração do PHP

Selecione `.user.ini` e `php.ini` → **Copiar** para `/antigo.soluterh.com.br`. Os originais ficam em `public_html`, porque a Certificação usa.

### 2.3 Conferir o que sobrou em `public_html`

Deve restar **só** a lista da tabela do começo deste documento. Se sobrou algo que não está nela, pare e confira antes de seguir.

### 2.4 O site novo entra

Vá para `/home/soluterh/site-novo` → **Selecionar tudo** → **Mover** para `/public_html`.

Confira que o `.htaccess` do site novo está em `public_html`.

### 2.5 Limpar o cache

cPanel → **LiteSpeed Web Cache Manager** → **Flush All**.

Abra `https://soluterh.com.br`: tem que aparecer o site novo.

---

## Etapa 3: o antigo volta a funcionar no endereço novo (10 min)

### 3.1 Avisar o WordPress do endereço novo

phpMyAdmin → banco anotado → tabela `<prefixo>options` (ex.: `wp_options`) → edite as linhas:

| option_name | novo valor |
|---|---|
| `siteurl` | `https://antigo.soluterh.com.br` |
| `home` | `https://antigo.soluterh.com.br` |

Se o `wp-config.php` tinha `WP_HOME` ou `WP_SITEURL` (item 1.1), troque lá também, no arquivo que agora está em `/antigo.soluterh.com.br`.

**Teste:** `https://antigo.soluterh.com.br` deve abrir o site antigo, e `https://antigo.soluterh.com.br/wp-admin` o painel.

### 3.2 Trocar os links internos do antigo

O conteúdo do WordPress tem links gravados como `soluterh.com.br/...`. As imagens já funcionam (o site novo encaminha `/wp-content/` para o antigo), mas os menus e botões do antigo levariam para o site novo.

No painel do antigo:

1. **Elementor → Ferramentas → Substituir URL**: de `https://soluterh.com.br` para `https://antigo.soluterh.com.br` → **Substituir URL**.
2. **Elementor → Ferramentas → Regenerar CSS e dados**.
3. Opcional, para o que não é Elementor: instalar o plugin **Better Search Replace** e fazer a mesma troca em todas as tabelas, **marcando "Executar como teste" primeiro**. Tirar a opção "Substituir GUIDs".

### 3.3 Tirar o antigo do Google

Painel do antigo → **Configurações → Leitura** → marque **"Evitar que mecanismos de busca indexem este site"** → Salvar.

Sem isso, o antigo e o novo disputam as mesmas buscas.

### 3.4 Limpar o cache do antigo

Painel do antigo → **LiteSpeed Cache → Limpar tudo**.

---

## Etapa 4: conferir

| Abrir | Esperado |
|---|---|
| `soluterh.com.br` | site novo |
| `www.soluterh.com.br` | vai para `soluterh.com.br` |
| `soluterh.com.br/quem-somos/` | vai para a página nova de Quem somos |
| `soluterh.com.br/pcs/` | vai para Plano de Cargos e Salários |
| `soluterh.com.br/pagina-que-nao-existe` | página de erro do site novo |
| `soluterh.com.br/wp-admin` | vai para o painel do antigo |
| **`soluterh.com.br/certificacao-remuneracao/`** | **continua no ar, igual** |
| `ponto.soluterh.com.br` | normal |
| `curso.soluterh.com.br` | normal |
| `antigo.soluterh.com.br` | site antigo, com imagens |
| Blog do site novo | carrega as publicações do sistema |

Depois: **Search Console → Sitemaps** → enviar `https://soluterh.com.br/sitemap.xml`.

Nos dias seguintes é normal o Search Console mostrar as URLs antigas como "Página com redirecionamento": é o sinal de que está funcionando.

---

## Se algo der errado

Tudo o que saiu da raiz está em `/antigo.soluterh.com.br`, intacto. Para voltar:

1. Mova o conteúdo de `public_html` que veio do site novo para `/site-novo`.
2. Mova o conteúdo de `/antigo.soluterh.com.br` de volta para `public_html` (os `.user.ini` e `php.ini` copiados podem ficar).
3. phpMyAdmin → `siteurl` e `home` de volta para `https://soluterh.com.br`.
4. LiteSpeed → Flush All.

Em poucos minutos o site antigo volta como estava.

---

## Atualizar o site depois

1. No computador: gerar o site (`node _tools/build-site.js`) e o pacote (`node _tools/empacotar.js`).
2. Enviar `publicar/soluterh-site.zip` para `public_html` e **Extrair** por cima.
3. Apagar o zip e dar **Flush All** no LiteSpeed.

O pacote só tem arquivos do site novo, então extrair por cima não mexe em mais nada.

## Não cancelar a TurboCloud

O Sistema de Gestão foi para um VPS, mas **o site, o Ponto, a Certificação e as páginas de venda do Método RH Estratégico, do Domine a NR-01 e do I.A. com RH continuam nesta hospedagem.** Cancelar derruba tudo isso.
