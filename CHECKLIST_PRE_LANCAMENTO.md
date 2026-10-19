# Checklist Pré-Lançamento — Website & Presença Digital
### Padrão de Engenharia, Identidade e Qualidade Bruto

Este documento estabelece o protocolo de auditoria e validação obrigatória antes da publicação em domínio definitivo e divulgação ao público ou anfitriões. Abrange dimensões técnicas de rastreamento por robôs (*search engine bots*), geolocalização e SEO local (*GEO*), acessibilidade universal (*WCAG 2.1 AA/AAA*), performance de carregamento (*Core Web Vitals*), funil de reserva e conformidade regulamentar em Portugal.

---

## 1. Identidade de Marca, Redação & Experiência do Utilizador (UX/UI)

O tom de comunicação para alojamentos rurais geridos pelo proprietário deve refletir calor humano, autenticidade e hospitalidade, expurgando jargão imobiliário e fórmulas impessoais.

- [ ] **Nomenclatura Oficial**: A marca institucional de engenharia/design é referida estritamente como **Bruto** (proibição de termos como "Bruto AI").
- [ ] **Proibição Absoluta de Emojis**: Inexistência total de emojis no código HTML, folhas de estilo CSS, scripts JavaScript, atributos `alt`/`aria` e textos de utilizador. Ícones são vetoriais SVG monocromáticos com traço fino (`stroke-width: 1.5` a `2`).
- [ ] **Identidade Limpa no Cabeçalho**: Apenas o logótipo oficial e a denominação limpa do alojamento, com ancoragem geográfica discreta por baixo (Vila e Distrito, ex.: *Paços da Serra, Gouveia*). Ausência de códigos burocráticos de AL no topo.
- [ ] **Botão CTA Condicionado ao Scroll com Posição Fixa de Links**: O botão de reserva do cabeçalho surge apenas quando o ecrã inicial ultrapassa a barra de reserva do Hero. Mantém-se oculto inicialmente via `opacity: 0; visibility: hidden; pointer-events: none;`, conservando o seu espaço no layout para que os links de navegação permaneçam milimetricamente imóveis.
- [ ] **Títulos de Secção em Linha Única (SEO)**: Todos os títulos principais de secção (`h2`) são concisos, focados em termos de pesquisa e ocupam estritamente uma linha contínua em ecrãs desktop.
- [ ] **Eliminação de Redundâncias Textuais entre Páginas**: Conteúdos descritivos de páginas interiores (Alojamentos, Serra, FAQs, Reservas) têm funções próprias no funil e não repetem parágrafos ou frases poéticas da página inicial.
- [ ] **Alternância e Pureza dos Fundos**: Transição limpa e equilibrada entre fundos das secções com base na paleta cromática oficial, sem sobreposição excessiva de elementos gráficos que prejudique o conforto de leitura.
- [ ] **Remoção Coordenada das Notas de Transparência**: Validação de que todas as notas demonstrativas do protótipo (`.transparency-note-bar`, `.prototype-transparency-note`) foram removidas em bloco no momento da transição para produção.

---

## 2. SEO Técnico & Rastreamento de Motores de Busca (Bots & Crawlers)

Garantia de que os rastreadores do Google (*Googlebot*), Bing (*Bingbot*), redes sociais e assistentes de inteligência artificial indexam as páginas com máxima relevância e fidelidade.

- [ ] **Meta Tag Canónica (`canonical`)**: Cada página contém a sua URL absoluta canónica correta no `<head>` (ex.: `<link rel="canonical" href="https://casagrande.pt/alojamentos.html">`), prevenindo problemas de conteúdo duplicado.
- [ ] **Tags de Título (`<title>`) Exclusivas**: Cada página possui um título único entre 50 e 60 caracteres, estruturado com palavras-chave primárias e localização (ex.: *Alojamentos & Casas de Campo | Casa Grande — Serra da Estrela*).
- [ ] **Meta Descriptions Persuasivas**: Descrições de 145 a 155 caracteres em cada página, incluindo proposta de valor única, contexto geográfico e apelo à ação sem truncagem em ecrãs móveis.
- [ ] **Hierarquia Semântica de Cabeçalhos**:
  - Exatamente um único `h1` por página com a palavra-chave central.
  - Subdivisões lógicas sequenciais em `h2` e `h3`, sem saltar níveis (ex.: de `h1` para `h3`).
