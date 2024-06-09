import { General_Knowledge, Physics, Chemistry, Biology } from "./testModel/test_model";
import { shuffleOptions } from "@/UtilityFunctions/shuffleOptions";

export const Subjects = [
  `General Knowledge`,
  `Physics`,
  `Chemistry`,
  `Biology`,
];

export const passSubjectToShuffleOptions = (subject) => {
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




export const shuffledGeneral_Knowledge = passSubjectToShuffleOptions(General_Knowledge);
export const shuffledPhysics = passSubjectToShuffleOptions(Physics);  
export const shuffledChemistry = passSubjectToShuffleOptions(Chemistry)
export const shuffledBiology = passSubjectToShuffleOptions(Biology)


