import { AxiosResponse } from "axios";
import axios from "./axios.service";
import Url from "@/interfaces/url.interface";


const port=4000

export const example = async (): Promise<AxiosResponse<Url>> =>
  await axios(port).get("/v1/example");