- [ ] **Ficheiro `robots.txt` Otimizado**:
  - Permite explicitamente o rastreio das páginas públicas, imagens e recursos estáticos (CSS/JS necessários à renderização moderna do Googlebot).
  - Bloqueia pastas de administração ou utilitários internos (se aplicável).
  - Inclui a diretiva com o endereço absoluto do sitemap: `Sitemap: https://casagrande.pt/sitemap.xml`.
- [ ] **Sitemap XML Canónico (`sitemap.xml`)**:
  - Ficheiro XML válido listando todas as páginas públicas ativas.
  - Atributos `<lastmod>` atualizados com carimbo ISO 8601 e `<changefreq>` condizente com a frequência de atualização.
- [ ] **Protocolo Open Graph & Twitter Cards**:
  - Tags `og:title`, `og:description`, `og:url`, `og:site_name` e `og:locale` (`pt_PT`).
  - Imagem Open Graph de alta definição (`og:image`) dimensionada a 1200x630 pixels com peso inferior a 300 KB, garantindo partilhas elegantes no WhatsApp, Facebook, LinkedIn e iMessage.
  - Tags correspondentes `twitter:card` (`summary_large_image`).
- [ ] **Tratamento de Páginas de Erro (HTTP 404)**: Página 404 personalizada mantendo a identidade visual, com links diretos para a Homepage, Alojamentos e Contacto, respondendo com o código HTTP 404 real aos motores de busca.
- [ ] **Segurança HTTPS & Redirecionamentos**:
  - Redirecionamento 301 forçado de `http://` para `https://`.
  - Redirecionamento consistente de domínio com ou sem `www` (escolher versão canónica).
  - Cabeçalhos de segurança configurados: HSTS (*HTTP Strict Transport Security*), X-Content-Type-Options e Referrer-Policy.
