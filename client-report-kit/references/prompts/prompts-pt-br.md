# Prompts de narrativa com IA — Português do Brasil (12 prompts)

> Cole primeiro o BLOCO DE REGRAS (de `00-how-to-use.md`) e substitua cada `[COLE: …]`
> pelos seus dados reais. A saída é um rascunho: revise sempre antes de enviar ao cliente.

```
Você escreve para um relatório mensal de cliente. Regras inegociáveis:
1. Use APENAS os números que eu fornecer. Não invente, estime ou extrapole. Se faltar
   um dado, escreva [FALTA DADO: qual] em vez de supor.
2. Linguagem clara para dono de negócio, sem jargão sem explicação.
3. Tom profissional, calmo e específico. Sem exageros.
4. Voz ativa. Cite a página, a consulta, o canal ou a campanha específicos.
5. Separe observação de hipótese: hipóteses começam com "acreditamos" ou "provavelmente".
6. Variações com sinal (+12,4% / -3,1%), um decimal. Posição média: menor é melhor.
7. Respeite o tamanho exato que eu pedir.
```

**1 — Resumo executivo.** `[COLE: tabela de KPIs do mês vs mês anterior + trabalho entregue]`

```
Redija o resumo executivo do relatório mensal. Cliente: [NOME], [SETOR]. Mês: [MÊS AAAA].
[COLE: tabela de KPIs] Trabalho entregue: [COLE: 1–3 itens]
Escreva 3–4 frases: (1) o número que define o mês, com a variação exata; (2) o principal fator,
ligado a uma página/consulta/campanha específica; (3) o contraponto honesto (o que foi pior ou
ficou plano); (4) o que isso prepara para o mês seguinte, sem promessas. Feche com 3 marcadores:
os três números que o cliente deve lembrar.
```

**2 — Movimento mês a mês.** `[COLE: sessões por canal + top 5 landing pages]`

```
Explique o movimento de tráfego mês a mês. [COLE: dados]
Escreva 4–6 frases: qual canal explica a maior parte da mudança (calcule a proporção com meus
dados), quais páginas são responsáveis (pelo nome), distinga o sazonal do novo e, se algo caiu,
diga para onde foram essas sessões. Não invente causas: se meus dados não mostrarem o porquê,
escreva "estamos investigando".
```

**3 — Explicando uma queda de tráfego.** `[COLE: sessões por semana/dia dos dois meses, canais, mudanças conhecidas]`

```
O tráfego do cliente caiu. Redija a explicação. Cliente: [NOME]. Queda: [ex. -18,4%].
[COLE: dados]
Escreva 4–6 frases: (1) diga a queda com clareza e o número exato; (2) isole QUANDO aconteceu e
se foi súbita ou gradual; (3) com meus dados, separe as três causas possíveis —mudança de
medição, mudança no site, demanda/sazonalidade— e diga qual a evidência sustenta; (4) termine
com o passo de diagnóstico já em andamento. Tom: calmo e no controle.
```

**4 — Explicando um pico de tráfego.** `[COLE: sessões por semana/dia, páginas top, canais]`

```
Houve um pico de tráfego. Redija a explicação sem se creditar demais. [COLE: dados]
Escreva 4–6 frases: quantifique o pico (variação exata + quando), atribua com precisão (páginas,
canal, consulta se visível), separe causas pontuais (menção viral, imprensa, sazonalidade) de
repetíveis (novos rankings, campanha) e feche dizendo como testaremos se se mantém.
Não alegre causas que meus dados não comprovem.
```

**5 — Narrativa de desempenho na busca.** `[COLE: cliques, impressões, CTR, posição média (dois meses), top 5 consultas, top 5 páginas]`

```
Redija a interpretação da página do Search Console. Não repita a tabela: interprete.
[COLE: dados]
Responda em 4–6 frases: (1) os cliques subiram por mais impressões (mais demanda coberta) ou
por melhor CTR (nossos títulos vencendo)? Explique o cálculo em palavras simples; (2) qual
consulta ou página explica a maior parte da mudança; (3) o que a posição média fez e o que isso
significa na prática (lembre: menor é melhor); (4) um olhar para o futuro ligado às consultas da
página 2, se eu as tiver fornecido.
```

