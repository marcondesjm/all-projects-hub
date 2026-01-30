// Configuração de versão do sistema
// Atualize este arquivo sempre que fizer uma nova release

export const APP_VERSION = {
  version: '1.2.0',
  releaseDate: '2025-01-30',
  releaseName: 'Multi-Account Management',
  changelog: [
    'Adicionado campos de configuração Supabase nas contas',
    'Melhorias no accordion do modal de cadastro',
    'Botão de ações mais visível nos cards de projeto',
  ],
} as const;

export function getFormattedVersion(): string {
  return `v${APP_VERSION.version}`;
}

export function getFormattedReleaseDate(): string {
  const date = new Date(APP_VERSION.releaseDate);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
