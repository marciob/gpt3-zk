// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { configuration } from "../utils/constants";
import { OpenAIApi } from "openai";
import { initial_prompt, final_prompt } from "../utils/my_prompt";

type Data = {
  result: any;
};

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { input } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${initial_prompt} ${input} ${final_prompt}`,
    max_tokens: 500,
    temperature: 0.5,
    // top_p: 1,
    // n: 1,
    // stream: false,
    // logprobs: null,
    // stop: "\n",
  });

  const suggestion = response.data?.choices?.[0].text;

  if (suggestion === undefined) {
    throw new Error("No suggestion found");
  }

  res.status(200).json({ result: suggestion });
}
