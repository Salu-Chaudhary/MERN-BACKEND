import { verifyJWT } from "../utils/jwt.js";

const auth = async (req, res, next) => {
  //EXTRACTING TOKEN FROM COOKIE JUN CHAI REQUEST BATA AAKO THIYO
  // const cookie = req.headers.cookie;
  // if (!cookie) return res.status(401).send("User not authenticated!!");
  // const token = cookie.split("=")[1];
  // if (!token) return res.status(401).send("User not authenticated!!");

  try {
    //CALLING VERIFICATION FUNTION

    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Access Denied! No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    // ["bearer", "sfslsjdsoifjsoidsjfsoifjdsoifsjfoidsfjsd"]

    const user = await verifyJWT(token);

    console.log(user);
    req.user = user;
  } catch (error) {
    res.status(401).send("User not authenticated!!");
  }

  next();
};

export { auth };
