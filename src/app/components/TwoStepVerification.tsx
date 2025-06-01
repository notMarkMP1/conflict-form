'use client';

import { useState } from 'react';


interface TwoStepVerificationProps {
  onVerify: () => void;
}

export default function TwoStepVerification({onVerify} : TwoStepVerificationProps){
    const [currentQuestion, setCurrentQuestion] = useState<{question: string, answer: string} | null>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const questionBank = {
        "what day did we start (mm/dd/yy)": "11/23/24",
        "who do i main in valorant": "iso",
        "who is my favourite brawl stars character": "melodie",
        "favourite dog": "chewchan",
        "what day is my birthday (mm/dd/yy)": "12/09/06",
        "favourite ride at wonderland": "timberwolf falls",
        "my middle name?": "min",
        "your chinese name?": "wu tong tian yu",
        "my valorant username? (don't include tag)": "teemodemon321",
        "my steam username?": "mrwhy123",
        "my (current) roblox username?": "dontgetmadcuzurbad",
        "which bbq place have we gone to like a bunch": "chat bar",
        "last 4 digits of my phone number": "0171",
        "what room is my home setup in": "front foyer",
    };

    useState(() => {
        const questions = Object.entries(questionBank);
        const randomIndex = Math.floor(Math.random() * questions.length);
        const [question, answer] = questions[randomIndex];
        setCurrentQuestion({ question, answer });
    });

    const handleSubmit = () => {
        if (currentQuestion && userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase()) {
            setIsCorrect(true);
            setTimeout(() => onVerify(), 1000);
        } else {
            setIsCorrect(false);
            setTimeout(() => setIsCorrect(null), 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{backgroundColor: '#1a1f3a'}}>
            <div className="w-full max-w-sm">
                <div className="text-center mb-6">
                    <h1 className="text-2xl mb-2" style={{color: '#9bb5ff'}}>Two-Step Verification</h1>
                    <p className="text-sm" style={{color: '#6b7db8'}}>are you who i think you are???    </p>
                </div>

                <div className="rounded-lg p-6 border" style={{backgroundColor: '#2d3561', borderColor: '#6b7db8'}}>
                    {currentQuestion && (
                        <>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" style={{color: '#9bb5ff'}}>
                                    {currentQuestion.question}
                                </label>
                                <input
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    className="w-full p-3 rounded border"
                                    style={{backgroundColor: '#1a1f3a', borderColor: '#6b7db8', color: '#9bb5ff'}}
                                    placeholder="Enter your answer"
                                />
                            </div>
                            
                            {isCorrect === false && (
                                <p className="text-red-400 text-sm mb-4">Incorrect answer. Please try again.</p>
                            )}
                            
                            {isCorrect === true && (
                                <p className="text-green-400 text-sm mb-4">Correct! Verifying...</p>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={!userAnswer.trim() || isCorrect === true}
                                className="w-full p-3 rounded bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Submit Answer
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}