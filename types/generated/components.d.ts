import type { Schema, Struct } from '@strapi/strapi';

export interface AboutBanner extends Struct.ComponentSchema {
  collectionName: 'components_about_banners';
  info: {
    displayName: 'Banner';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface AboutContactMe extends Struct.ComponentSchema {
  collectionName: 'components_about_contact_mes';
  info: {
    displayName: 'Contact me';
  };
  attributes: {
    contact_medium: Schema.Attribute.Component<'common.button', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface AboutMyExperience extends Struct.ComponentSchema {
  collectionName: 'components_about_my_experiences';
  info: {
    displayName: 'My Experience';
  };
  attributes: {
    experience: Schema.Attribute.Component<'contact.experience', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutMySkill extends Struct.ComponentSchema {
  collectionName: 'components_about_my_skills';
  info: {
    displayName: 'My Skill';
  };
  attributes: {
    skills: Schema.Attribute.Component<'about.skill', true>;
    title: Schema.Attribute.String;
  };
}

export interface AboutSkill extends Struct.ComponentSchema {
  collectionName: 'components_about_skills';
  info: {
    displayName: 'Skill';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface CommonButton extends Struct.ComponentSchema {
  collectionName: 'components_common_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    external: Schema.Attribute.Boolean;
    icon: Schema.Attribute.String;
    name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ContactExperience extends Struct.ComponentSchema {
  collectionName: 'components_contact_experiences';
  info: {
    displayName: 'Experience';
  };
  attributes: {
    designation: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ContactFollow extends Struct.ComponentSchema {
  collectionName: 'components_contact_follows';
  info: {
    displayName: 'Follow';
  };
  attributes: {
    description: Schema.Attribute.String;
    links: Schema.Attribute.Component<'common.button', true>;
    title: Schema.Attribute.String;
  };
}

export interface HeaderLogo extends Struct.ComponentSchema {
  collectionName: 'components_header_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface HeaderMenu extends Struct.ComponentSchema {
  collectionName: 'components_header_menus';
  info: {
    displayName: 'Menu';
  };
  attributes: {
    link: Schema.Attribute.Component<'common.button', true>;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    sub_title: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ProjectsProject extends Struct.ComponentSchema {
  collectionName: 'components_projects_projects';
  info: {
    displayName: 'Project';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    is_large: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.banner': AboutBanner;
      'about.contact-me': AboutContactMe;
      'about.my-experience': AboutMyExperience;
      'about.my-skill': AboutMySkill;
      'about.skill': AboutSkill;
      'common.button': CommonButton;
      'contact.experience': ContactExperience;
      'contact.follow': ContactFollow;
      'header.logo': HeaderLogo;
      'header.menu': HeaderMenu;
      'home.hero': HomeHero;
      'projects.project': ProjectsProject;
    }
  }
}
