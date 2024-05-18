import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cors from '../../lib/cors';
import runMiddleware from '../../lib/runMiddleware';

type Operation = 'addition' | 'remainder' | 'multiplication' | 'division' | 'subtraction';

interface CalculationData {
  id: string;
  operation: Operation;
  left: number;
  right: number;
}

interface ResultData {
  id: string;
  operation: Operation;
  left: number;
  right: number;
  result: number;
  message: string;
  status: string;
}

interface ErrorResponse {
  error: string;
}

type ResponseData = ResultData | ErrorResponse;

const calculateResult = (operation: Operation, left: number, right: number): number => {
  switch (operation) {
    case 'addition':
      return left + right;
    case 'remainder':
      return left % right;
    case 'multiplication':
      return left * right;
    case 'division':
      return left / right;
    case 'subtraction':
      return left - right;
    default:
      throw new Error('Invalid operation');
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  await runMiddleware(req, res, cors);

  try {
    const response = await axios.get<CalculationData>('https://interview.adpeai.com/api/v1/get-task', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const {
      id, operation, left, right,
    } = response.data;
    const result = calculateResult(operation, left, right);

    try {
      const postResponse = await axios.post(
        'https://interview.adpeai.com/api/v1/submit-task',
        { id, result },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const resultData: ResultData = {
        id,
        operation,
        left,
        right,
        result,
        message: postResponse.data,
        status: postResponse.status.toString(),
      };

      res.status(200).json(resultData);
    } catch (postError) {
      if (axios.isAxiosError(postError)) {
        const status = postError.response?.status;
        let errorMessage = 'Internal Server Error';

        if (status === 400 || status === 404) { // Get the message from these status codes
          errorMessage = postError.response?.data;
          res.status(200).json({ // Returns status code 200 to display the message
            id,
            operation,
            left,
            right,
            result,
            message: errorMessage,
            error: errorMessage,
          });
        } else {
          res.status(status || 500).json({ error: errorMessage });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
