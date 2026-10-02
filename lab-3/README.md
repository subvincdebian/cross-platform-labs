# Лабораторна робота № 3: Побудова GraphQL API засобами Apollo Server

**Дисципліна:** Крос-платформне програмування  
**Тема:** Побудова GraphQL API засобами Apollo Server, автентифікація користувачів (JWT)  
**Індивідуальна тема:** Розробка застосунка для кіберспортивного клубу (CyberClub)  
**Студент:** Аг Міхал, група ВЕБ-21  

---

## 🚀 Швидкий запуск

1. Встановіть залежності (якщо ще не встановлено):
   ```bash
   npm install
   ```

2. Запустіть сервер:
   ```bash
   npm run dev
   # або
   npm run start:dev
   ```

3. Після запуску у консолі з'явиться повідомлення:
   ```
   [CyberClubGraphQL] GraphQL API запущено за адресою: http://localhost:4001/
   [CyberClubGraphQL] Apollo Sandbox доступний у браузері за адресою: http://localhost:4001/
   ```

4. Відкрийте у браузері: **`http://localhost:4001/`**  
   Відкриється вбудований інтерфейс **Apollo Sandbox** з автоматичною документацією, історією та вкладкою для прописування заголовків.

---

## 🧪 Порядок тестування за чек-листом методички

Усі запити підготовлені у файлі `test-queries.gql`. Ви можете копіювати їх безпосередньо у поле **Operation** в Apollo Sandbox:

1. **Реєстрація користувача:**
   ```graphql
   mutation {
     register(name: "Іван Петренко", email: "ivan@example.com", password: "123456") {
       token
       user { id name email }
     }
   }
   ```
2. **Вхід користувача:**
   ```graphql
   mutation {
     login(email: "ivan@example.com", password: "123456") {
       token
       user { id name email }
     }
   }
   ```
3. **Захищений запит `me` (з токеном):**
   У вкладці **Headers** (внизу екрана) додайте:
   - Header key: `Authorization`
   - Header value: `Bearer <ваш_токен>`
   Виконайте:
   ```graphql
   query {
     me { id name email }
   }
   ```
4. **Перевірка захисту `me` (без токена):**
   Вимкніть галочку біля заголовка `Authorization`. Запит повертає `{"data": {"me": null}}`.
5. **Захищена мутація `createBooking`:**
   Увімкніть заголовок `Authorization`. Створіть бронювання:
   ```graphql
   mutation {
     createBooking(
       zone: "VIP Lounge (ПК #21-30)"
       pcNumber: 25
       durationHours: 3
       price: 240.0
       notes: "Монітор 360Hz"
     ) {
       id
       zone
       pcNumber
       user { id name }
     }
   }
   ```
6. **Перевірка помилки без токена:**
   Вимкніть заголовок `Authorization` і повторіть `createBooking`. Сервер поверне помилку `«Потрібна авторизація.»`.
