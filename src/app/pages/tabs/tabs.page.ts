import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {
  tabs: Tab[] = [
    { tab: 'home', icon: 'home', label: 'tab.home' },
    { tab: 'add', icon: 'add-circle-outline', label: 'tab.add' },
    { tab: 'profile', icon: 'person', label: 'tab.profile' },
    { tab: 'help', icon: 'help', label: 'tab.help' }
  ];
}

interface Tab {
  tab: string;
  icon: string;
  label: string;
}
