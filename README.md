## Структура проекта:
app/
├── src/                 # Основная папка
│   ├── assets/          # Ассеты (в данном случае шрифты)
│   ├── components/      # Компоненты приложения
│   ├── pages/           # Компоненты страниц
│   ├── routes/          # Роуты приложения
│   ├── services/        # Сервисные компоненты
│   └── stores/          # Сторы для управления состояниями приложения
├── public/              # Содержит фавикон мешочка с деньгами
├── .gitignore           # Git ignore файл
├── package.json         # Зависимости проекта
├── vite.config.ts       # Конфиг Vite
├── Dockerfile           # Docker-конфигурация
├── docker-compose.yml   # Docker Compose конфиг
├── nginx.conf.template  # Шаблон Nginx конфига
├── entrypoint.sh        # Скрипт инициализации
└── .dockerignore        # Docker ignore файл


## Установка и запуск.

1. Запускаем билд: docker-compose build
2. Запускаем контейнер: docker-compose up
3. Приложение будет доступно по адресу: http://localhost:3000

## Важно!!!

Сервер должен быть доступен на 8080 порту
