import dictionary from "../context/errors.json";

const lang = "ru";

const {
  authDefault,
  rangeDefault,
  serverDefault,
  requestDefault,
  notFoundDefault,
  conflictDefault,
  forbiddenDefault,
  validationDefault,
} = dictionary[lang];

const createError = (message: string, errorCode: number) => {
  if (!message || typeof message !== "string") {
    throw new Error("Message should be a string");
  }

  if (typeof errorCode !== "number" || errorCode < 400 || errorCode > 599) {
    throw new Error("Error code should be a number between 400 and 599");
  }

  return new Response(JSON.stringify({ message, code: errorCode }), {
    status: errorCode,
    headers: { "Content-Type": "application/json" },
  });
};

export const requestError = (message: string = requestDefault) =>
  createError(message, 400);

export const authError = (message: string = authDefault) =>
  createError(message, 401);

export const forbiddenError = (message: string = forbiddenDefault) =>
  createError(message, 403);

export const notFound = (message: string = notFoundDefault) =>
  createError(message, 404);

export const conflictError = (message: string = conflictDefault) =>
  createError(message, 409);

export const rangeNotSatisfiable = (message: string = rangeDefault) =>
  createError(message, 416);

export const unprocessableEntity = (message: string = validationDefault) =>
  createError(message, 422);

export const serverError = (message: string = serverDefault) =>
  createError(message, 500);

/**
 * Returns a 400 Bad Request response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Произошла ошибка при обработке запроса".
 * @returns {Response} A Response object with a 400 status code and the
 *   message in the body.
 */

/**
 * Returns a 401 Unauthorized response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Ошибка авторизации".
 * @returns {Response} A Response object with a 401 status code and the
 *   message in the body.
 */

/**
 * Returns a 403 Forbidden response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Не достаточно прав для выполнения данного действия".
 * @returns {Response} A Response object with a 403 status code and the
 *   message in the body.
 */

/**
 * Returns a 404 Not Found response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Страница не найдена".
 * @returns {Response} A Response object with a 404 status code and the
 *   message in the body.
 */

/**
 * Returns a 409 Conflict response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Кофликт запроса. Попробуйте ещё раз".
 * @returns {Response} A Response object with a 409 status code and the
 *   message in the body.
 */

/**
 * Returns a 416 Range Not Satisfiable response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Значение вне диапазона допустимых значений".
 * @returns {Response} A Response object with a 416 status code and the
 *   message in the body.
 * */

/**
 * Returns a 422 Unprocessable Entity response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Невалидные данные".
 * @returns {Response} A Response object with a 422 status code and the
 *   message in the body.
 */

/**
 * Returns a 500 Internal Server Error response with a given message.
 * @param {string} [message] - The message to send in the response. Defaults to
 *   a generic "Произошла ошибка на сервере".
 * @returns {Response} A Response object with a 500 status code and the
 *   message in the body.
 */
