# Проект по разработке сайта интернет-магазина для компании Express Market

[![Figma - Экраны](https://github.com/GOSUKZ/ys/blob/master/figma.svg)](https://www.figma.com/file/Yd2IZSeZ51BGiLbtF6fyUF/Express-dark-store?type=design&node-id=0%3A1&mode=design&t=UDZVWDfoAvsoQRQB-1)
[![Vercel - Развёртывания](https://github.com/GOSUKZ/ys/blob/master/vercel.svg)](https://express-market.vercel.app)

## Как начать работать над приложением

#### Init project

```bash
npm i
# or
yarn add
# or
pnpm i
```

#### Run development
 
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

#### Run production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

#### Настройка и создание ".env.local"

+ Создайте файл `.env.local` в корневом каталоге проекта.
+ Используя как референс `exemplle.env.local.txt` создайте переменную среды содержащую API_KEY для работы с [YandexAPI](https://passport.yandex.ru/auth/list?retpath=https%3A%2F%2Fdeveloper.tech.yandex.ru%2F&origin=apikeys).
+ Для получения ключа необходимо перейти в [Кабинета разработчика Яндекс](https://passport.yandex.ru/auth/list?retpath=https%3A%2F%2Fdeveloper.tech.yandex.ru%2F&origin=apikeys).
+ Во всплывающем окне вам нужно выбрать тип ключа «JavaScript API и HTTP Геокодер».
+ На следующем шаге заполните поля.

## Развёртывание проекта на Vercel

+ Переходим на [Vercel.com](https://vercel.com/new).
+ В форме "Import Git Repository" выбераем свой репозиторий.
+ Нажимаем Import
+ В форме "Configure Project" устанавлеваем следующие настройки:

```
	Project Name : `ExpressMarket`
	Framework Preset : `Next.js`
	Root Directory : `./`
```

+ Во вкладке "Environment Variables" добавте переменную среды.
+ Получение данных для переменной (см. шаг `Настройка и создание ".env.local"`)
+ Нажимаем Deploy

## Learn More

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.