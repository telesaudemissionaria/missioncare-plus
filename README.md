# MISSIONCARE PLUS
MissionCare Plus - Assistente de Saúde para Campo Missionário
"Levando cura e esperança aos confins da Terra, em Nome de Jesus."

📖 Sobre o Projeto
MissionCare Plus é um Progressive Web App (PWA) de telessaúde, desenhado especificamente para as necessidades de missionários e agentes de saúde em áreas remotas, com foco inicial na Bolívia rural. A ferramenta foi criada para funcionar com baixa ou nenhuma conectividade, oferecendo um conjunto de recursos essenciais para triagem, consulta e apoio em campo.

Este projeto nasceu da visão da Telessaúde Missionária, com o propósito de integrar fé e medicina para servir comunidades carentes. O aplicativo é uma ferramenta prática para capacitar missionários, oferecendo informações médicas confiáveis e apoio espiritual contínuo.

✨ Funcionalidades Principais
O aplicativo é estruturado em módulos independentes e de fácil acesso, priorizando a simplicidade e a rapidez em situações de emergência.

Tela Inicial (Dashboard)

Acesso rápido a todas as funcionalidades principais através de botões de alto contraste.

Design limpo e focado na usabilidade em dispositivos móveis.

Triagem Inteligente (Anamnese Simplificada)

Módulos Adulto e Pediátrico: Formulários distintos com perguntas direcionadas para cada faixa etária.

Interface Rápida: Respostas baseadas em seleção de múltiplos toques para agilizar o preenchimento em emergências.

Análise com IA (MedGemma): Utiliza a API do Google Gemini para processar os dados da anamnese e gerar um relatório estruturado com:

Hipóteses prováveis (não diagnósticos).

Nível de urgência.

Recomendações de primeiros cuidados.

Exportação e Compartilhamento: O relatório pode ser exportado como PDF ou compartilhado diretamente via WhatsApp com a equipe de telessaúde.

Guia de Emergências Offline

Um guia de referência rápida com protocolos de primeiros socorros para as 19 emergências mais comuns em campo.

Informações claras, diretas e acessíveis sem necessidade de internet.

Assistente IA (MedGemma)

Uma interface de chat para tirar dúvidas rápidas sobre sintomas, medicamentos e primeiros socorros.

Ações Rápidas: Atalhos para análises de sintomas, informações sobre medicamentos e guias de emergência.

Tom Personalizado: A IA é instruída a responder de forma empática, profissional e cristocêntrica, usando linguagem acessível.

Guia de Medicamentos Essenciais

Lista completa de medicamentos essenciais para campo missionário, organizada por categorias.

Inclui justificativas, formulações e um aviso claro sobre a necessidade de consulta profissional para doses pediátricas.

Renovação Diária

Um espaço para apoio espiritual e emocional.

A cada acesso, a IA seleciona um versículo bíblico relacionado à saúde e esperança e gera uma imagem de paisagem tranquila para inspirar o dia do missionário.

🛠️ Tecnologias Utilizadas
O projeto foi construído com a filosofia de ser leve, rápido e acessível, utilizando tecnologias web padrão.

Frontend: HTML5, CSS3, JavaScript (Vanilla JS)

Estilização: Tailwind CSS

Inteligência Artificial: Google Gemini API (Modelo gemini-1.5-flash-latest)

Geração de PDF: jsPDF e html2canvas

Hospedagem: Projetado para ser hospedado em qualquer servidor web estático e funcionar como um PWA.

## 🌐 Idiomas

O aplicativo suporta Português e Espanhol. Use o seletor no canto superior direito da página inicial para alternar o idioma. A preferência fica salva localmente.

As traduções ficam em `lang/pt.json` e `lang/es.json`. Para adicionar novos idiomas, crie um arquivo JSON seguindo o mesmo formato e registre-o em `js/i18n.js` e no service worker para permitir uso offline.

## ♻️ Atualização do Cache do PWA

Sempre que novos arquivos HTML, CSS, JavaScript ou imagens forem adicionados ao projeto, eles devem ser incluídos em `URLS_TO_CACHE` no `service-worker.js`. Para garantir que os usuários recebam a versão mais recente desses recursos, também é necessário incrementar o valor de `CACHE_NAME`. Basta alterar o sufixo da versão (por exemplo, de `missioncare-plus-v1` para `missioncare-plus-v2`). Ao atualizar o nome do cache, o service worker removerá automaticamente o cache antigo durante a fase de ativação.

