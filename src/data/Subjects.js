import { General_Knowledge, Physics, Chemistry, Biology } from "./testModel/test_model";
import { shuffleOptions } from "@/UtilityFunctions/shuffleOptions";

export const Subjects = [
  `General Knowledge`,
  `Physics`,
  `Chemistry`,
  `Biology`,
];

const passSunjectToShuffleOptions = (subject) => {
  const suffledSubject = subject.map(
    ({ question, incorrectAnswers, correctAnswer }) => ({
      question,
      options: shuffleOptions(
        incorrectAnswers,
        correctAnswer
      ),
    })
  );
  return  suffledSubject; 
}




export const shuffledGeneral_Knowledge = passSunjectToShuffleOptions(General_Knowledge);
export const shuffledPhysics = passSunjectToShuffleOptions(Physics);  
export const shuffledChemistry = passSunjectToShuffleOptions(Chemistry)
export const shuffledBiology = passSunjectToShuffleOptions(Biology)


