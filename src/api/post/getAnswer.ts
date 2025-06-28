import api from "../api";
import routes from "../routes";

const getAnswer = async (question: string) => {    
    const response = await fetch(
    `${api}${routes.chat}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: question }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Успешный ответ:", data);
      return data;
    })
    .catch((err) => {
      console.error("Ошибка запроса:", err);
      throw err;
    });

    return response.response;
}

export default getAnswer;