- [ ] **Favicons Multi-Plataforma**: Conjunto completo de ícones em alta resolução (`favicon.svg`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png` a 180x180 e `favicon.ico` legado na raiz).

---

## 3. GEO & SEO Local (Georreferenciação, Mapas e Presença Territorial)

Otimização orientada a buscas contextuais territoriais (*"onde ficar na Serra da Estrela"*, *"turismo de habitação em Gouveia"*), assistentes virtuais e geolocalização exata.

- [ ] **Dados Estruturados Schema.org (JSON-LD)**:
  - Marcação de entidade canónica do tipo `LodgingBusiness`, `BedAndBreakfast` ou `Hotel`.
  - Coordenadas geográficas exatas (`geo: { latitude: 40.459570, longitude: -7.649389 }`).
  - Morada física detalhada com código postal e localidade Beirã.
  - Intervalo de preços oficial (`priceRange: "85€ - 195€"`).
  - Avaliações consolidadas com `aggregateRating` fundamentado nas plataformas oficiais.
- [ ] **Consistência NAP (Name, Address, Phone)**:
  - O Nome Oficial, Morada Postal e Telefones de contacto coincidem com rigor absoluto em todas as páginas do website, rodapé e perfis externos (Google Perfil da Empresa, Booking, Airbnb, Turismo de Portugal).
- [ ] **Metadados Geográficos na Raiz**:
  - `<meta name="geo.region" content="PT-09">` (ou código de distrito respetivo).
  - `<meta name="geo.placename" content="Paços da Serra, Gouveia">`.
  - `<meta name="geo.position" content="40.459570;-7.649389">`.
  - `<meta name="ICBM" content="40.459570, -7.649389">`.
- [ ] **Linhas de Distâncias e Tempos Reais de Deslocação**:
  - Tempos de condução reais e distâncias quilométricas calculadas a partir da propriedade para as capitais e nós de acesso (ex.: *Gouveia 8 km / 10 min • Seia 8 km / 10 min • Coimbra 75 km • Porto 170 km • Lisboa 290 km*).
  - Apresentação em linha única horizontal sem quebras artificiais.
- [ ] **Integração Interativa de Mapas**:
  - Iframe do Google Maps incorporado com `loading="lazy"` e parâmetros de acessibilidade (`title="Localização da Casa Grande em Paços da Serra"`).
  - Botão de ação complementar direto para abertura imediata no Google Maps / Waze do dispositivo do visitante.
- [ ] **Alinhamento com Perfis Externos de Mapas**:
  - Google Perfil da Empresa verificado e com categorias corretas (*Alojamento de Turismo Rural / Casa de Campo*).
  - Presença em Apple Maps (Apple Business Connect) e Bing Places for Business.

---

## 4. Acessibilidade Universal & Inclusão (WCAG 2.1 Nível AA / AAA)

Assegura que pessoas com deficiência visual, auditiva, motora ou cognitiva conseguem navegar, compreender e reservar com total autonomia, cumprindo os padrões internacionais W3C.

- [ ] **Rácios de Contraste Cromático**:
  - Contraste mínimo de 4.5:1 para texto normal e 3:1 para texto grande em relação à cor de fundo, mesmo nos tons da paleta de outono/inverno (dourados, sépias e cinzas térmicos).
  - Ícones interativos e botões possuem contraste mensurável mínimo de 3:1 face ao fundo circundante.
- [ ] **Navegação Integral por Teclado**:
  - Toda a página é navegável via tecla `Tab` e `Shift+Tab` em ordem visual coerente.
  - Indicador de foco visual (`:focus-visible`) nítido e proeminente em todos os botões, links e campos de formulário, sem ser removido por `outline: none`.
  - Menus deslizantes (*nav drawer*) e janelas de ampliação (*lightbox*) fecham com a tecla `Escape`.
- [ ] **Textos Alternativos (`alt`) em Fotografias**:
  - Imagens de conteúdo informativo (quartos, lareiras, exterior) possuem atributos `alt` descritivos da cena sem repetição mecânica.
  - Imagens meramente decorativas possuem `alt=""` ou atributo `aria-hidden="true"`, impedindo ruído nos leitores de ecrã.
- [ ] **Semântica ARIA e Estados Dinâmicos**:
  - Acordeões de FAQs dotados de `aria-expanded="false|true"` e `aria-controls`.
  - Botões de menu com `aria-haspopup="true"` e rótulo claro (`aria-label="Abrir Menu de Navegação"`).
  - Janelas modais (*lightbox*, comprovativo de reserva) dotadas de `role="dialog"`, `aria-modal="true"` e rótulo descritivo.
- [ ] **Dimensionamento de Alvos Táteis (*Touch Targets*)**:
  - Todos os botões, ícones clicáveis e controlos de rotação de fotos possuem área de toque mínima de **44 × 44 pixels**, prevenindo toques acidentais em smartphones.
- [ ] **Legibilidade e Tipografia**:
  - Tamanho base de fonte de pelo menos 16px no corpo de texto.
  - Altura de linha (*line-height*) entre 1.5 e 1.8 para leitura confortável de parágrafos longos.
  - Largura máxima de blocos de leitura contínua fixada entre 65 e 80 caracteres por linha.
- [ ] **Independência de Cor**: Nenhuma informação essencial ou estado de erro (ex.: campo inválido no formulário) é transmitido exclusivamente através da cor; são utilizados ícones, texto explicativo e bordas reforçadas.
- [ ] **Respeito por Preferências de Movimento**: Utilização de `@media (prefers-reduced-motion: reduce)` para desativar transições longas, paralaxe e rotações contínuas para utilizadores com sensibilidade vestibular.

---

## 5. Performance, Core Web Vitals & Otimização de Recursos

Validação de tempos de carregamento instantâneos mesmo sob ligações móveis 3G/4G na montanha, cumprindo os limites do Google PageSpeed.

- [ ] **LCP (*Largest Contentful Paint*) < 2.5s**:
  - A fotografia principal do Hero é pré-carregada no `<head>` via `<link rel="preload" as="image" href="..." fetchpriority="high">`.
  - Servida em formato otimizado com dimensões balanceadas para ecrãs móveis e computadores.
- [ ] **INP (*Interaction to Next Paint*) < 200ms**:
  - Ausência de bloqueios prolongados da thread principal do browser.
  - JavaScript puro (*vanilla*), sem bibliotecas pesadas desnecessárias (jQuery, React, Vue para conteúdo predominantemente estático).
  - Execução de animações de scroll apoiadas em `requestAnimationFrame` ou `IntersectionObserver`.
- [ ] **CLS (*Cumulative Layout Shift*) < 0.1**:
  - Todas as tags `<img>` e `<iframe>` dispõem de atributos de largura e altura explícitos (`width` e `height`) ou de regras de CSS `aspect-ratio`, evitando saltos súbitos de texto durante o carregamento das fotos.
- [ ] **Carregamento Diferido de Ativos (*Lazy Loading*)**:
  - Todas as imagens abaixo da dobra (*below the fold*) contêm `loading="lazy"` e `decoding="async"`.
  - O iframe do mapa do rodapé é descarregado apenas quando o utilizador se aproxima do final da página.
- [ ] **Otimização de Tipografias Web**:
  - Utilização de `font-display: swap` nas fontes Google Fonts (*Cormorant Garamond* e *Plus Jakarta Sans*).
  - Pré-ligação aos servidores de fontes através de `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`.

---

## 6. Funcionalidades Críticas, Formulários & Conversão de Reservas

Validação exaustiva do funil de conversão para assegurar que nenhum contacto ou reserva de hóspede se perde por falha técnica.

- [ ] **Secção de Dúvidas / FAQs com Cartão Sticky**:
  - Estrutura obrigatória em 2 colunas: Acordeão de perguntas à esquerda e Cartão de Contacto Direto com a anfitriã à direita.
  - O cartão de contacto mantém-se fixo com `position: sticky; top: 96px;` ao longo da leitura das respostas.
- [ ] **Formulário de Contacto Direto**:
  - Validação estrita de e-mail e telemóvel no cliente e servidor.
  - Mensagem de sucesso amigável e calorosa após o envio.
  - Proteção invisível contra robôs de spam (ex.: *honeypot field* ou Cloudflare Turnstile).
- [ ] **Motor de Seleção de Alojamento**:
  - Dropdown com todas as 9 tipologias, apresentando o nome limpo e capacidade.
  - Rotação fluida de fotografias nas habitações por botões de avançar/recuar e gestos de deslize (*swipe*).
- [ ] **Calendário e Regras de Estadia**:
  - Seletor de datas intuitivo com bloqueio de datas passadas.
  - Cumprimento automático do número mínimo de noites (2 noites época normal, 3 noites em épocas festivas).
  - Distinção transparente entre preços normais e tarifas de épocas festivas (Natal, Passagem de Ano, Carnaval e Páscoa).
  - Cálculo correto de suplementos por hóspede adicional (ex.: 20€/noite nas habitações aplicáveis).
- [ ] **Bloco de Faturação Opcional com NIF**:
  - Checkbox *"Desejo fatura com contribuinte (NIF)"*.
  - Expansão suave de campos: NIF/NIPC, Nome Fiscal, Morada de Faturação, Código Postal, Localidade e País.
  - Pré-preenchimento automático do Nome Fiscal caso o titular já tenha preenchido o seu nome.
- [ ] **Simulador de Pagamentos Online Seguros**:
  - Seleção funcional entre Cartão de Crédito/Débito, MB WAY e Referência Multibanco.
  - Resumo lateral fixo (*sticky*) refletindo o método e o valor total em tempo real.
  - Modal de confirmação estruturado com comprovativo, dados da reserva e botão direto de WhatsApp para a anfitriã.
- [ ] **Canais de Contacto Direto Funcionais**:
  - Ligações telefónicas formatadas com protocolo internacional (`tel:+351...`) para clique imediato em smartphones.
  - Endereços de e-mail com protocolo `mailto:`.
  - Botão de WhatsApp direcionando para conversa com mensagem inicial pré-formatada.

---

## 7. Compatibilidade Multi-Dispositivo & Multi-Navegador

- [ ] **Navegadores Principais**:
  - Google Chrome (Desktop & Android).
  - Apple Safari (macOS & iOS / iPadOS).
  - Mozilla Firefox.
  - Microsoft Edge.
  - Samsung Internet Browser.
- [ ] **Testes de Resolução e Viewports**:
  - Smartphone pequeno (375px a 390px — iPhone SE / mini / 13).
  - Smartphone padrão (412px a 430px — Galaxy S24, iPhone 15 Pro Max).
  - Tablet em orientação vertical e horizontal (768px a 1024px — iPad Air / Pro).
  - Ecrãs de computador portátil (1366 × 768 e 1440 × 900).
  - Monitores panorâmicos e 4K (1920 × 1080 e superiores).
- [ ] **Modo Escuro / Modo Privado**: O layout preserva o contraste térmico e a legibilidade em sessões de navegação privada ou browsers configurados para forçar modo escuro.

---

## 8. Conformidade Legal, Privacidade e Normas Nacionais (Portugal)

- [ ] **Registo Nacional de Alojamento Local / Turismo**: Inclusão discreta no rodapé do número de registo oficial (RNT / AL) da propriedade.
- [ ] **Ligação Oficial ao Livro de Reclamações Eletrónico**: Presença obrigatória no rodapé da ligação para o portal oficial (`https://www.livroreclamacoes.pt`).
- [ ] **Política de Privacidade e Termos de Estadia**:
  - Página ou secção identificando o responsável pelo tratamento de dados pessoais.
  - Finalidade estrita do tratamento dos dados para gestão de estadias e faturação.
  - Menção aos direitos de acesso, retificação e eliminação segundo o RGPD (*Regulamento Geral sobre a Proteção de Dados*).
- [ ] **Aviso e Gestão de Cookies**:
  - Caso sejam utilizados cookies analíticos (Google Analytics) ou de terceiros, implementação de banner prévio com consentimento granular antes da ativação dos scripts.
  - Se o website utilizar estritamente cookies técnicos e de sessão, menção informativa transparente.

---

## Tabela de Resumo de Aprovação Final Pré-Lançamento

| Dimensão de Auditoria | Estado de Validação | Auditor Responsável | Data |
| :--- | :---: | :--- | :---: |
| 1. Identidade & UX Bruto | `[ ] Aprovado` | | |
| 2. SEO Técnico & Rastreio | `[ ] Aprovado` | | |
| 3. GEO & Presença Territorial | `[ ] Aprovado` | | |
| 4. Acessibilidade (WCAG 2.1) | `[ ] Aprovado` | | |
| 5. Core Web Vitals & Velocidade | `[ ] Aprovado` | | |
| 6. Formulários & Reservas | `[ ] Aprovado` | | |
| 7. Compatibilidade Multi-Dispositivo | `[ ] Aprovado` | | |
| 8. Enquadramento Legal (PT / RGPD) | `[ ] Aprovado` | | |

> **Critério de Lançamento**: A ativação pública do domínio só é autorizada quando todas as 8 dimensões se encontrarem rubricadas como **Aprovado**, sem registo de anomalias críticas impeditivas de leitura, navegação ou reserva.
