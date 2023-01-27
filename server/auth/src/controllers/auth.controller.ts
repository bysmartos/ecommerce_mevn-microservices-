import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { Response, Request } from "express";
import IUser from "../models/interfaces/user.interface"


const authController = {
    register: async (req: Request, res: Response) => {
        try {
          const {  username, email, password, isAdmin }: IUser = req.body;
    
          const newUsername = username.toLowerCase().replace(/ /g, "");
    
          const user_name = await User.findOne({ username: newUsername });
          if (user_name)
            return res.status(400).json({ msg: "This user already exists" });
    
          const Email = await User.findOne({ email: email });
          if (Email)
            return res.status(400).json({ msg: "This email already exists" });
    
          if (password.length < 6)
            return res
              .status(400)
              .json({ msg: "La contraseña debe tener 6 carácteres mínimo" });
    
          const passwordHash = await bcrypt.hash(password, 13);
    
          const newUser = new User({
            
            username: newUsername,
            email,
            password: passwordHash,
            isAdmin
           
          });
    
          await newUser.save();
    
          res.json({
            msg: "Registro completado",
            user: {
              newUser
            },
          });
        } catch (err:any) {
          return res.status(500).json({ msg: err.message });
        }
      },
      login: async (req: Request, res: Response) => {
        try {
          const { email, password } = req.body;
    
          const user = await User.findOne({ email: email })
    
          if (!user) return res.status(400).json({ msg: "This user doesn't exist" });
    
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch)
            return res.status(400).json({ msg: "Wrong password" });
    
          const access_token = createAccessToken({ id: user._id });
          const refresh_token = createRefreshToken({ id: user._id });
    
          res.cookie("refreshtoken", refresh_token, {
            httpOnly: true,
            path: "/api/refresh_token",
            maxAge: 24 * 30 * 60 * 60 * 1000, //30dias
          });
    
          res.status(200).json({
            msg: "Login completado",
            access_token,
            user: {
              ...user,
            },
          });
        } catch (err: any) {
          return res.status(500).json({ msg: err.message });
        }
      },
      logout: async (req: Request, res: Response) => {
        try {
          res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
          res.status(200).json({ msg: "Logged out" });
        } catch (err:any) {
          return res.status(500).json({ msg: err.message });
        }
      },
      generateAccessToken: async (req: Request, res: Response) => {
        try {
          const rf_token = req.cookies.refreshtoken;
    
          if (!rf_token) return res.status(400).json({ msg: "Login is needed" });
    
          jwt.verify(
            rf_token,
            "" + process.env.REFRESHTOKENSECRET,
            async (err:any, result:any) => {
              if (err) return res.status(400).json({ msg: "Inicio de sesión necesario" });
    
              const user = await User.findById(result.id)
                .select("-password")
                .populate("friends following");
    
              if (!user)
                return res.status(400).json({ msg: "Esta usuaria no existe" });
    
              const access_token = createAccessToken({ id: result.id });
    
              res.json({
                access_token,
                user,
              });
            }
          );
        } catch (err:any) {
          return res.status(500).json({ msg: err.message });
        }
      },
    };
    
    const createAccessToken = (payload: any) => {
      return jwt.sign(payload, "" + process.env.ACCESSTOKENSECRET, { expiresIn: "1d" });
    };
    
    const createRefreshToken = (payload: any) => {
      return jwt.sign(payload, "" + process.env.REFRESHTOKENSECRET, {
        expiresIn: "30d",
      });
  
    
  };
  
  export default authController;
  