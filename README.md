<!-- /* cSpell:disable */
/* spell-checker: disable */
/* spellchecker: disable */ -->
<h1 align="center">Task-Manager</h1>

## О проекте

Менеджер задач для создания проектов и добавления задач, а также возможность работы с сотрудниками.

## Технологии

В данном проекте использовались следующие технологии:

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [Prisma](https://www.prisma.io)
- [Docker](https://www.docker.com)
- [TypeScript](https://www.typescriptlang.org)
- [Eslint](https://eslint.org)

## Как использовать

Сначала необходимо выполнить начальную установку

```bash
# Скопировать репозиторий
$ git clone https://github.com/Rieldteh/task-manager

# Перейти в созданную директорию
$ cd task-manager
```
### Установка через npm
```bash
# Установка проекта:
# Установить зависимости
$ npm install
```

### Установка через Docker
```bash
# Установка для Docker:
# Установка Docker образа и контейнеров
$ docker-compose up
```

### Документация Swagger
Swagger документация находится по адресу <http://localhost:5000/api-docs/>

### Вход на сервер pgAdmin
Вход на сервер pgAdmin осуществляется только при запуске docker контейнера
pgAdmin находится на сервере <http://localhost:5050/>
Необходимо создать сервер со следующими параметрами:

| Параметр              | Значение    |
|-----------------------|-------------|
| Host name/address     | postgres    |
| Port                  | 5432        |
| Maintenance database  | postgres    |
| Username              | postgres    |
| Password              | qwerty1234  |

Используемая БД: Test

## Используемые end-point's
В приложении используются следующие end point's

#### Авторизация

| Метод запроса | End-point       | Значение                       |
|---------------|-----------------|--------------------------------|
| POST          | /register       | Регистрация пользователя       |
| POST          | /authentificate | Аутентификация пользователя    |
| POST          | /logout         | Выход пользователя из системы  |

#### Пользователи

| Метод запроса | End-point       | Значение                            |
|---------------|-----------------|-------------------------------------|
| GET           | /users          | Просмотреть всех пользователей      |
| GET           | /users/:id      | Посмотреть конкретного пользователя |
| DELETE        | /users/:id      | Удалить пользователя                |

#### Проект

| Метод запроса | End-point               | Значение                                 |
|---------------|-------------------------|------------------------------------------|
| GET           | /projects               | Просмотреть все проекты                  |
| POST          | /projects               | Создать проект                           |
| GET           | /projects/:id           | Просмотреть конкретный проект            |
| PUT           | /projects/:id           | Отредактировать конкретный проект        |
| DELETE        | /projects/:id           | Удалить конкретный проект                |
| GET           | /projects/:id/users     | Посмотреть всех пользователей проекта    |
| POST          | /projects/:id/users/:id | Добавить пользователя в проект           |
| DELETE        | /projects/:id/users/:id | Удалить пользователя из проекта          |

#### Задачи

| Метод запроса | End-point                                        | Значение                                       |
|---------------|--------------------------------------------------|------------------------------------------------|
| GET           | /projects/:projectId/tasks                       | Просмотреть все задачи проекта                 |
| POST          | /projects/:projectId/tasks                       | Добавить задачу в проект                       |
| DELETE        | /projects/:projectId/tasks/:taskId               | Удалить задачу из проекта                      |
| GET           | /projects/:projectId/tasks/:taskId               | Просмотреть информацию о конкретной задаче     |
| PUT           | /projects/:projectId/tasks/:taskId               | Отредактировать конкретную задачу              |
| GET           | /projects/:projectId/tasks/:taskId/assignees     | Просмотреть ответственных за задачу            |
| POST          | /projects/:projectId/tasks/:taskId/assignees/:id | Добавить ответственного за задачу              |
| DELETE        | /projects/:projectId/tasks/:taskId/assignees/:id | Удалить ответственного за задачу               |

---
