


export default async function handler(req, res) {
  const {city} = req.query;

  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=94720225016bffa586467b70d1b0bce9&cnt=40`
    );
    const data = await response.json();


    if (!response.ok) {
      res.status(response.status).json({ error: data });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
