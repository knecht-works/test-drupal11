<div align="center">

  <img src="https://knecht.works/styleguide/favicon/favicon.svg" alt="Knecht" width="112" height="112">

# test-drupal11

<p>
  <img src="https://img.shields.io/badge/Drupal-11.x-0678BE?logo=drupal&logoColor=white" alt="Drupal 11.x">
  <img src="https://img.shields.io/badge/PHP-8.4-777BB4?logo=php&logoColor=white" alt="PHP 8.4">
  <img src="https://img.shields.io/badge/DDEV-nginx--fpm-02A8E2?logo=docker&logoColor=white" alt="DDEV · nginx-fpm">
  <img src="https://img.shields.io/badge/Knecht-e2e%20fixture-b7f8a2?labelColor=09090b" alt="Knecht e2e fixture">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License">
</p>

</div>

A [DDEV](https://ddev.com)-based Drupal 11 project used as an end-to-end test fixture for [Knecht](https://knecht.works). It runs the `standard` install profile against the DDEV MySQL database with a tiny custom theme (`web/themes/custom/knecht`) that renders a demo front page built with the Knecht Styleguide Kit, so Knecht can boot the environment, hit the site, and assert against real CMS behavior (rendered pages, the database-backed admin login, Drush). Front-end assets (`src/`) are bundled with [Vite](https://vitejs.dev) via the [drupal/vite](https://www.drupal.org/project/vite) module: the "Vite bundle" row on the front page flips from "not loaded" to "loaded" once the built script runs.

## Setup

Requires [DDEV](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/) and a Docker provider (Docker, OrbStack, or Colima).

```bash
ddev start                              # boot the containers
ddev composer install                   # install Drupal core, Drush and contrib
ddev import-db --file=seed/db.sql.gz    # load the pre-installed demo database
ddev drush cr                           # rebuild caches
ddev npm install
ddev npm run build                        # build src/ into web/dist, or `ddev npm run dev` for the Vite dev server
```

The seed dump in `seed/db.sql.gz` is a plain `standard` profile install with the `knecht` theme set as default and no uploaded files, so nothing outside the repo is needed. To recreate it from scratch instead of importing:

```bash
ddev drush site:install standard --account-name=admin --account-pass=admin123 --site-name=test-drupal11 -y
ddev drush theme:install knecht -y && ddev drush config:set system.theme default knecht -y
ddev drush pm:uninstall page_cache dynamic_page_cache -y   # keep the demo page dynamic per request
ddev export-db --file=seed/db.sql.gz    # refresh the seed
```

Admin login: user `admin`, password `admin123`.

## URLs

`ddev launch` opens the site in your browser.

| Role        | URL                                         |
| ----------- | ------------------------------------------- |
| Site        | `https://test-drupal11.ddev.site`           |
| Admin login | `https://test-drupal11.ddev.site/user/login` |
