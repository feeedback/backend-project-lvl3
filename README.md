### Hexlet tests and linter status:

[![Actions Status](https://github.com/feeedback/backend-project-lvl3/workflows/hexlet-check/badge.svg)](https://github.com/feeedback/backend-project-lvl3/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/cc6bdd238a77ec92e0bc/maintainability)](https://codeclimate.com/github/feeedback/backend-project-lvl3/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cc6bdd238a77ec92e0bc/test_coverage)](https://codeclimate.com/github/feeedback/backend-project-lvl3/test_coverage)
[![wakatime](https://wakatime.com/badge/github/feeedback/backend-project-lvl3.svg)](https://wakatime.com/badge/github/feeedback/backend-project-lvl3)
[![Actions Status](https://github.com/feeedback/backend-project-lvl3/workflows/hexlet-check/badge.svg)](https://github.com/feeedback/backend-project-lvl3/actions)

Реализация учебного проекта Hexlet Node.js №3 https://ru.hexlet.io/programs/backend/projects/4

**Загрузчик страниц**

PageLoader – утилита командной строки, которая скачивает страницы из интернета и сохраняет их на компьютере. Вместе со страницей она скачивает все ресурсы (картинки, стили и js) давая возможность открывать страницу без интернета. Утилита скачивает ресурсы параллельно и показывает прогресс по каждому ресурсу в терминале

_Пример использования:_

```bash
$ page-loader --output /var/tmp https://ru.hexlet.io/courses

✔ https://ru.hexlet.io/lessons.rss
✔ https://ru.hexlet.io/assets/application.css
✔ https://ru.hexlet.io/assets/favicon.ico
✔ https://ru.hexlet.io/assets/favicon-196x196.png
✔ https://ru.hexlet.io/assets/favicon-96x96.png
✔ https://ru.hexlet.io/assets/favicon-32x32.png
✔ https://ru.hexlet.io/assets/favicon-16x16.png
✔ https://ru.hexlet.io/assets/favicon-128.png

Page was downloaded as 'ru-hexlet-io-courses.html'
```
