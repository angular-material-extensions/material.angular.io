import {Injectable} from '@angular/core';

export interface DocItem {
  id: string;
  name: string;
  packageName?: string;
  examples?: string[];
}

export interface DocCategory {
  id: string;
  name: string;
  items: DocItem[];
  summary?: string;
}

const CDK = 'cdk';
const COMPONENTS = 'extensions';
export const SECTIONS = {
  [COMPONENTS]: 'Extensions',
};


const DOCS: { [key: string]: DocCategory[] } = {
  [COMPONENTS]: [
    {
      id: 'components',
      name: 'UI Components',
      items: [
        // {id: 'checkbox', name: 'Checkbox', examples: ['checkbox-configurable']},
        {id: 'password-strength', name: 'Password Strength', examples: ['checkbox-configurable']},
        {id: 'link-preview', name: 'Link Preview', examples: ['checkbox-configurable']},
        {
          id: 'google-maps-autocomplete',
          name: 'Google Maps Autocomplete',
          examples: ['checkbox-configurable']
        },
      ]
    },
    // {
    //   id: 'layout',
    //   name: 'Layout',
    //   items: [
    //     {id: 'card', name: 'Card', examples: ['card-fancy']},
    //   ]
    // },
    // {
    //   id: 'modals',
    //   name: 'Popups & Modals',
    //   items: [
    //     {id: 'bottom-sheet', name: 'Bottom Sheet', examples: ['bottom-sheet-overview']},
    //     {id: 'dialog', name: 'Dialog', examples: ['dialog-overview']},
    //   ]
    // },
  ],
  [CDK]: [],
};

for (let category of DOCS[COMPONENTS]) {
  for (let doc of category.items) {
    doc.packageName = 'material';
  }
}

for (let category of DOCS[CDK]) {
  for (let doc of category.items) {
    doc.packageName = 'cdk';
  }
}

const ALL_COMPONENTS = DOCS[COMPONENTS].reduce(
  (result, category) => result.concat(category.items), []);
const ALL_CDK = DOCS[CDK].reduce((result, cdk) => result.concat(cdk.items), []);
const ALL_DOCS = ALL_COMPONENTS.concat(ALL_CDK);
const ALL_CATEGORIES = DOCS[COMPONENTS].concat(DOCS[CDK]);

@Injectable()
export class DocumentationItems {
  getCategories(section: string): DocCategory[] {
    return DOCS[section];
  }

  getItems(section: string): DocItem[] {
    if (section === COMPONENTS) {
      return ALL_COMPONENTS;
    }
    return [];
  }

  getItemById(id: string, section: string): DocItem {
    const sectionLookup = section == 'cdk' ? 'cdk' : 'material';
    return ALL_DOCS.find(doc => doc.id === id && doc.packageName == sectionLookup);
  }

  getCategoryById(id: string): DocCategory {
    return ALL_CATEGORIES.find(c => c.id == id);
  }
}
