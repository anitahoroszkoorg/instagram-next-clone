export default async function POST(request: Request) {
  try {
    const { email, passowrd } = await request.json();
    //validate email and passowrd
    console.log(email, passowrd);
  } catch (err) {
    console.log(err);
  }
}