**6 — Oportunidades de palavras-chave.** `[COLE: 5–10 consultas em posições 11–20 com impressões e página]`

```
Redija um breve relatório de "ganhos rápidos" a partir da página 2. [COLE: dados]
Para cada consulta (máx. 5), 2 frases: por que é ganhável (posição atual + impressões) e a
melhoria específica que faríamos (adicionar FAQ, melhorar o título para o CTR, links internos
desde [página relacionada], expandir a seção que responde à intenção). Feche: são hipóteses;
posições costumam mudar em semanas, não em dias. Ordene por impressões.
```

**7 — História das conversões.** `[COLE: tabela de eventos-chave, conversões por canal, taxa de conversão dos dois meses]`

```
Redija a história das conversões. Cliente: [NOME], [TIPO DE NEGÓCIO]. [COLE: dados]
Escreva 5–7 frases: (1) manchete com o total de conversões e a variação exata, e se a taxa veio
junto (mais tráfego ou tráfego melhor?); (2) qual tipo de conversão impulsionou e em quais
páginas; (3) o canal mais forte e o mais fraco por taxa de conversão, nomeados sem rodeios;
(4) uma frase de ponte para o plano do mês seguinte. Se as conversões caíram: diga na primeira
frase, dê a causa mais provável apoiada em dados e a contramedida já planejada. Sem maquiagem.
```

**8 — Recomendações para o mês seguinte.** `[COLE: KPIs, consultas da página 2, notas de conversão, recursos disponíveis]`

```
Proponha o plano do mês seguinte (3–5 itens, não mais) para [CLIENTE]. Restrições:
[ex. ~20 horas, sem desenvolvimento]. [COLE: dados]
Para cada item, exatamente: AÇÃO (uma entrega concreta), PORQUE (o dado que ela ataca),
ESPERO (faixa honesta + premissa da qual depende), PRIMEIRO PASSO (o que acontece no dia 1).
Ordene por impacto esperado. Corte tudo o que não citar um dado do meu texto.
```

**9 — Reescrita em linguagem simples.** `[COLE: o parágrafo técnico demais]`

```
Reescreva este parágrafo para um dono de negócio sem formação em marketing. Mantenha cada número
exatamente igual, mesmos fatos e ordem. Troque o jargão por palavras simples (uma explicação
curta por termo, no máximo). Frases com menos de 22 palavras em média. Não acrescente novas
afirmações. [COLE: parágrafo]
```

**10 — Conquistas e pontos de atenção.** `[COLE: KPIs + 3–5 movimentos notáveis de páginas/consultas]`

```
Escreva (a) três conquistas e (b) três pontos de atenção para o resumo executivo. [COLE: dados]
Conquistas: resultado quantificado + uma frase sobre o porquê, apenas o que meus dados mostram.
Atenção: o risco com seu número + a ação já em andamento (nunca uma preocupação sem plano).
Máx. 20 palavras por item.
```

**11 — Preparando a reunião com o cliente.** `[COLE: o relatório completo ou suas tabelas + dúvidas pendentes]`

```
Prepare-me para a chamada mensal com [CLIENTE]. [COLE: dados]
Devolva: (1) as 3 perguntas que ele provavelmente fará, redigidas como um leigo as diria;
(2) resposta de 2 frases para cada, baseada apenas nos meus dados; (3) o ponto fraco do mês que
ele pode atacar e o enquadramento honesto (assumir + mostrar o plano); (4) uma pergunta que EU
devo fazer a ele para entender contexto de negócio que os dados não mostram.
```

**12 — E-mail de entrega.** `[COLE: as 3 conquistas + nome do relatório + foco do mês seguinte]`

```
Escreva o e-mail de entrega do relatório mensal. Destinatário: [NOME], [CARGO]. De: [SEU NOME].
1) Assunto: o número mais importante do mês (nunca "Seu relatório mensal"). 2) Saudação + uma
linha com o resultado principal. 3) Dois marcadores com as conquistas que mais lhe interessam.
4) Uma linha: relatório anexo, "leitura de três minutos". 5) Uma linha: o foco do mês que vem.
6) Despedida oferecendo 15 minutos de chamada. Menos de 120 palavras. Sem emojis nem exclamações.
```
