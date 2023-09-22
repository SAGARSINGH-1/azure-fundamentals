import type { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import useTimer from "@azure-fundamentals/hooks/useTimer";
import { Button } from "@azure-fundamentals/components/Button";

const questionsQuery = gql`
  query RandomQuestions($range: Int!) {
    randomQuestions(range: $range) {
      question
      options {
        isAnswer
        text
      }
    }
  }
`;

const Exam: NextPage = () => {
  const { remainingTime, startTimer, stopTimer } = useTimer({ minutes: 10, seconds: 0 });
  const { data, loading, error } = useQuery(questionsQuery, {
    variables: { range: 35 },
  });
  console.log(data);

  if (loading) return <p>Loading</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const numberOfQuestions = data.randomQuestions.length || 0;

  return (
    <div className="h-screen w-full grid place-items-center">
      <Head>
        <title>Azure Fundamentals - Exam</title>
        <meta property="og:title" content="Azure Fundamentals - Exam" key="title" />
      </Head>
      <div className="py-10 px-5 sm:p-10 w-5/6 sm:w-1/2 bg-slate-800 border-2 border-slate-700 rounded-lg">
        <div className="w-full flex flex-col xl:flex-row justify-between items-center">
          <p className="text-white font-bold text-2xl">0/{numberOfQuestions}</p>
          <h1 className="text-white font-bold text-3xl">PRACTICE EXAM</h1>
          <p className="text-white font-bold text-2xl">{remainingTime}</p>
        </div>
        <div className="h-max">
          <div className="grid pt-20 place-items-center">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <path
                fill="#FFFFFF"
                d="M20,0C8.96,0,0,8.96,0,20c0,11.05,8.96,20,20,20s20-8.95,20-20C40,8.96,31.04,0,20,0z M20,8.87
	c1.87,0,3.39,1.52,3.39,3.39s-1.52,3.39-3.39,3.39s-3.39-1.52-3.39-3.39S18.13,8.87,20,8.87z M24.52,29.35
	c0,0.53-0.43,0.97-0.97,0.97h-7.1c-0.53,0-0.97-0.43-0.97-0.97v-1.94c0-0.53,0.43-0.97,0.97-0.97h0.97v-5.16h-0.97
	c-0.53,0-0.97-0.43-0.97-0.97v-1.94c0-0.53,0.43-0.97,0.97-0.97h5.16c0.53,0,0.97,0.43,0.97,0.97v8.06h0.97
	c0.53,0,0.97,0.43,0.97,0.97V29.35z"
              />
            </svg>
            <p className="text-white text-center pt-6 px-6">
              Practice Exam help you practice skills, assess your knowledge, and
              identify the areas where you need additional preparation to
              accelerate your chances of succeeding on certification exams.
              Practice Exams are intended to provide an overview of the style,
              wording, and difficulty of the questions that you are likely to
              experience on Azure Fundamentals real exam.
            </p>
          </div>
          <p className="text-white font-bold text-xl text-center pt-20 px-6 mb-40">
            This Practice Exam contains {numberOfQuestions} random questions
            (seen in upper left corner) and has a completion time limit of{" "}
            {remainingTime.split(":")[0]} minutes (seen in upper right corner).
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center">
          <Button
            type="button"
            intent="secondary"
            size="medium"
            onClick={() => startTimer()}
          >
            Begin exam
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Exam;
