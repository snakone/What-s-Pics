export const LanguageOpts: SettingsOpts[] = [
  { value: 'en', label: 'english.lang' },
  { value: 'es', label: 'spanish.lang' },
];

export const TutorialOpts: SettingsOpts[] = [
  { value: true, label: 'tutorial.watch' },
  { value: false, label: 'tutorial.skip' },
];

export interface SettingsOpts {
  value: any;
  label: string;
}
