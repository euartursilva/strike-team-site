# Strike Team — Site

Site da **Escola de Muaythai Strike Team**, em Teixeira de Freitas – BA.

## Páginas

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Página inicial: escola, aula experimental, turmas por nível, horários, conquistas, fotos, perguntas frequentes e contato com mapa |
| `fotos.html` | Álbuns de graduação (2024, 2025, 2026, por mês) e eventos, com filtro |
| `img/` | Logo, fotos e grade de horários |
| `animado/` | Mesma página inicial e de fotos com animações e interações (`fx.css` e `fx.js`) |

## Links

- Versão original: https://euartursilva.github.io/strike-team-site/
- Versão animada: https://euartursilva.github.io/strike-team-site/animado/
- Instagram: https://www.instagram.com/striketeam.teixeira/
- WhatsApp: https://wa.me/5573991831090

## Como atualizar

- **Trocar uma foto:** substitua o arquivo em `img/` mantendo o mesmo nome.
- **Novo álbum de graduação:** em `fotos.html`, copie um botão de mês (`class="chip"`) e troque o mês e o link.
- **Horários:** substitua `img/grade.png` pela grade nova.
- **Versão animada:** os arquivos em `animado/` são cópias das páginas da raiz com `fx.css` e `fx.js`. Ao mudar uma página da raiz, aplique a mesma mudança na cópia de `animado/` (lá as imagens usam `../img/`).

## Publicação

Publicado com GitHub Pages a partir da branch `main` (pasta raiz). Toda alteração enviada para `main` vai para o ar em cerca de 1 minuto.
